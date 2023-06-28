const wa = require('@open-wa/wa-automate');
const fs = require('fs-extra');
const { color } = require('./lib/utils.js');
const { createDir, deleteDir } = require('./lib/functions');
const canvas = require('discord-canvas');
const figlet = require('figlet');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Sao_Paulo').locale('en');
const time = moment().format('DD/MM/YYYY HH:mm:ss');
const db = require('quick.db');
const { mess } = require('./lib');
const config = require('./settings/config.json');
const package = require('./package.json');
const chromePaths = require('chrome-paths');
const executablePath = chromePaths.chrome

const { isOs, threatOsName } = require('./lib/checkos.js');
const chalk = require('chalk');

const currentOs = threatOsName();

const startText = `Lune Bot\n                       for ${currentOs}`;
const start = async (client) => {
	figlet(startText, async function (err, data) {
		if (err) { return }
		console.log(data)
		var bnum = await client.getHostNumber();
		console.log(color('[INFO]', 'blue'), 'Bot version:', color(package.version));
		console.log(color('[INFO]', 'blue'), 'Default prefix:', chalk.yellow(config.defaultPrefix));
		console.log(color('[INFO]', 'blue'), 'Bot number:', chalk.yellow(bnum));
		console.log(color('[INFO]', 'blue'), 'Owner(s):', chalk.yellow(config.owners.join(', ') || 'Not defined'));
		console.log(color('[INFO]', 'blue'), 'Anti-spam:', color(config.antispam ? 'Enabled' : 'Disabled', config.antispam ? 'green' : 'red'));
		console.log(color('[INFO]', 'blue'), 'Only groups:', color(config.only_groups ? 'Enabled' : 'Disabled', config.only_groups ? 'green' : 'red'));
		console.log(color('[INFO]', 'blue'), 'Save musics:', color(config.save_musics ? 'Enabled' : 'Disabled', config.save_musics ? 'green' : 'red'));
		console.log(color('[INFO]', 'blue'), 'Chrome Path:', color(executablePath, 'blue'));
		console.log(color('[INFO]', 'blue'), 'Running on:', color(currentOs, 'blue'));
		console.log(color('[STARTED]', 'green'), color(time, 'green'));
	});

	client.darkMode(true).catch(() => {});

	client.setPresence(true);

	await deleteDir('./tmp');
	await createDir('./tmp');

	// Force it to keep the current session
	client.onStateChanged((state) => {
		console.log('[Client State]', state, time)
		if (state === 'CONFLICT' || state === 'DISCONNECTED') client.forceRefocus()
	})

	var unread = await client.getAllUnreadMessages();
	unread.forEach(async (message) => {
		var oqid = (message.isGroupMsg ? message.chat.groupMetadata.id : '') || message.sender.id;
		await client.sendSeen(oqid);
	});

	// Listening on message
	client.onMessage(async message => {
		// Owner checker
		var isowner = false;
		var owners = config.owners;
		if (message.sender && message.sender.id) {
			for (let i = 0; i < owners.length; i++) {
				if (owners[i] + '@c.us' == message.sender.id) {
					isowner = true;
				};
			};
		};

		// Handler
		if (message.sender && message.sender.id && (isowner || (config.only_groups && message.isGroupMsg) || !config.only_groups)) {
			const msgHandler = require('./handler/messages.js');
			msgHandler.runBot(client, message).then((val) => {
				console.log(val);
			});
		};
	});

	client.onAddedToGroup(async (event) => {
		var groupMembers = await client.getGroupMembers(event.id);
		var groupMembersFormatted = [];

		for (let i = 0; i < groupMembers.length; i++) {
			groupMembersFormatted.push(groupMembers[i].id);
		};

		db.set(`welcomedUsers.${event.id}`, { users: groupMembersFormatted });

		if (db.get('welcome') && db.get('welcome').includes(event.id)) return;
		db.push('welcome', event.id);
	});

	client.onGlobalParticipantsChanged(async (event) => {
		const personr = event.who
		const numebot = await client.getHostNumber() + '@c.us'
		const isMyBot = personr.includes(numebot)
		const isWelkom = db.get('welcome').includes(event.chat)
		const eChat = await client.getContact(event.who)
		let { pushname, verifiedName, formattedName } = eChat
		pushname = pushname || verifiedName || formattedName
		const gChat = await client.getChatById(event.chat)
		const { groupMetadata, name, formattedTitle } = gChat

		var lang =
			(
				personr.startsWith('55') ||  // Brazil
				personr.startsWith('351') || // Portugal
				personr.startsWith('238') || // Cape Green
				personr.startsWith('244') || // Angola
				personr.startsWith('245') || // Guinea-Bissau
				personr.startsWith('240') || // Equatorial Guinea
				personr.startsWith('258') || // Mozambique
				personr.startsWith('239') || // Sao Tome and Principe
				personr.startsWith('670')    // East-Timor
			) ? "pt_BR" :
				(
					personr.startsWith('34') ||  // Spain
					personr.startsWith('51') ||  // Peru
					personr.startsWith('52') ||  // Mexico
					personr.startsWith('53') ||  // Cuba
					personr.startsWith('54') ||  // Argentina
					personr.startsWith('56') ||  // Chile
					personr.startsWith('57') ||  // Colombia
					personr.startsWith('58') || // Venezuela
					personr.startsWith('591') || // Bolivia
					personr.startsWith('506') || // Costa Rica
					personr.startsWith('503') || // El Salvador
					personr.startsWith('593') || // Ecuador
					personr.startsWith('502') || // Guatemala
					personr.startsWith('504') || // Honduras
					personr.startsWith('505') || // Nicaragua
					personr.startsWith('507') || // Panama
					personr.startsWith('595') || // Paraguay
					personr.startsWith('598')    // Uruguay
				) ? "es_ES" : "en_US";

		if (!db.get('usr_lang')) db.set('usr_lang', []);
		for (let i = 0; i < db.get('usr_lang').length; i++) {
			if (db.get('usr_lang')[i].id == personr.replace(/@c.us/gi, '')) {
				lang = db.get('usr_lang')[i].lang;
				i = db.get('usr_lang').length + 1;
			};
		};

        var prefix = db.get(`prefix.${personr}`) || config.defaultPrefix;

		try {
			if (event.action == 'add') {
				if (db.get('welcomedUsers').hasOwnProperty(event.chat)) {
					if (db.get(`welcomedUsers.${event.chat}.users`).includes(event.who)) {
						return;
					};
				} else {
					db.set(`welcomedUsers.${event.chat}.users`, []);
				};
				if (isWelkom && !isMyBot) {
					var profile = await client.getProfilePicFromServer(event.who);
					if (!profile || profile == '' || profile == undefined || profile == "ERROR: 400" || profile == "ERROR: 401" || profile == "ERROR: 402" || profile == "ERROR: 403" || profile == "ERROR: 404") profile = fs.readFileSync("./media/welcome/profile.png");
					var lnkw = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"]
					var lRW = Math.floor(Math.random() * lnkw.length)
					var linkWelcome = "./media/welcome/" + lnkw[lRW]
					const welcomer = await new canvas.Welcome()
						.setUsername(pushname)
						.setDiscriminator(event.who.replace('@c.us', '').substring(event.who.replace('@c.us', '').length - 4, event.who.replace('@c.us', '').length))
						.setMemberCount(groupMetadata.participants.length)
						.setGuildName(name || formattedTitle)
						.setAvatar(profile)
						.setColor('border', '#00100C')
						.setColor('username-box', '#00100C')
						.setColor('discriminator-box', '#F2FFFC')
						.setColor('message-box', '#F28022')
						.setColor('title', '#FFA305')
						.setBackground(linkWelcome)
						.toAttachment();
					const base64 = `data:image/png;base64,${welcomer.toBuffer().toString('base64')}`;
					await client.sendFile(event.chat, base64, 'welcome.png', `${mess[lang].welcome.resp(prefix, pushname, name, formattedTitle)}`);

					db.push(`welcomedUsers.${event.chat}.users`, event.who);
					console.log(color('[WELCOME]', 'blue'), color(`${event.who.replace("@c.us", "")}`), '-', color(pushname), 'joined', color(`"${name || formattedTitle}"`));
				};
			};
			if (event.action == 'remove') {
				if (db.get('welcomedUsers').hasOwnProperty(event.chat)) {
					if (db.get(`welcomedUsers.${event.chat}.users`).includes(event.who)) {
						for (i in db.get(`welcomedUsers.${event.chat}.users`)) {
							if (db.get(`welcomedUsers.${event.chat}.users`)[i] == event.who) {
								let tmpDb = db.get(`welcomedUsers.${event.chat}.users`);
								tmpDb.splice(i, 1);
								db.set(`welcomedUsers.${event.chat}.users`, tmpDb);
								break;
							};
						};
					};
				};
			};
		} catch (err) {
			console.log(err);
		};
	});

	client.setMyStatus("Status: System under maintenance.. ⚠️");
	setInterval(() => {
		client.setMyStatus("Status: Online ✅");
	}, 30000);
};

const options = {
	sessionId: 'session',
	executablePath: executablePath,
	forcePort: true,
	port: '8002',
	logFile: 'zapzap.log',
	multiDevice: true,
	headless: true,
	qrTimeout: 0,
	authTimeout: 60,
	killProcessOnTimeout: true,
	restartOnCrash: start,
	cacheEnabled: false,
	disableSpins: true,
	useChrome: true,
	legacy: false,
	keepAlive: true,
	killProcessOnBrowserClose: true,
	deleteSessionDataOnLogout: true,
	blockCrashLogs: true,
	throwErrorOnTosBlock: false,
	waitForRipeSession: true,
	devtools: false,
	debug: false,
	popup: true,
	skipUpdateCheck: true,
};

function create() {
	wa.create(options)
		.then(client => {
			try {
				start(client)
			} catch (err) {
				client.kill()
				create()
			};
		})
		.catch(err => {
			console.log(err)
			process.exit(1)
		});
};

module.exports = {
	executablePath
}

create();

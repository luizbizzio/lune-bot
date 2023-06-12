const wa = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const { color, messageLog } = require('./lib/utils')
const msgHandler = require('./handler/commands')
const canvas = require('discord-canvas')
const figlet = require('figlet');
const moment = require('moment-timezone');
moment.tz.setDefault('South America/Brazil').locale('pt');
const time = moment().format('DD/MM/YYYY HH:mm:ss');
var welcomedUsers = JSON.parse(fs.readFileSync('./data/welcomedUsers.json', 'utf8'));
const db = require('quick.db');
const { mess } = require('./lib');
const config = require('./settings/config.json');
const package = require('./package.json');
var welkom;

const { isOs, threatOsName } = require('./lib/checkos')
const chalk = require('chalk')

const currentOs = threatOsName();

const startText = `Lune Bot\n                       for ${currentOs}`;
const start = (client) => {
	figlet(startText, async function(err, data) { 
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
		console.log(color('[INFO]', 'blue'), 'Running on:', color(currentOs, 'blue'));
		console.log(color('[STARTED]', 'green'), color(time, 'green'));
	});

	client.setPresence(true);

	// Message log for analytic
	// client.onAnyMessage((fn) => messageLog(fn.fromMe, fn.type))

	// Force it to keep the current session
	client.onStateChanged((state) => {
		console.log('[Client State]', state, time)
		if (state === 'CONFLICT' || state === 'DISCONNECTED') client.forceRefocus()
	})

	// listening on message
	client.onMessage(async message => {
		if ((config.only_groups && message.isGroupMsg) || !config.only_groups) {
			msgHandler.runBot(client, message).then((val) => {
				console.log(val);
			});
		};
	});

	client.onAddedToGroup(async (event) => {
		welkom = JSON.parse(fs.readFileSync('./data/welcome.json'));
		if (welkom.includes(event.id)) return;
		welkom.push(event.id)
		fs.writeFileSync('./data/welcome.json', JSON.stringify(welkom))
	});

	client.onGlobalParticipantsChanged(async (event) => {
		welkom = JSON.parse(fs.readFileSync('./data/welcome.json'));
		const personr = event.who
		const numebot = await client.getHostNumber() + '@c.us'
		const isMyBot = personr.includes(numebot)
		const isWelkom = welkom.includes(event.chat)
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
				personr.startsWith('58')  || // Venezuela
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
				i = db.get('usr_lang').length+1;
			};
		};

		try {
			if (event.action == 'add') {	
				if (welcomedUsers.hasOwnProperty(event.chat)) {
					if (welcomedUsers[event.chat].users.includes(event.who)) {
						console.log("To prevent the system from crashing, the user did not receive a welcome message!");
						return;
					};
				} else {
					welcomedUsers[event.chat] = {
						users: []
					};
				};
				if (isWelkom && !isMyBot) {
					var profile = await client.getProfilePicFromServer(event.who);
					if (!profile || profile == '' || profile == undefined || profile == "ERROR: 400" || profile == "ERROR: 401" || profile == "ERROR: 402" || profile == "ERROR: 403" || profile == "ERROR: 404") profile = fs.readFileSync("./media/welcome/profile.png");
					var lnkw = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg"]
					var lRW = Math.floor(Math.random() * lnkw.length)
					var linkWelcome = "./media/welcome/"+lnkw[lRW]
					const welcomer = await new canvas.Welcome()
						.setUsername(pushname)
						.setDiscriminator(event.who.substring(6, 10))
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
					await client.sendFile(event.chat, base64, 'welcome.png', `${mess[lang].welcome.resp(pushname, name, formattedTitle)}`);

					welcomedUsers[event.chat].users.push(event.who);
					fs.writeFileSync('./data/welcomedUsers.json', JSON.stringify(welcomedUsers));
					console.log(color('[WELCOME]', 'blue'), color(`${event.who.replace("@c.us","")}`),'-', color(pushname), 'joined', color(`"${name || formattedTitle}"`));
				};
			};
			if (event.action == 'remove') {
				if (welcomedUsers.hasOwnProperty(event.chat)) {
					if (welcomedUsers[event.chat].users.includes(event.who)) {
						for (i in welcomedUsers[event.chat].users) {
							if (welcomedUsers[event.chat].users[i] == event.who) {
								welcomedUsers[event.chat].users.splice(i, 1);
								break;
							};
						};
					};
				};

				fs.writeFileSync('./data/welcomedUsers.json', JSON.stringify(welcomedUsers));
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
	multiDevice: true,
  headless: true,
  qrTimeout: 0,
  authTimeout: 30,
	killProcessOnTimeout: true,
  restartOnCrash: start,
  cacheEnabled: true,
	disableSpins: true,
  useChrome: true,
	legacy: false,
  killProcessOnBrowserClose: true,
	deleteSessionDataOnLogout: true,
  throwErrorOnTosBlock: false,
	waitForRipeSession: true,
	devtools: false,
	debug: false,
	popup: false,
	skipUpdateCheck: true,
};

if (!isOs('win32')) {
	options.executablePath = config.executablePath;
};

function create() {
	wa.create(options)
		.then(client => {
		try {
			start(client);
		} catch (err) {
			client.kill();
			create();
		};
	})
	.catch(err => console.log(err));
};
create();
const wa = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const { color, messageLog } = require('./lib/utils')
const msgHandler = require('./handler/commands')
const canvas = require('discord-canvas')
const chalkAnimation = require('chalk-animation');
const startText = "Lune Bot";
const figlet = require('figlet');
const moment = require('moment-timezone');
moment.tz.setDefault('South America/Brazil').locale('pt');
const time = moment().format('DD/MM/YYYY HH:mm:ss');
const ms = require('ms');
var intervalTime = 1000;
var welcomedUsers = JSON.parse(fs.readFileSync('./lib/config/welcomedUsers.json', 'utf8'));
const db = require('quick.db');
const { mess } = require('./lib');

const start = (client) => {
    figlet(startText, function(err, data) { 
		if (err) { return }
		console.log(data)
		console.log(color('[STARTED]'), color(time))
	});

    client.setPresence(true);
	
		/*
	setInterval(() => {
		var uptime = ms(Math.floor(process.uptime() * 1000));
		if (uptime.includes("s")) {
			intervalTime = 1000;
		} else if (uptime.includes("m")) {
			intervalTime = 60000;
		} else if (uptime.includes("h")) {
			intervalTime = 3600000;
		} else if (uptime.includes("d")) {
			intervalTime = 86400000;
		} else {
			intervalTime = 1000;
		};
		client.setMyStatus(`Servidores Online ✅ (${uptime})`)
	}, intervalTime);
	*/


    // Message log for analytic
    client.onAnyMessage((fn) => messageLog(fn.fromMe, fn.type))

    // Force it to keep the current session
    client.onStateChanged((state) => {
        console.log('[Client State]', state)
        if (state === 'CONFLICT' || state === 'DISCONNECTED') client.forceRefocus()
    })

    // listening on message
    client.onMessage(async message => {
        // Cut message Cache if cache more than 3K
        // client.getAmountOfLoadedMessages().then((msg) => (msg >= 3000) && client.cutMsgCache())
        // Message Handler
		// msgHandler.main(client, message);

		msgHandler.runBot(client, message).then((val) => {
			console.log(val);
		});
    });

	client.onReaction(async ({message, reactionByMe, reactions, type}) => {
		if (reactionByMe) return;
		var reactionEmoji = ['🌸', '🌺', '🍪', '🍩', '🎲', '🧩', '🏕', '⛱', '🧸', '🎁', '🪅', '🧭', '👾', '🪂', '🫂', '🛎️', '⭐'];
		reactionEmoji = reactionEmoji[Math.floor(Math.random() * reactionEmoji.length-1)]
		client.react(message.id, reactionEmoji);
	});

	client.onGlobalParticipantsChanged(async (event) => {
		const welkom = JSON.parse(fs.readFileSync('./lib/config/welcome.json'))
		const personr = event.who
		const numebot = await client.getHostNumber() + '@c.us'
		const isMyBot = personr.includes(numebot)
		const isWelkom = welkom.includes(event.chat)
		const eChat = await client.getContact(event.who)
		let { pushname, verifiedName, formattedName } = eChat
		pushname = pushname || verifiedName || formattedName
		const gChat = await client.getChatById(event.chat)
		const { contact, groupMetadata, name, formattedTitle } = gChat

		var lang =
        (
            personr.startsWith('55') ||  // Brasil
            personr.startsWith('351') || // Portugal
            personr.startsWith('238') || // Cabo Verde
            personr.startsWith('244') || // Angola
            personr.startsWith('245') || // Guiné-Bissau
            personr.startsWith('240') || // Guiné Equatorial
            personr.startsWith('258') || // Moçambique
            personr.startsWith('239') || // São Tomé e Príncipe
            personr.startsWith('670')    // Timor-Leste
        ) ? "pt_BR" :
        (
            personr.startsWith('34') ||  // Espanha
            personr.startsWith('51') ||  // Peru
            personr.startsWith('52') ||  // México
            personr.startsWith('53') ||  // Cuba
            personr.startsWith('54') ||  // Argentina
            personr.startsWith('56') ||  // Chile
            personr.startsWith('57') ||  // Colombia
            personr.startsWith('58')  || // Venezuela
            personr.startsWith('591') || // Bolívia
            personr.startsWith('506') || // Costa Rica
            personr.startsWith('503') || // El Salvador
            personr.startsWith('593') || // Equador
            personr.startsWith('502') || // Guatemala
            personr.startsWith('504') || // Honduras
            personr.startsWith('505') || // Nicaragua
            personr.startsWith('507') || // Panamá
            personr.startsWith('595') || // Paraguai
            personr.startsWith('598')    // Uruguai
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
				if (welcomedUsers[event.chat].users.includes(event.who)) return console.log("Para evitar que o sistema travasse, o usuário não recebeu mensagem de boas-vindas!");
				} else {
					welcomedUsers[event.chat] = {
						users: []
					};
				};
				if (isWelkom && !isMyBot) {
					var profile = await client.getProfilePicFromServer(event.who);
					if (!profile || profile == '' || profile == undefined || profile == "ERROR: 401") profile = fs.readFileSync("./media/welcome/profile.png");
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
					fs.writeFileSync('./lib/config/welcomedUsers.json', JSON.stringify(welcomedUsers));
					console.log(color('[WELCOME]', 'blue'), color(`${event.who.replace("@c.us","")}`),'-', color(pushname), 'entrou', 'no grupo', color(`"${name || formattedTitle}"`));
				};
			};
			if (event.action == 'remove') {
				// remove event.who from the array welcomedUsers[event.chat].users
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


				fs.writeFileSync('./lib/config/welcomedUsers.json', JSON.stringify(welcomedUsers));
			};
		} catch (err) {
			console.log(err);
		};
	});
				
	client.onIncomingCall((callData) => {
		// client.contactBlock(callData.peerJid)
	});

	client.setMyStatus("Status: System under maintenance.. ⚠️");
    setInterval(() => {
    	client.setMyStatus("Status: Online ✅");
    }, 600000);
};


const options = {
	licenseKey: "E78737DF-F9544122-A824367C-B5C1E291",
    sessionId: 'session',
    executablePath: '/usr/bin/google-chrome-stable', // comente esta linha em caso de Windows
	multiDevice: true,
    headless: true,
    qrTimeout: 0,
    authTimeout: 30,
	killProcessOnTimeout: true,
    restartOnCrash: start,
    cacheEnabled: true,
	//port: 1313,
	disableSpins: true,
    useChrome: true,
	legacy: false,
    killProcessOnBrowserClose: true,
	deleteSessionDataOnLogout: true,
    throwErrorOnTosBlock: true,
	waitForRipeSession: true,
	devtools: false,
	debug: false,
	popup: false,
	skipUpdateCheck: true,
	/*logging: [
          {
            type: 'file',
            options: {
              filename: './logs/bot.log',
            },
          },
        ],*/
    /*chromiumArgs: [
		//'--remote-debugging-port=1313',
    ]*/
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
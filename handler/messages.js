// Initialization
const { decryptMedia } = require('@open-wa/wa-automate');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Sao_paulo').locale('pt');
require('better-node-gtts');

// MODULES
const fs = require('fs-extra');
const os = require('os');
const imgbbUploader = require('imgbb-uploader');
const axios = require('axios');
const canvas = require('canvacord');
const JsBarcode = require('jsbarcode');
const QRCode = require('qrcode')
const QrCodeRead = require('qrcode-reader');
const { getLyrics } = require('genius-lyrics-api');
const Jimp = require("jimp");
const ffmpeg = require('fluent-ffmpeg');
const DownloadYTFile = require('yt-dl-playlist');
const VirusTotalApi = require("virustotal-api");
const ms = require('parse-ms');
const BitlyClient = require('bitly').BitlyClient;
const time = require('ms');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const db = require('quick.db');
const config = require('../settings/config.json');
const { Configuration, OpenAIApi } = require("openai");
const { executablePath } = require('../');
const { spawn, Thread, Worker } = require('threads');

// Paths
const { fetcher, conversao, imgEditor, translate, api, functions, rank, imageFromGoogle, marriage, utils, mess } = require('../lib');
const { sleep, createDir } = functions;
const { msgFilter, color, processTime } = utils;
const { uploadImages, fetchBase64 } = fetcher;

var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

if (config.save_musics) createDir('./media/musics');

const downloaderYt = new DownloadYTFile({
    outputPath: config.save_musics ? './media/musics' : './tmp',
    ffmpegPath,
    maxParallelDownload: 1,
});

// Child Process
const { exec, fork } = require('child_process');

// Other
const version = JSON.parse(fs.readFileSync('./package.json')).version;
var processedMessages = [];

// API KEYS
const bitly = new BitlyClient(config.api_keys.bitly);
const virusTotal = new VirusTotalApi(config.api_keys.virus_total);
const openai = new OpenAIApi(new Configuration({ apiKey: config.api_keys.chatgpt }));

// Databases
db.set(`spam`, {});
if (!db.get('spam_blacklist')) db.set('spam_blacklist', []);
if (!db.get('sorteioRolando')) db.set('sorteioRolando', {});
if (!db.get('participantesSorteio')) db.set('participantesSorteio', {});
if (!db.get('prefix')) db.set('prefix', {});
if (!db.get('marriage')) db.set('marriage', {});
if (!db.get('marryDate')) db.set('marryDate', []);
if (!db.get('pendingMarry')) db.set('pendingMarry', {});
if (!db.get('usr_lang')) db.set('usr_lang', []);
if (!db.get('welcome')) db.set('welcome', []);
if (!db.get('welcomedUsers')) db.set('welcomedUsers', {});
if (!db.get('antilink')) db.set('antilink', []);
if (!db.get('autosticker')) db.set('autosticker', []);
if (!db.get('gamexp')) db.set('gamexp', []);
if (!db.get('level')) db.set('level', []);
const pokedexJson = JSON.parse(fs.readFileSync('./media/pokedex/pokemons.json'));

// Texts
const {
    menuAbout,
    menuAdmin,
    menuConfig,
    menuDev,
    menuDownloader,
    menuFun,
    menuImg,
    menuList,
    menuMarry,
    menuSticker,
    menuUtil,
    menuXp,
} = require('../lib/menus');

var prefix, lang;

const main = async (client, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, isGif, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList } = message;

        var { body } = message;
        const { name, formattedTitle } = chat;
        var user;
        try {
            var { pushname, verifiedName, formattedName } = sender;
            user = sender.id;
            pushname = pushname || verifiedName || formattedName || user.replace('@c.us', '') // verifiedName is the name of someone who uses a business account
        } catch { };
        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : '';
        const botNumber = await client.getHostNumber() + '@c.us';
        const groupId = isGroupMsg ? chat.groupMetadata.id : '';
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : '';
        const isGroupAdmins = groupAdmins.includes(user) || false;
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;

        const enableFilter = config.antispam;

        var isowner = false;
        var owners = config.owners;
        for (let i = 0; i < owners.length; i++) {
            if (owners[i] + '@c.us' == user) {
                isowner = true;
            };
        };
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isxp = db.get('gamexp').includes(groupId)

        // Bot Prefix
        var oqid = groupId || user;
        prefix = db.get(`prefix.${oqid}`) || config.defaultPrefix;

        body = (type === 'chat' && body.startsWith(prefix) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : '')
        if (body == prefix) return;
        var command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();
        if (body.startsWith(prefix+' ')) return;
        const arg = body.substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedMsg = quotedMsg
        const uaOverride = process.env.UserAgent
        const isAntiLink = isGroupMsg ? db.get('antilink').includes(groupId) : false
        const autoSticker = db.get('autosticker').includes(oqid)

        lang =
            (
                sender.id.startsWith('55') ||  // Brazil
                sender.id.startsWith('351') || // Portugal
                sender.id.startsWith('238') || // Cape Green
                sender.id.startsWith('244') || // Angola
                sender.id.startsWith('245') || // Guinea-Bissau
                sender.id.startsWith('240') || // Equatorial Guinea
                sender.id.startsWith('258') || // Mozambique
                sender.id.startsWith('239') || // Sao Tome and Principe
                sender.id.startsWith('670')    // East-Timor
            ) ? "pt_BR" :
                (
                    sender.id.startsWith('34') ||  // Spain
                    sender.id.startsWith('51') ||  // Peru
                    sender.id.startsWith('52') ||  // Mexico
                    sender.id.startsWith('53') ||  // Cuba
                    sender.id.startsWith('54') ||  // Argentina
                    sender.id.startsWith('56') ||  // Chile
                    sender.id.startsWith('57') ||  // Colombia
                    sender.id.startsWith('58') || // Venezuela
                    sender.id.startsWith('591') || // Bolivia
                    sender.id.startsWith('506') || // Costa Rica
                    sender.id.startsWith('503') || // El Salvador
                    sender.id.startsWith('593') || // Ecuador
                    sender.id.startsWith('502') || // Guatemala
                    sender.id.startsWith('504') || // Honduras
                    sender.id.startsWith('505') || // Nicaragua
                    sender.id.startsWith('507') || // Panama
                    sender.id.startsWith('595') || // Paraguay
                    sender.id.startsWith('598')    // Uruguay
                ) ? "es_ES" : "en_US";

        if (!db.get('usr_lang')) db.set('usr_lang', []);
        for (let i = 0; i < db.get('usr_lang').length; i++) {
            if (db.get('usr_lang')[i].id == sender.id.replace(/@c.us/gi, '')) {
                lang = db.get('usr_lang')[i].lang;
                i = db.get('usr_lang').length + 1;
            };
        };

        // Anti Group links
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiLink) {
            try {
                if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                    const gplka = await client.inviteInfo(chats)
                    if (gplka) {
                        client.reply(from, mess[lang].messages.linksAreNotAllowed(), id)
                        await client.removeParticipant(groupId, user)
                        console.log(color('[ANTILINK]', 'blue'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'was kicked', 'from group', color(`"${name || formattedTitle}"`), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'blue'))
                    } else {
                        console.log(color('[ALERT]', 'blue'), color('Invalid group link received!', 'blue'))
                    }
                }
            } catch (err) { return }
        };

        // Antispam banned filter
        if (enableFilter && ((db.get(`spam_blacklist`) && db.get(`spam_blacklist`).length > 0 && db.get(`spam_blacklist`).find(x => x.id === sender.id.replace("@c.us", "")) !== undefined) || (db.get(`spam_blacklist`).time < Date.now() - 43200000))) return;

        // Tier System
        var patents;
        var patente;
        if (isGroupMsg && isxp) {
            patents = mess[lang].tiers();
            var check = rank.getLevel(user, db.get('level'), pushname);
            for (i in patents) {
                if (check >= patents[i].lv) {
                    patente = patents[i].name + " " + patents[i].emoji;
                };
            };
        };

        // XP System
        if (isGroupMsg && isxp && !rank.isWin(user)) {
            try {
                rank.wait(user);
                const levelAtual = rank.getLevel(user, db.get('level'), pushname);
                const xpAtual = Math.floor(Math.random() * (15 - 25 + 1) + 15);
                const neededXp = 5 * Math.pow(levelAtual, 2) + 50 * levelAtual + 100 + Math.floor(levelAtual * 2);
                const theuzlvl = rank.getLevel(user, db.get('level'), pushname);
                rank.addXp(user, xpAtual, db.get('level'), pushname);

                if (neededXp <= rank.getXp(user, db.get('level'), pushname)) {
                    let i = 0;
                    let upLevel = true;
                    while (i < 1000 && upLevel) {
                        rank.wait(user);
                        if ((5 * Math.pow(rank.getLevel(user, db.get('level'), pushname), 2) + 50 * rank.getLevel(user, db.get('level'), pushname) + 100) + rank.getLevel(user, db.get('level'), pushname) <= rank.getXp(user, db.get('level'), pushname)) {
                            rank.addLevel(user, 1, db.get('level'), pushname);
                        } else {
                            patents = mess[lang].tiers();
                            var check = rank.getLevel(user, db.get('level'), pushname);
                            for (i in patents) {
                                if (check >= patents[i].lv) {
                                    patente = patents[i].name + " " + patents[i].emoji;
                                };
                            };
                            await client.reply(from, mess[lang].xp.newLevel(pushname, rank.getXp(user, db.get('level'), pushname), (5 * Math.pow(rank.getLevel(user, db.get('level'), pushname), 2) + 50 * (rank.getLevel(user, db.get('level'), pushname) + 1) + 100), (rank.getLevel(user, db.get('level'), pushname)), patente), id);
                            upLevel = false;
                        };
                        i++;
                    };
                };
            } catch (err) {
                console.error(err);
            };
        };

        // Auto-Stk Image
        if (autoSticker && !isCmd && isMedia && isImage) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await client.sendImageAsSticker(from, imageBase64, mess[lang].stickerMetadataImg(true))
            if (!isGroupMsg) console.log(color('[AUTOSTK]', 'blue'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'sent an', color('image', 'green'), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'blue'))
            if (isGroupMsg) console.log(color('[AUTOSTK]', 'blue'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'sent an', color('image', 'green'), 'in group', color(`"${name || formattedTitle}"`), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'blue'))
        }

        // Auto-Stk Video
        if (autoSticker && !isCmd && isMedia && isVideo) {
            const mediaData = await decryptMedia(message, uaOverride)
            const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await client.sendMp4AsSticker(from, videoBase64, null, mess[lang].stickerMetadataVideo(10, '00:00:05.0', true, true), id)
            if (!isGroupMsg) console.log(color('[AUTOSTK]', 'blue'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'sent an', color('video', 'green'), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'blue'))
            if (isGroupMsg) console.log(color('[AUTOSTK]', 'blue'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'sent an', color('video', 'green'), 'in group', color(`"${name || formattedTitle}"`), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'blue'))
        }

        // Check commands [ANTISPAM]
        if (isCmd && !isGroupMsg && enableFilter && msgFilter.isFiltered(from, sender.id, id, client, { mess, lang }, isCmd)) {
            console.log(color(`[${parseInt(db.get(`spam.${sender.id.replace("@c.us", "")}`)) || 0}][SPAM]`, 'red'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'sent', color(`[${body}]`, 'green'), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'red'));
        } else {
            if (isCmd && isGroupMsg && enableFilter && msgFilter.isFiltered(from, sender.id, id, client, { mess, lang }, isCmd)) {
                console.log(color(`[${parseInt(db.get(`spam.${sender.id.replace("@c.us", "")}`)) || 0}][SPAM]`, 'red'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'sent', color(`[${body}]`, 'green'), 'in group', color(`"${name || formattedTitle}"`), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'red'));
            } else {
                // Command PV
                if (!(enableFilter && msgFilter.isFiltered(from, sender.id, id, client, { mess, lang }, isCmd)) && isCmd && !isGroupMsg) { console.log(color('[CHAT]', 'white'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'sent', color(`[${body}]`, 'green'), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'orange')) }

                // Command GP
                if (!(enableFilter && msgFilter.isFiltered(from, sender.id, id, client, { mess, lang }, isCmd)) && isCmd && isGroupMsg) { console.log(color('[GROUP]', 'white'), color(`${sender.id.replace("@c.us", "")}`), '-', color(pushname), 'sent', color(`[${body}]`, 'green'), 'in group', color(`"${name || formattedTitle}"`), 'at', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'orange')) }

                if (enableFilter && isCmd) {
                    msgFilter.addFilter(sender.id, config.spam_delay, config.block_delay);
                };
            };
        };

        switch (command) {
            // Menus
            case 'menu':
            case 'menus':
            case 'help':
            case 'ajuda':
            case 'commands':
            case 'comandos':
            case 'ayuda':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg && args.length == 0) {
                    var menuResposta = menuList[lang](prefix, version);
                    await client.reply(from, menuResposta, id)
                } else if (isGroupMsg && args.length == 0) {
                    var menuResposta = menuList[lang](prefix, version);
                    await client.reply(from, menuResposta, id)
                } else {
                    var usuarioOpcao = args[0].toLowerCase()
                    switch (usuarioOpcao) {
                        case '1':
                        case 'sticker':
                        case 'fig':
                        case 'stk':
                        case 'figurinha':
                        case 'a':
                            menuResposta = menuSticker[lang](prefix)
                            break
                        case '2':
                        case 'img':
                        case 'editor':
                        case 'imgeditor':
                        case 'editorimg':
                        case 'imagem':
                        case 'image':
                        case 'editarimagem':
                        case 'editimg':
                        case 'editimage':
                        case 'editimagem':
                        case 'b':
                            menuResposta = menuImg[lang](prefix)
                            break
                        case '3':
                        case 'download':
                        case 'down':
                        case 'conv':
                        case 'downloader':
                        case 'c':
                            menuResposta = menuDownloader[lang](prefix)
                            break
                        case '4':
                        case 'diversão':
                        case 'diversao':
                        case 'diversões':
                        case 'diversoes':
                        case 'fun':
                        case 'funs':
                        case 'divertido':
                        case 'd':
                            menuResposta = menuFun[lang](prefix)
                            break
                        case '5':
                        case 'ferramentas':
                        case 'ferramenta':
                        case 'utilidades':
                        case 'utilidade':
                        case 'utility':
                        case 'util':
                        case 'uteis':
                        case 'utilities':
                        case 'e':
                            menuResposta = menuUtil[lang](prefix)
                            break
                        case '6':
                        case 'rank':
                        case 'gamexp':
                        case 'xp':
                        case 'nivel':
                        case 'nível':
                        case 'níveis':
                        case 'niveis':
                        case 'level':
                        case 'levels':
                        case 'leveis':
                        case 'exp':
                        case 'f':
                            menuResposta = menuXp[lang](prefix)
                            break
                        case '7':
                        case 'marry':
                        case 'casar':
                        case 'casamento':
                        case 'married':
                        case 'f':
                            menuResposta = menuMarry[lang](prefix)
                            break
                        case '8':
                        case 'grupo':
                        case 'gp':
                        case 'group':
                        case 'admin':
                        case 'adm':
                        case 'h':
                            menuResposta = menuAdmin[lang](prefix)
                            break
                        case 'config':
                        case '9':
                        case 'i':
                            if (isGroupMsg) return await client.reply(from, mess[lang].menu.onlyPv(), id)
                            menuResposta = menuConfig[lang](prefix)
                            break
                        case 'criador':
                        case 'criadores':
                        case 'dono':
                        case 'donos':
                        case 'dev':
                        case 'developer':
                        case 'desenvolvedor':
                        case 'devs':
                        case 'desenvolvedores':
                        case 'owner':
                        case 'owners':
                        case 'master':
                            if (!isowner) return
                            menuResposta = menuDev[lang](prefix)
                            break

                        default:
                            menuResposta = mess[lang].menu.dontExist()
                    }
                    await client.reply(from, menuResposta, id)
                }
                break

            case 'sobre':
            case 'about':
            case 'criadores':
            case 'developers':
            case 'dev':
            case 'devs':
            case 'owners':
                await client.sendReplyWithMentions(from, menuAbout[lang](version), id)
                break

            case 'menusticker':
            case 'stkmenu':
            case 'menustk':
            case 'menu1':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                await client.reply(from, menuSticker[lang](prefix), id)
                break

            case 'menuimg':
            case 'menuimage':
            case 'menuimagem':
            case 'menupicture':
            case 'menu2':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                await client.reply(from, menuImg[lang](prefix), id)
                break

            case 'menudownloader':
            case 'menuaudio':
            case 'menuplay':
            case 'menumusica':
            case 'menudownload':
            case 'menubaixar':
            case 'menu3':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                await client.reply(from, menuDownloader[lang](prefix), id)
                break

            case 'menufun':
            case 'menudiversao':
            case 'menudiversão':
            case 'menu4':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                await client.reply(from, menuFun[lang](prefix), id)
                break

            case 'menuferramenta':
            case 'menuferramentas':
            case 'menuutilidades':
            case 'menutools':
            case 'menutool':
            case 'menuutil':
            case 'menu5':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                await client.reply(from, menuUtil[lang](prefix), id)
                break

            case 'menuxp':
            case 'menuexp':
            case 'menulp':
            case 'menurank':
            case 'menugamexp':
            case 'menugameexp':
            case 'menu6':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                await client.reply(from, menuXp[lang](prefix), id)
                break

            case 'menuadmin':
            case 'menugrupo':
            case 'menugroup':
            case 'menu8':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                await client.reply(from, menuAdmin[lang](prefix), id)
                break

            case 'menuconfig':
            case 'menusettings':
            case 'menu9':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (isGroupMsg) return await client.reply(from, mess[lang].menu.onlyPv(), id)
                await client.reply(from, menuConfig[lang](prefix), id)
                break

            case 'menucriador':
            case 'menudono':
            case 'menuowner':
            case 'ownermenu':
                if (!isowner) return
                menuResposta = menuDev[lang](prefix)
                await client.reply(from, menuResposta, id)
                break

            case 'ping':
            case 'pimg':
            case 'velocidade':
            case 'speed':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var processUptime = process.uptime();
                const uptime = time(Math.floor(processUptime * 1000));
                await client.reply(from, mess[lang].ping.resp(processTime(t, moment()), uptime), id);
                break;


            case 'sys':
                if (!isowner) return
                client.simulateTyping(from, true);
                client.sendSeen(from);
                const rTime = (seconds) => {
                    const pad = (s) => { return (s < 10 ? '0' : '') + s }
                    var hours = Math.floor(seconds / (60 * 60)); var minutes = Math.floor(seconds % (60 * 60) / 60); var seconds = Math.floor(seconds % 60)
                    return mess[lang].sys.time(pad(hours), pad(minutes), pad(seconds))
                }
                const osUptime = () => {
                    var up_sec = os.uptime(); var up_min = up_sec / 60; var up_hour = up_min / 60; up_sec = Math.floor(up_sec); up_min = Math.floor(up_min); up_hour = Math.floor(up_hour); up_hour = up_hour % 60; up_min = up_min % 60; up_sec = up_sec % 60
                    return mess[lang].sys.time(up_hour, up_min, up_sec);
                }
                const ramMemory = () => {
                    var allRam = os.totalmem(); var kbRam = allRam / 1024; var mbRam = kbRam / 1024; var gbRam = mbRam / 1024; kbRam = Math.floor(kbRam); mbRam = Math.floor(mbRam); gbRam = Math.floor(gbRam); mbRam = mbRam % 1024; kbRam = kbRam % 1024; allRam = allRam % 1024;
                    return mess[lang].sys.mem(gbRam, mbRam, kbRam, allRam)
                }
                const timeBot = rTime(process.uptime());
                const loadedMsgs = await client.getAmountOfLoadedMessages();
                const chatIdss = await client.getAllChatIds();
                const groupss = await client.getAllGroups();
                const zapVer = await client.getWAVersion();
                var owaVerJson = JSON.parse(fs.readFileSync('./node_modules/@open-wa/wa-automate/package.json'));
                var owaVer = owaVerJson.version;

                var package = JSON.parse(fs.readFileSync('./package.json'));

                await client.reply(from, mess[lang].sys.resp(processTime(t, moment()), loadedMsgs, groupss, chatIdss, timeBot, osUptime(), os.cpus()[0].model.replace(/          /g, ''), os.cpus()[0].speed, os.type(), os.arch(), os.platform, os.release(), ramMemory(), os.userInfo().username, os.hostname(), zapVer, owaVer, package.version, config.defaultPrefix, botNumber.replace('@c.us', ''), config.owners, config.antispam, config.only_groups, config.save_musics), id);
                break;

            //XP
            case 'cassino':
            case 'casino':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return await client.reply(from, mess[lang].xp.onlyGroupsWithXp(), id)
                if (!isxp) return client.reply(from, mess[lang].xp.xpIsOff(), id);
                const checkxpc = rank.getXp(user, db.get('level'), pushname)
                if (checkxpc <= 500) return client.reply(from, mess[lang].games.tooLowXp(500, checkxpc), id)
                if (args.length !== 1) return client.reply(from, mess[lang].games.specifyAmount(), id)
                if (isNaN(args[0])) return client.reply(from, mess[lang].games.onlyNum(), id)
                var bet = Math.floor(Number(args[0]));
                if (bet < 30) return client.reply(from, mess[lang].games.tooLowVal("30", checkxpc), id)
                if (bet > checkxpc || bet > 500) return client.reply(from, mess[lang].games.tooHighVal(checkxpc, 500), id)
                var ncasxp = -bet;
                var pcasxp = bet*(Math.floor(Math.random() * (40 - 25)) + 25);
                var cassin = ['7️⃣', '🍒', '🎃']
                const cassin1 = cassin[Math.floor(Math.random() * cassin.length)]
                const cassin2 = cassin[Math.floor(Math.random() * cassin.length)]
                const cassin3 = cassin[Math.floor(Math.random() * cassin.length)]
                var cassinend = cassin1 + cassin2 + cassin3
                if (cassinend == '7️⃣7️⃣7️⃣' || cassinend == '🍒🍒🍒' || cassinend == '🎃🎃🎃') {
                    if (Math.random() > 0.5) {
                        await client.reply(from, `${mess[lang].games.cwin({ e1: cassin1, e2: cassin2, e3: cassin3 }, pcasxp)}\n\n${mess[lang].xp.actualChance("1.85")}`, id)
                        rank.addXp(user, pcasxp, db.get('level'), pushname)
                    };
                } else {
                    await client.reply(from, `${mess[lang].games.close({ e1: cassin1, e2: cassin2, e3: cassin3 }, ncasxp)}\n\n${mess[lang].xp.actualChance("1.85")}`, id)
                    rank.addXp(user, ncasxp, db.get('level'), pushname)
                }
                break

            case 'roulette':
            case 'roleta':
            case 'ruleta':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return await client.reply(from, mess[lang].xp.onlyGroupsWithXp(), id)
                if (!isxp) return client.reply(from, mess[lang].xp.xpIsOff(), id);
                const checkxpr = rank.getXp(user, db.get('level'), pushname)
                const doublerol = Math.floor(Math.random() * 6) + 1
                if (checkxpr <= 2000) return client.reply(from, mess[lang].games.tooLowXp("2.000", checkxpr), id)
                if (args.length !== 1) return client.reply(from, mess[lang].games.specifyAmount(), id)
                if (isNaN(args[0])) return client.reply(from, mess[lang].games.onlyNum(), id)
                var bet = Math.floor(Number(args[0]));
                if (bet >= checkxpr || bet >= '251') return client.reply(from, mess[lang].games.tooHighVal(checkxpr, 250), id)
                if (bet < '30') return client.reply(from, mess[lang].games.tooLowVal(30), id)
                var nrolxp = -bet;
                var prolxp = bet*(Math.floor(Math.random() * (6 - 3)) + 3);
                if (doublerol < 6) {
                    await client.reply(from, `${mess[lang].games.rlose(nrolxp)}\n\n${mess[lang].xp.actualChance(16)}`, id)
                    rank.addXp(user, nrolxp, db.get('level'), pushname)
                } else if (doublerol == 6) {
                    await client.reply(from, `${mess[lang].games.rwin(prolxp)}\n\n${mess[lang].xp.actualChance(16)}`, id)
                    rank.addXp(user, prolxp, db.get('level'), pushname)
                }
                break

            case 'profile':
            case 'perfil':
                if (!isGroupMsg) return await client.reply(from, mess[lang].onlyGroups(), id);
                var errorurl = "'./media/welcome/profile.png'";
                if (isGroupMsg) {
                    if (mentionedJidList.length == 1) {
                        var qmid = mentionedJidList[0];
                        var tmtM = await marriage.getTimer(qmid);
                        var marryTime = ms(Date.now() - tmtM);
                        var estadoCivil = await marriage.getCouple(mentionedJidList[0]) || mess[lang].marriage.alone();
                        if (estadoCivil !== mess[lang].marriage.alone()) {
                            var estadoCivil = mess[lang].profile.marriagedWith(estadoCivil.replace("@c.us", ""), marryTime.days);
                        };
                        try {
                            var namae = '@'+mentionedJidList[0].replace('@c.us', '');
                        } catch (err) {
                            break;
                        }
                        if (qmid == botNumber) return client.simulateTyping(from, false);
                        try {
                            var pic = await client.getProfilePicFromServer(qmid)
                        } catch (err) {
                            var pic = errorurl;
                        }
                        var adm = groupAdmins.includes(qmid) ? mess[lang].yes() : mess[lang].no();

                        if (pic == undefined) {
                            var pfp = errorurl
                        } else {
                            var pfp = pic
                        }
                        await client.sendFile(from, pfp, 'pfo.jpg', mess[lang].profile.resp(namae, adm, estadoCivil, rank.getLevel(qmid, db.get('level'), pushname), rank.getXp(qmid, db.get('level'), pushname), (5 * Math.pow(rank.getLevel(qmid, db.get('level'), pushname), 2) + 50 * rank.getLevel(qmid, db.get('level'), pushname) + 100), patente, isxp), id)
                            .catch(() => {
                                client.sendFile(from, './media/welcome/profile.png', 'profile.png', mess[lang].profile.resp(namae, adm, estadoCivil, rank.getLevel(qmid, db.get('level'), pushname), rank.getXp(qmid, db.get('level'), pushname), (5 * Math.pow(rank.getLevel(qmid, db.get('level'), pushname), 2) + 50 * rank.getLevel(qmid, db.get('level'), pushname) + 100), patente, isxp), id)
                                    .catch((err) => {
                                        console.log(err);
                                        client.reply(from, mess[lang].somethingWentWrong(), id);
                                    });
                            });
                    } else if (quotedMsg) {
                        var qmid = quotedMsgObj.sender.id
                        var tmtM = await marriage.getTimer(qmid);
                        var marryTime = ms(Date.now() - tmtM);
                        var estadoCivil = await marriage.getCouple(quotedMsgObj.sender.id) || mess[lang].marriage.alone();
                        if (estadoCivil !== mess[lang].marriage.alone()) {
                            var estadoCivil = mess[lang].profile.marriagedWith(estadoCivil.replace("@c.us", ""), marryTime.days);
                        };
                        var namae = quotedMsgObj.sender.pushname
                        if (qmid == botNumber) return client.simulateTyping(from, false);
                        try {
                            var pic = await client.getProfilePicFromServer(qmid)
                        } catch (err) {
                            var pic = errorurl;
                        }
                        //var sts = await client.getStatus(qmid)
                        var adm = groupAdmins.includes(qmid) ? mess[lang].yes() : mess[lang].no()

                        //const { status } = sts
                        if (pic == undefined) {
                            var pfp = errorurl
                        } else {
                            var pfp = pic
                        }
                        await client.sendFile(from, pfp, 'pfo.jpg', mess[lang].profile.resp(namae, adm, estadoCivil, rank.getLevel(qmid, db.get('level'), pushname), rank.getXp(qmid, db.get('level'), pushname), (5 * Math.pow(rank.getLevel(qmid, db.get('level'), pushname), 2) + 50 * rank.getLevel(qmid, db.get('level'), pushname) + 100), patente, isxp), id)
                            .catch(() => {
                                client.sendFile(from, './media/welcome/profile.png', 'profile.png', msgF, id)
                                    .catch((err) => {
                                        console.log(err);
                                        client.reply(from, mess[lang].somethingWentWrong(), id);
                                    });
                            });
                    } else if (!quotedMsg) {
                        var tmtM = await marriage.getTimer(sender.id);
                        var marryTime = ms(Date.now() - tmtM);
                        var estadoCivil = await marriage.getCouple(sender.id) || mess[lang].marriage.alone();
                        var coupleTime = marryTime || '0';
                        if (estadoCivil !== mess[lang].marriage.alone()) {
                            var estadoCivil = mess[lang].profile.marriagedWith(estadoCivil.replace("@c.us", ""), coupleTime.days);
                        };
                        try {
                            var pic = await client.getProfilePicFromServer(author);
                        } catch (err) {
                            var pic = errorurl;
                        }
                        var namae = pushname
                        //var sts = await client.getStatus(author)
                        var adm = isGroupAdmins ? mess[lang].yes() : mess[lang].no()
                        //const { status } = sts
                        if (pic == undefined) {
                            var pfp = errorurl
                        } else {
                            var pfp = pic
                        }
                        await client.sendFile(from, pfp, 'pfo.jpg', mess[lang].profile.resp(namae, adm, estadoCivil, rank.getLevel(user, db.get('level'), pushname), rank.getXp(user, db.get('level'), pushname), (5 * Math.pow(rank.getLevel(user, db.get('level'), pushname), 2) + 50 * rank.getLevel(user, db.get('level'), pushname) + 100), patente, isxp), id)
                            .catch(() => {
                                client.sendFile(from, './media/welcome/profile.png', 'profile.png', mess[lang].profile.resp(namae, adm, estadoCivil, rank.getLevel(user, db.get('level'), pushname), rank.getXp(user, db.get('level'), pushname), (5 * Math.pow(rank.getLevel(user, db.get('level'), pushname), 2) + 50 * rank.getLevel(user, db.get('level'), pushname) + 100), patente, isxp), id)
                                    .catch((err) => {
                                        console.log(err);
                                        client.reply(from, mess[lang].somethingWentWrong(), id);
                                    });
                            });
                    } else {
                        client.reply(from, mess[lang].somethingWentWrong(), id)
                    }
                }
                break

            case 'gamexp':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return await client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return await client.reply(from, mess[lang].onlyAdmins(), id)
                if (isGroupMsg && isGroupAdmins || isGroupMsg && isowner) {
                    if (args.length !== 1) return client.reply(from, mess[lang].onOrOff(), id)
                    if (args[0].toLowerCase() == 'on') {
                        if (db.get('gamexp').includes(groupId)) return client.reply(from, mess[lang].xp.xpAlreadyOn(), id)
                        db.push('gamexp', groupId)
                        await client.reply(from, mess[lang].xp.xpOn(), id)
                    } else if (args[0].toLowerCase() == 'off') {
                        let tmpDb = db.get('gamexp');
                        let dbPrm = tmpDb.indexOf(groupId);
                        tmpDb.splice(dbPrm, 1);
                        db.set('gamexp', tmpDb);
                        await client.reply(from, mess[lang].xp.xpOff(), id)
                    } else {
                        client.reply(from, mess[lang].onOrOff(), id);
                    }
                } else {
                    await client.reply(from, mess[lang].onlyAdmins(), id)
                }
                break

            case 'nivel':
            case 'nível':
            case 'nvl':
            case 'level':
            case 'lvl':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isxp) return client.reply(from, mess[lang].xp.xpIsOff(), id)
                errorImg = fs.readFileSync("./media/welcome/profile.png");
                const userLevel = rank.getLevel(user, db.get('level'), pushname)
                const userXp = rank.getXp(user, db.get('level'), pushname)
                const ppLink = await client.getProfilePicFromServer(user)
                if (ppLink === undefined || ppLink == "ERROR: 404" || ppLink == "ERROR: 401" || ppLink == null) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                let colorlib = ["#ffa200", "#f73909", "#35ed02", "#0430f2", "#ee04f2", "#fcfcfc", "#eff700", "#7f3d11"];
                let colorlv = colorlib[Math.floor(Math.random() * colorlib.length)]
                const minXp = userLevel == 1 ? 0 : (5 * Math.pow((userLevel - 1), 2) + 50 * (userLevel - 1) + 100 + Math.floor((userLevel - 1) * 2));
                const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100 + Math.floor(userLevel * 2);
                const ranq = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setLevelColor('#ffa200', '#ffa200')
                    .setRank(Number(rank.getRank(user, db.get('level'), pushname)))
                    .setCurrentXP(userXp)
                    .setOverlay('#000000', 100, false)
                    .setMinXP(minXp)
                    .setRequiredXP(requiredXp)
                    .setProgressBar(colorlv, 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(user.replace('@c.us', '').substring(user.replace('@c.us', '').length - 4, user.replace('@c.us', '').length))
                ranq.build()
                    .then(async (c) => {
                        var base64 = new Buffer.from(c).toString('base64');
                        var b64b = "data:image/png;base64," + base64;
                        await client.sendImage(from, b64b, `${user}_card.png`, `XP: ${userXp} / ${requiredXp}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, mess[lang].somethingWentWrong(), id)
                    })
                break

            case 'tier':
            case 'tiers':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id);
                if (!isxp) return client.reply(from, mess[lang].xp.xpIsOff(), id)
                var peoXptwo = rank.getXp(user, db.get('level'), pushname)
                var peoLeveltwo = rank.getLevel(user, db.get('level'), pushname)
                var ineedxptwo = 5 * Math.pow(peoLeveltwo, 2) + 50 * peoLeveltwo + 100
                var ranks = mess[lang].xp.tiersTop();
                for (i in patents) {
                    ranks += mess[lang].xp.tiers(patents[i].name, patents[i].emoji, patents[i].lv);
                };
                await client.reply(from, ranks, id)
                await client.reply(from, mess[lang].xp.finalMsgTiers(pushname, peoLeveltwo, peoXptwo, ineedxptwo), id)
                break

            case 'rank':
            case 'players':
            case 'player':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                const cklvl = db.get('level');

                cklvl.sort(function (a, b) { return b.xp - a.xp; });

                var playersTop = 10;
                if (cklvl.length < 10) playersTop = cklvl.length;

                var boardf = mess[lang].top10.top();
                try {
                    if (!patents) {
                        patents = mess[lang].tiers();
                        var check = rank.getLevel(user, db.get('level'), pushname);
                        for (i in patents) {
                            if (check >= patents[i].lv) {
                                patente = patents[i].name + " " + patents[i].emoji;
                            };
                        };
                    };

                    for (let i = 0; i < playersTop; i++) {
                        var role;
                        for (b in patents) {
                            if (cklvl[i].level >= patents[b].lv) {
                                role = patents[b].name + " " + patents[b].emoji;
                            };
                        };

                        if (cklvl[i].nick == undefined) {
                            var nicko = await rank.getInfo(cklvl[i].id, db.get('level')).nick;
                            boardf += mess[lang].top10.resp((i + 1), nicko, cklvl[i].xp, cklvl[i].level, role);
                        } else {
                            boardf += mess[lang].top10.resp((i + 1), cklvl[i].nick, cklvl[i].xp, cklvl[i].level, role);
                        }
                    }
                    boardf += mess[lang].top10.bott(cklvl.length);
                    await client.reply(from, boardf, id);
                } catch (err) {
                    console.log(err)
                    await client.reply(from, mess[lang].somethingWentWrong());
                }
                break

            case 'axp':
                if (!isowner) return
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isxp) return client.reply(from, mess[lang].xp.xpIsOff(), id);
                if (args.length !== 2) return client.reply(from, mess[lang].wrongUse.axp(prefix + command), id)
                if (isNaN(args[1])) return client.reply(from, mess[lang].onlyNum(), id)
                if (mentionedJidList.length !== 0) {
                    for (let give of mentionedJidList) {
                        rank.addXp(give, Number(args[1]), db.get('level'), pushname)
                        await client.sendReplyWithMentions(from, mess[lang].xp.axp('@' + give, args[1]), id)
                    }
                } else {
                    rank.addXp(args[0] + '@c.us', Number(args[1]), db.get('level'), pushname)
                    await client.sendReplyWithMentions(from, mess[lang].xp.axp('@' + args[0], args[1]), '', id)
                }
                break

            case 'give':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].xp.onlyGroupsWithXp(), id)
                if (!isxp) return client.reply(from, mess[lang].xp.xpIsOff(), id);
                if (args.length < 2) return client.reply(from, mess[lang].wrongUse.addTagAndVal(), id)
                var valuetogive = args[args.length - 1];
                if (isNaN(valuetogive)) return client.reply(from, mess[lang].onlyNum(), id)
                if (mentionedJidList.length <= 0) return client.reply(from, mess[lang].xp.tagGive(prefix + command), id);

                var xpAtualGv;
                var giveMinus = -Number(valuetogive)
                var giveMore = Number(valuetogive)
                var xpDado = Math.floor(parseInt(valuetogive))

                for (let give of mentionedJidList) {
                    xpAtualGv = rank.getXp(user, db.get('level'), pushname)

                    if (giveMore < 0) return client.reply(from, mess[lang].xp.cantUseMinus(), id)

                    if (xpAtualGv < xpDado) return client.reply(from, mess[lang].xp.cantGiveMoreThanYouHave(), id)
                    rank.addXp(user, Math.floor(giveMinus), db.get('level'))
                    rank.addXp(give, Math.floor(giveMore), db.get('level'))
                    const xpAtualTwoGv = rank.getXp(user, db.get('level'), pushname)
                    await client.sendReplyWithMentions(from, mess[lang].xp.give(xpDado, give, xpAtualGv, xpAtualTwoGv), id)
                }
                break

            case 'xp':
            case 'xpstats':
            case 'xpstat':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isxp) return client.reply(from, mess[lang].xp.xpIsOff(), id);
                const uzerlvl = rank.getLevel(user, db.get('level'), pushname)
                const theuzlvl = rank.getLevel(user, db.get('level'), pushname)
                const thexpnde = 5 * Math.pow(theuzlvl, 2) + 50 * theuzlvl + 100
                await client.reply(from, mess[lang].xp.level(pushname, rank.getXp(user, db.get('level')), thexpnde, uzerlvl, patente), id)
                break

            // SISTEMA DE CASAMENTOS
            case 'divorce':
            case 'divorciar':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!db.get(`marriage.${sender.id.replace('.us', '')}`)) return client.reply(from, mess[lang].marriage.dontMarriedToDivorce(), id);
                var o = await marriage.getCouple(sender.id);
                await marriage.killTimer(sender.id);
                db.delete(`marriage.${sender.id.replace('.us', '')}`);
                db.delete(`marriage.${o.replace('.us', '')}`);
                client.sendReplyWithMentions(from, mess[lang].marriage.divorce(sender.id.replace('@c.us', ''), o), id);
                break

            case 'aceitarcasamento':
            case 'acceptmarry':
            case 'am':
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (mentionedJidList[0] == sender.id) return client.reply(from, mess[lang].marriage.cantSelfMarry(), id)
                if (db.get(`pendingMarry.${sender.id.replace('.us', '')}`).length == 0) return client.reply(from, mess[lang].marriage.noOneSentYouARequest(), id);
                if (mentionedJidList.length !== 1) return client.reply(from, mess[lang].marriage.tagSomeone(prefix + command), id);
                if (db.get(`marriage.${sender.id.replace('.us', '')}`)) return client.reply(from, mess[lang].marriage.cantMarryTwoOrMore(prefix), id);

                var marriages = await db.get(`pendingMarry.${sender.id.replace('.us', '')}`);
                var found = false;
                var pos = null;
                for (let i = 0; i < marriages.length; i++) {
                    if (marriages[i] == mentionedJidList[0]) {
                        found = true;
                        pos = i;
                    }
                }

                if (db.get(`marriage.${mentionedJidList[0].replace('.us', '')}`)) {
                    if (db.get(`pendingMarry.${sender.id.replace(".us", "")}`).length > 1) {
                        db.delete(`pendingMarry.${sender.id.replace('.us', '')}[${pos}]`);
                    } else {
                        db.set(`pendingMarry.${sender.id.replace(".us", "")}`, []);
                    }
                    return client.reply(from, mess[lang].marriage.alreadyMarried(), id);
                }

                if (!found) return client.reply(from, mess[lang].marriage.thatPersonDontSendYouARequest(), id);
                marriage.marry(sender.id, mentionedJidList[0]).then(async () => {
                    var currentTime = new Date();
                    var dia = moment(currentTime).format("DD");
                    var mes = moment(currentTime).format("MM");
                    var ano = moment(currentTime).format("YYYY");

                    mes = mess[lang].getMounth(mes);

                    client.sendReplyWithMentions(from, mess[lang].marriage.marry(sender.id.replace('@c.us', ''), mentionedJidList[0].replace('@c.us', ''), dia, mes, ano), id);
                    await marriage.startTimer(sender.id, mentionedJidList[0]);
                    db.set(`pendingMarry.${sender.id.replace(".us", "")}`, []);
                    db.set(`pendingMarry.${mentionedJidList[0].replace(".us", "")}`, []);
                })
                    .catch((e) => {
                        console.log(e);
                        client.reply(from, mess[lang].somethingWentWrong(), id);
                    });
                break

            case 'marry':
            case 'casar':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (mentionedJidList[0] == sender.id) return client.reply(from, mess[lang].marriage.cantSelfMarry(), id)
                if (db.get(`marriage.${sender.id.replace('.us', '')}`)) return client.reply(from, mess[lang].marriage.cantMarryTwoOrMore(prefix), id);
                if (mentionedJidList[0] === botNumber) return await client.reply(from, mess[lang].marriage.cantMarryBot(), id)
                if (mentionedJidList.length !== 1) return client.reply(from, mess[lang].wrongUse.tagSomeone(prefix + command), id);
                if (db.get(`marriage.${mentionedJidList[0].replace('.us', '')}`)) return client.reply(from, mess[lang].marriage.alreadyMarried(), id);

                var arrayMs = await db.get(`pendingMarry.${mentionedJidList[0].replace(".us", "")}`) || [];
                if (arrayMs[0] == null || arrayMs == null || !arrayMs || arrayMs == [] || arrayMs == [null]) {
                    db.set(`pendingMarry.${mentionedJidList[0].replace(".us", "")}`, []);
                }
                var arrayMs = await db.get(`pendingMarry.${mentionedJidList[0].replace(".us", "")}`);

                for (let i = 0; i < arrayMs.length; i++) {
                    if (arrayMs[i].includes(sender.id.replace("@c.us", ""))) return client.reply(from, mess[lang].marriage.alreadySentRequest(), id);
                }

                if (!db.get(`pendingMarry.${mentionedJidList[0].replace(".us", "")}`)) {
                    db.set(`pendingMarry.${mentionedJidList[0].replace('.us', '')}`, [sender.id]);
                } else {
                    var arrF = await db.get(`pendingMarry.${mentionedJidList[0].replace(".us", "")}`) || [];
                    arrF.push(sender.id);
                    db.set(`pendingMarry.${mentionedJidList[0].replace('.us', '')}`, arrF);
                }
                client.sendReplyWithMentions(from, mess[lang].marriage.marryRequest(sender.id.replace("@c.us", ""), mentionedJidList[0].replace('@c.us', '')), id);
                break

            case 'casal':
            case 'couple':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var tmtM = await marriage.getTimer(sender.id);
                var oooooo = (Date.now() - tmtM);
                var marryTime = ms(oooooo);
                if (mentionedJidList == 0) {
                    if (!db.get(`marriage.${sender.id.replace('.us', '')}`)) return client.reply(from, mess[lang].marriage.youArentMarried(), id);
                    var a = await marriage.getCouple(sender.id);
                    if (a == "err") return client.reply(from, mess[lang].marriage.youArentMarried(), id);
                    client.sendReplyWithMentions(from, mess[lang].marriage.selfCouple(sender.id.replace("@c.us", ""), a.replace('@c.us', ''), marryTime.days), id);
                } else {
                    if (!db.get(`marriage.${mentionedJidList[0].replace('.us', '')}`)) return client.reply(from, mess[lang].marriage.thisUserArentMarried(), id);
                    var a = await marriage.getCouple(mentionedJidList[0]);
                    if (a == "err") return client.reply(from, mess[lang].marriage.thisUserArentMarried(), id);
                    client.sendReplyWithMentions(from, mess[lang].marriage.couple(sender.id.replace("@c.us", ""), mentionedJidList[0].replace('@c.us', ''), a.replace('@c.us', '')), id);
                }
                break

            //Sticker Creator
            case 's':
            case 'sticker':
            case 'stiker':
            case 'stk':
            case 'sg':
            case 'stick':
            case 'stik':
            case 'gs':
            case 'stickergif':
            case 'stikergif':
            case 'gifsticker':
            case 'gifstk':
            case 'stkgif':
            case 'gifstiker':
            case 'figu':
            case 'figurinha':
            case 'figurinhaanimada':
            case 'f':
            case 'fa':
            case 'fig':
            case 'giphy':
            case 'giphysticker':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isImage && !isVideo && !isGif && !isQuotedImage && !isQuotedVideo) return client.reply(from, mess[lang].wrongUse.quotingImageOrVideoOrGIF(prefix + command), id)
                try {
                    if ((isMedia && type === 'image' || mimetype === 'image' || isQuotedImage)) {
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                        client.sendImageAsSticker(from, imageBase64, mess[lang].stickerMetadataImg(true)).then(() => {
                        })
                    } else if (isMedia && type === 'video' || mimetype === 'video/gif' || isQuotedVideo || isQuotedGif) {
                        try {
                            if (!isQuotedVideo && !isQuotedGif) {
                                const encryptMedia = isQuotedGif || isQuotedVideo ? quotedMsg : message
                                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                                const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                                client.simulateTyping(from, true);
                                await client.sendMp4AsSticker(from, videoBase64, null, mess[lang].stickerMetadataVideo(10, "00:00:05.0", false, true), id)
                                    .then(async () => { })
                            } else if (isQuotedVideo || isQuotedGif) {
                                const encryptMedia = isQuotedGif || isQuotedVideo ? quotedMsg : message
                                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                                const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                                client.simulateTyping(from, true);
                                await client.sendMp4AsSticker(from, videoBase64, null, mess[lang].stickerMetadataVideo(10, "00:00:05.0", false, true), id)
                                    .then(async () => { })
                            }
                        } catch (err) {
                            console.log(err)
                            client.reply(from, mess[lang].somethingWentWrong(), id)
                        }
                    } else {
                        client.reply(from, mess[lang].wrongUse.quotingImageOrVideoOrGIF(prefix + command), id)
                    }
                } catch (err) {
                    console.log(err)
                    client.reply(from, mess[lang].wrongUse.quotingImageOrVideoOrGIF(prefix + command), id)
                }
                break

            case 'stkmake':
            case 'smake':
            case 'makestk':
            case 'makesticker':
            case 'stickermaker':
            case 'stkmaker':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var query = body.slice(prefix.length + command.length + 1);
                if (!query || args.length < 1 || !args) return client.reply(from, mess[lang].wrongUse.andSearch(prefix + command), id);
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                var imageF = await imageFromGoogle.get(query, {
                    headless: true,
                    executablePath: executablePath
                });
                if (imageF.includes("No results found")) return client.reply(from, mess[lang].noResultFound(), id);
                await client.sendImageAsSticker(from, imageF, mess[lang].stickerMetadataImg(true));
                break

            case 'mixemoji':
            case 'mixmoji':
            case 'mashupemoji':
            case 'emojikitchen':
            case 'ek':
            case 'mix':
            case 'mashup':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 1) return client.reply(from, mess[lang].ek.wrongUse(prefix + command), id);
                if (args.length > 2) return client.reply(from, mess[lang].ek.maxEmojis(2), id);

                var emoji1, emoji2;
                if (args.length == 0) {
                    var emojis = JSON.parse(fs.readFileSync('./media/emojis/kitchen_names.json', 'utf8'));
                    var fileUse = await emojis[Math.floor(Math.random() * emojis.length)];
                    emoji1 = fileUse.split("_")[0];
                    emoji2 = fileUse.split("_")[1];
                } else {
                    emoji1 = await args[0].codePointAt(0).toString(16);
                    emoji2 = await args[1].codePointAt(0).toString(16) || args[0].codePointAt(0).toString(16);
                    emoji1 = "u" + emoji1;
                    emoji2 = "u" + emoji2;
                };

                var knownSupportedDates = [
                    "20201001",
                    "20210218",
                    "20210521",
                    "20210831",
                    "20211115",
                    "20220110",
                    "20220203",
                    "20220406",
                    "20220506",
                    "20220815",
                    "20220823",
                    "20221101",
                    "20221107",
                    "20230126",
                    "20230301",
                    "20230405",
                    "20230418",
                ];

                var rootUrl = "https://www.gstatic.com/android/keyboard/emojikitchen";

                for (var d = 0; d < knownSupportedDates.length; d++) {
                    var date = knownSupportedDates[d];

                    try {
                        await client.sendImageAsSticker(from, `${rootUrl}/${date}/${emoji2}/${emoji2}_${emoji1}.png`, mess[lang].stickerMetadataImg(true))
                        return;
                    } catch (e) {
                        try {
                            await client.sendImageAsSticker(from, `${rootUrl}/${date}/${emoji1}/${emoji1}_${emoji2}.png`, mess[lang].stickerMetadataImg(true))
                            return;
                        } catch (e2) {
                            if (d >= knownSupportedDates.length - 1) {
                                return client.reply(from, mess[lang].ek.dontCombine(), id);
                            } else {
                                continue;
                            };
                        };
                    };
                };
                break;

            case 'emoji':
            case 'emote':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length !== 1) return client.reply(from, mess[lang].wrongUse.defaultArgs(prefix + command, ['emoji']), id)
                if (body.slice(prefix.length + command.length + 1).length > 5) return client.reply(from, mess[lang].emoji.onlyOneEmoji(), id);
                var makeEmoji = true;
                var count = -1;
                var emoji = args[0];
                if (emoji.split("").length > 1) {
                    var modifiers = [
                        '\u{1f3fb}',
                        '\u{1f3fc}',
                        '\u{1f3fd}',
                        '\u{1f3fe}',
                        '\u{1f3ff}',
                    ];

                    for (let i = 0; i < modifiers.length; i++) {
                        emoji = emoji.replace(modifiers[i], '');
                    };
                };

                while (makeEmoji == true) {
                    var emojiType = ["apple", "facebook", "twitter", "messenger", "google"][Math.floor(Math.random() * 5 + 0)];
                    var PATH = `./media/emojis/${emojiType}/${emoji}.png`;

                    if (fs.existsSync(PATH)) {
                        makeEmoji = false;
                        await client.sendImageAsSticker(from, PATH, mess[lang].stickerMetadataImg(true));
                    } else {
                        if (count > 100) {
                            makeEmoji = false;
                            return client.reply(from, mess[lang].noEmojiFound(), id);
                        };
                        count++;
                    };
                };
                break

            case 'mgm':
            case 'makegirlsmoe':
            case 'moe':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var puppeteeroptions = { headless: true, executablePath: executablePath };

                var browser = await require('puppeteer').launch(puppeteeroptions);
                var page = await browser.newPage()

                await page.goto(`https://make.girls.moe`, {
                    waitUntil: 'domcontentloaded'
                });

                try {
                    await page.waitForSelector('.btn-primary:not([disabled])', { timeout: 15000 });
                } catch (e) {
                    await browser.close();
                    return client.reply(from, mess[lang].somethingWentWrong(), id);
                }


                await page.evaluate(async () => {
                    await document.querySelector('.btn-primary').click();
                });

                await page.waitForSelector('.btn-primary:not([disabled])');
                var imgMoe = await page.evaluate(() => {
                    return document.querySelector('img').src;
                });

                await browser.close();

                if (!imgMoe || imgMoe == '') return client.reply(from, mess[lang].somethingWentWrong(), id);

                await client.sendImagesSticker(from, imgMoe, mess[lang].stickerMetadataImg(true), id);
                break;

            // pip install rembg
            case 'lnobg':
            case 'stickernobg':
            case 'nobg':
            case 'nobackground':
            case 'nobgsticker':
            case 'nobgstk':
            case 'nobackgroundstk':
            case 'removebg':
            case 'stknobg':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isQuotedImage && message.type !== "image" && !isQuotedSticker) return client.reply(from, mess[lang].wrongUse.quotingImageOrAsBody(prefix + command), id);
                var filename = Math.random().toString(36).substring(7);

                var qtlnobg = isQuotedMsg ? quotedMsg : message;
                var mediaData = await decryptMedia(qtlnobg, uaOverride);
                var filetype = qtlnobg.mimetype.split('/')[1];

                createDir('./tmp');
                fs.writeFileSync(`./tmp/${filename}.${filetype}`, mediaData);

                var argsEx = "-ae 1";
                await exec(`rembg i ./tmp/${filename}.${filetype} ./tmp/${filename}.png ${argsEx}`, async function (err) {
                    if (err) { console.log(err); return client.reply(from, mess[lang].somethingWentWrong(), id); };

                    fs.unlinkSync(`./tmp/${filename}.${filetype}`);
                    await client.sendImageAsSticker(from, `./tmp/${filename}.png`, mess[lang].stickerMetadataImg(true));
                    fs.unlinkSync(`./tmp/${filename}.png`);
                });
                break;

            case 'ppt':
            case 'rps':
            case 'pedrapapeltesoura':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length !== 1) return client.reply(from, mess[lang].wrongUse.ppt(prefix + command), id)
                var ppt = ["pedra", "papel", "tesoura"];
                var pptposs = ["pedra", "piedra", "rock", "✊", "🤛", "🤜", "👊", "🪨", "tesoura", "tijeras", "tijera", "✌", "✂️", "papel", "paper", "scissors", "👋", "🖖", "🖐️", "🤚", "✋", "🧻"];
                var indexAleatorio = Math.floor(Math.random() * ppt.length)
                var escolhaUsuario = args[0].toLowerCase()
                var found = false;
                for (let i = 0; i < pptposs.length; i++) {
                    if (escolhaUsuario.includes(pptposs[i])) {
                        found = true;
                        switch (pptposs[i]) {
                            case 'pedra':
                            case '✊':
                            case '🤛':
                            case '🤜':
                            case '👊':
                            case '🪨':
                            case 'rock':
                            case 'piedra':
                                escolhaUsuario = "pedra";
                                break

                            case 'papel':
                            case '👋':
                            case '🖖':
                            case '🖐️':
                            case '🤚':
                            case '✋':
                            case '🧻':
                            case 'paper':
                                escolhaUsuario = "papel";
                                break

                            case 'tesoura':
                            case '✌':
                            case '✂️':
                            case 'scissors':
                            case 'tijeras':
                                escolhaUsuario = "tesoura";
                                break
                        }
                    }
                }

                if (found == false) {
                    return client.reply(from, mess[lang].ppt.selectValidOption(), id)
                }
                var escolhaBot = ppt[indexAleatorio]
                iconeEscolhaBot = null;
                if (escolhaBot == "pedra") {
                    iconeEscolhaBot = "✊"
                    if (escolhaUsuario == "pedra" || escolhaUsuario.includes("✊")) { var vitoriaUsuario = null }
                    if (escolhaUsuario == "tesoura" || escolhaUsuario.includes("✌️")) { var vitoriaUsuario = false }
                    if (escolhaUsuario == "papel" || escolhaUsuario.includes("✋")) { var vitoriaUsuario = true }
                } else if (escolhaBot == "papel") {
                    iconeEscolhaBot = "✋"
                    if (escolhaUsuario == "pedra" || escolhaUsuario.includes("✊")) { var vitoriaUsuario = false }
                    if (escolhaUsuario == "tesoura" || escolhaUsuario.includes("✌️")) { var vitoriaUsuario = true }
                    if (escolhaUsuario == "papel" || escolhaUsuario.includes("✋")) { var vitoriaUsuario = null }
                } else {
                    iconeEscolhaBot = "✌️"
                    if (escolhaUsuario == "pedra" || escolhaUsuario.includes("✊")) { var vitoriaUsuario = true }
                    if (escolhaUsuario == "tesoura" || escolhaUsuario.includes("✌️")) { var vitoriaUsuario = null }
                    if (escolhaUsuario == "papel" || escolhaUsuario.includes("✋")) { var vitoriaUsuario = false }
                }
                var textoResultado = ''
                if (escolhaUsuario == 'pedra' || escolhaUsuario.includes("✊")) { var iconeEscolhaUsuario = "✊" }
                if (escolhaUsuario == 'papel' || escolhaUsuario.includes("✋")) { var iconeEscolhaUsuario = "✋" }
                if (escolhaUsuario == 'tesoura' || escolhaUsuario.includes("✌")) { var iconeEscolhaUsuario = "✌" }
                if (vitoriaUsuario == true) {
                    textoResultado = mess[lang].ppt.win(iconeEscolhaUsuario, iconeEscolhaBot);
                } else if (vitoriaUsuario == false) {
                    textoResultado = mess[lang].ppt.lose(iconeEscolhaUsuario, iconeEscolhaBot);
                } else {
                    textoResultado = mess[lang].ppt.tie(iconeEscolhaUsuario, iconeEscolhaBot);
                }
                await client.reply(from, textoResultado, id)
                break

            case 'fofo':
            case 'fofa':
            case 'cute':
            case 'lindo':
            case 'linda':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                await client.reply(from, mess[lang].fofo.resp(Math.floor(Math.random() * 101)), id);
                break

            case 'reverse':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var msgInv = isQuotedMsg ? (quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : '') : body.slice(prefix.length + command.length + 1);
                if (msgInv.split('').length == 0) return client.reply(from, mess[lang].wrongUse.quotingMessageOrAtSide(prefix + command), id)
                if (msgInv.length > 5000) return client.reply(from, mess[lang].maxText(5000), id);
                var textoInv = msgInv.split('');
                textoInv = textoInv.filter(function (e) {
                    return e.charCodeAt(0) < 0xD800 || e.charCodeAt(0) > 0xDFFF;
                }).reverse().join('');
                client.reply(from, textoInv, id);
                break

            case 'presente':
            case 'gift':
            case 'presentedeaniversario':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                const rgift = fs.readFileSync(`./media/text/gift-${lang}.txt`).toString().split('\n')
                const rgidd = rgift[Math.floor(Math.random() * rgift.length)]
                await client.reply(from, mess[lang].gift.doYouWin(pushname, rgidd), id)
                break

            case 'ship':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                const casal1 = body.slice(prefix.length + command.length + 1).includes(' | ') ? body.slice(prefix.length + command.length + 1).split(' | ')[0] : body.slice(prefix.length + command.length + 1).split(' | ')[0];
                const casal2 = body.slice(prefix.length + command.length + 1).includes(' | ') ? body.slice(prefix.length + command.length + 1).split(' | ')[1] : body.slice(prefix.length + command.length + 1).split(' | ')[1];
                if (args.length <= 2 || casal2 == '') return client.reply(from, mess[lang].wrongUse.tagTwoPeople(prefix + command, "|"), id)
                if (args.length > 2) {
                    client.sendReplyWithMentions(from, mess[lang].ship.resp(casal1, casal2, Math.floor(Math.random() * 100)), id)
                };
                break

            case 'gender':
            case 'genero':
            case 'gênero':
            case 'sexo':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                try {
                    if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andName(prefix + command), id)
                    if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                    const seanl = await axios.get(`https://api.genderize.io/?name=${encodeURIComponent(args[0])}`)
                    const gender = seanl.data.gender.replace('female', mess[lang].gender.female()).replace('male', mess[lang].gender.male())
                    await client.reply(from, mess[lang].gender.resp(gender, seanl.data.name), id)
                } catch (err) {
                    client.reply(from, mess[lang].somethingWentWrong(), id)
                }
                break

            case 'morte':
            case 'death':
            case 'deathage':
            case 'anodemorte':
            case 'anomortal':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andName(prefix + command), id)
                const predea = await axios.get(`https://api.agify.io/?name=${args[0]}`)
                var deathAge = predea.data.age;
                if (deathAge == null || !deathAge || deathAge == undefined) { deathAge = 117 };
                await client.reply(from, mess[lang].death.resp(predea.data.name, deathAge), id);
                break

            case 'facegen':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                try {
                    await client.sendImageAsSticker(from, `https://thispersondoesnotexist.com`, mess[lang].stickerMetadataImg(true), id);
                } catch (err) {
                    client.reply(from, mess[lang].somethingWentWrong(), id);
                };
                break

            case 'pixelgen':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                try {
                    var seed;
                    if (args.length === 0) {
                        seed = Math.floor(Math.random() * (9999999999 - 1000000000));
                    } else {
                        seed = args.join('').replace(/\./gi, '');
                    };
                    if (args.join('').replace(/\./gi, '').length > 100) return client.reply(from, mess[lang].maxText(100), id);

                    await client.sendFileFromUrl(from, `https://avatars.dicebear.com/api/human/${encodeURIComponent(seed)}.svg`, 'pixelgen.svg', 'Seed: "' + seed + '"', id)
                } catch (err) {
                    client.reply(from, mess[lang].somethingWentWrong(), id)
                }
                break;

            case 'botgen':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                try {
                    var seed;
                    if (args.length === 0) {
                        seed = Math.floor(Math.random() * (9999999999 - 1000000000));
                    } else {
                        seed = args.join('').replace(/\./gi, '');
                    };
                    if (args.join('').replace(/\./gi, '').length > 100) return client.reply(from, mess[lang].maxText(100), id);

                    await client.sendFileFromUrl(from, `https://avatars.dicebear.com/api/bottts/${seed}.svg`, 'botgen.svg', 'Seed: "' + seed + '"', id)
                } catch (err) {
                    client.reply(from, mess[lang].somethingWentWrong(), id)
                }
                break

            case 'avatargen':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                try {
                    var seed;
                    if (args.length === 0) {
                        seed = Math.floor(Math.random() * (9999999999 - 1000000000));
                    } else {
                        seed = args.join('').replace(/\./gi, '');
                    };
                    if (args.join('').replace(/\./gi, '').length > 100) return client.reply(from, mess[lang].maxText(100), id);

                    await client.sendFileFromUrl(from, `https://avatars.dicebear.com/api/avataaars/${seed}.svg`, 'avatargen.svg', 'Seed: "' + seed + '"', id)
                } catch (err) {
                    client.reply(from, mess[lang].somethingWentWrong(), id)
                }
                break

            case 'avatargen2':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                try {
                    var seed;
                    if (args.length === 0) {
                        seed = Math.floor(Math.random() * (9999999999 - 1000000000));
                    } else {
                        seed = args.join('').replace(/\./gi, '');
                    };
                    if (args.join('').replace(/\./gi, '').length > 100) return client.reply(from, mess[lang].maxText(100), id);

                    await client.sendFileFromUrl(from, `https://avatars.dicebear.com/api/micah/${seed}.svg`, 'avatargen2.svg', 'Seed: "' + seed + '"', id)
                } catch (err) {
                    client.reply(from, mess[lang].somethingWentWrong(), id)
                }
                break

            case 'roll':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var dicev = body.slice(prefix.length + command.length + 1);
                if (args.length <= 0) return client.reply(from, mess[lang].wrongUse.roll(prefix + command), id);
                if (!dicev.includes('d')) return client.reply(from, mess[lang].wrongUse.roll(prefix + command), id);

                var vord = null;
                if (dicev.startsWith('d') || dicev.startsWith('v')) {
                    vord = Array.from(dicev)[0];
                    dicev = dicev.substring(1);
                };

                var dics = dicev.split("d");
                if (dics.length < 2) {
                    dics[1] = dics[0];
                    dics[0] = '1';
                    dicev = dics[0]+'d'+dics[1];
                };
                
                var dicsplus = dics[1].split("+");
                var dicsminus = dics[1].split("-");

                var proeficiency = 0;
                if (dicsplus.length > 0 || dicsminus.length > 0) {
                    for (let i = 1; i < dicsplus.length; i++) {
                        proeficiency += parseInt(dicsplus[i]);
                    }

                    for (let i = 1; i < dicsminus.length; i++) {
                        proeficiency -= parseInt(dicsminus[i]);
                    }
                };

                if (dicsplus.length > 0) {
                    dics[1] = dics[1].split("+")[0];
                } else if (dicsminus.length > 0) {
                    dics[1] = dics[1].split("-")[0];
                };

                if (proeficiency.length < 1) proeficiency = 0;
                if (dics.length > 3) return client.reply(from, mess[lang].wrongUse.roll(prefix + command), id);
                if (dics[0].includes('.') || dics[1].includes('.') || proeficiency.toString().includes('.')) return client.reply(from, mess[lang].roll.onlyNatural(), id);
                if (isNaN(dics[0])) return client.reply(from, mess[lang].wrongUse.roll(prefix + command), id);
                if (isNaN(dics[1])) return client.reply(from, mess[lang].wrongUse.roll(prefix + command), id);
                if (isNaN(proeficiency)) return client.reply(from, mess[lang].wrongUse.roll(prefix + command), id);
                if (proeficiency < -10000 || proeficiency > 10000) return client.reply(from, mess[lang].roll.minAndMaxProeficiency(10.000, -10.000), id);
                if (dics[0] < 1) return client.reply(from, mess[lang].roll.minDices(1), id);
                if (dics[1] < 1) return client.reply(from, mess[lang].roll.minFaces(1), id);
                if (dics[0] > 100) return client.reply(from, mess[lang].roll.maxDices(100), id);
                if (dics[1] > 100000) return client.reply(from, mess[lang].roll.maxFaces(100000), id);

                var dadosFinais = '[';
                var arrDados = [];
                var somaDosDados = 0;
                var biggerDice = { pos: -1, val: 0 };
                for (let i = 0; i < dics[0]; i++) {
                    let numeroFormatado = parseInt(dics[1]);
                    let numeroDado = `${(Math.floor(Math.random() * numeroFormatado + 1))}`;
                    arrDados.push(parseInt(numeroDado));
                    somaDosDados += parseInt(numeroDado);
                };
                var lowerDice = { pos: -1, val: somaDosDados };

                for (let i = 0; i < arrDados.length; i++) {
                    if (vord == 'v' && biggerDice.val < arrDados[i]) {
                        biggerDice = { pos: i, val: arrDados[i] };
                    };
                    if (vord == 'd' && lowerDice.val > arrDados[i]) {
                        lowerDice = { pos: i, val: arrDados[i] };
                    };
                };

                for (let i = 0; i < arrDados.length; i++) {
                    if ((vord == 'd' && lowerDice.pos == i) || (vord == 'v' && biggerDice.pos == i)) {
                        dadosFinais += ` *${arrDados[i]}* `;
                    } else {
                        dadosFinais += ` ${arrDados[i]} `;
                    };
                    ;
                };
                dadosFinais += ']';

                if (vord == 'v') {
                    var valuetogo = 0;
                    for (let i = 0; i < arrDados.length; i++) {
                        if (valuetogo < arrDados[i]) {
                            valuetogo = arrDados[i];
                        };
                    };
                    somaDosDados = valuetogo;
                } else if (vord == 'd') {
                    var valuetogo = somaDosDados;
                    for (let i = 0; i < arrDados.length; i++) {
                        if (valuetogo > arrDados[i]) {
                            valuetogo = arrDados[i];
                        };
                    };
                    somaDosDados = valuetogo;
                };

                somaDosDados += parseInt(proeficiency);

                if (dics[0] < 2) {
                    finalWord = `\`\`\`${dicev}\`\`\`\n*${somaDosDados}*`;
                } else {
                    finalWord = `\`\`\`${dicev}\`\`\`\n*${somaDosDados}* ← ${dadosFinais}`;
                };

                if (proeficiency == 0) {
                    finalWord += ``;
                } else if (proeficiency > 0) {
                    finalWord += ` (+${proeficiency})`;
                } else {
                    finalWord += ` (${proeficiency})`;
                }

                client.reply(from, finalWord, id);
                break;

            case 'pokedex':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length === 0) return client.reply(from, mess[lang].wrongUse.andPokemon(prefix + command), id)
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                try {
                    var pokeIn = body.slice(prefix.length + command.length + 1).toLowerCase();
                    var pk;

                    for (i in pokedexJson) {
                        if (pokeIn == pokedexJson[i].name) {
                            pk = pokedexJson[i];
                        };
                    };

                    var pokeImg = "./media/pokedex/pokemon/normal/" + pk.id + ".png";
                    var pokeStk = "./media/pokedex/3d/" + pk.id + ".png";

                    await client.sendFile(from, pokeImg, `${pk.id}.png`, await mess[lang].pokedex.resp(pk, translate), id)
                    client.sendImageAsSticker(from, pokeStk, mess[lang].stickerMetadataImg(true), id)
                } catch (err) {
                    client.reply(from, mess[lang].pokedex.dontExistPokemon(), id)
                }
                break;

            case 'stickertoimg':
            case 'stikertoimg':
            case 'stoimg':
            case 'toimg':
            case 'toimage':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (isQuotedSticker) {
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await client.sendImage(from, imageBase64, 'sticker.png', '', id)
                    } catch (err) {
                        console.error(err)
                        await client.reply(from, mess[lang].somethingWentWrong(), id)
                    }
                } else {
                    await client.reply(from, mess[lang].wrongUse.quotingSticker(prefix + command), id)
                }
                break;

            case 'toaudio':
            case 'tomp3':
                try {
                    client.simulateRecording(from, true);
                    client.sendSeen(from);
                    var dadosMensagem = quotedMsg ? quotedMsg : message;
                    if (dadosMensagem.mimetype != "video/mp4") return client.reply(from, mess[lang].wrongUse.quotingVideo(prefix + command), id)
                    if (dadosMensagem.duration > 3600) return client.reply(from, mess[lang].maxDuration(60, 'm', 'vid'), id);
                    var caminhoAudio = null, caminhoVideo = null
                    var mediaData = await decryptMedia(dadosMensagem, uaOverride);

                    createDir('./tmp');
                    var pathBase = './tmp/';

                    if (dadosMensagem.mimetype == "video/mp4") {
                        var tomp3filename = Math.floor(Math.random() * 1000000);
                        caminhoVideo = pathBase + tomp3filename + '.mp4';
                        fs.writeFileSync(caminhoVideo, mediaData, "base64")
                        try {
                            caminhoAudio = await conversao.converterMp4ParaMp3(caminhoVideo);
                            fs.unlinkSync(caminhoVideo);

                            client.sendFile(from, caminhoAudio, `${tomp3filename}.mp3`, ``, id).then(() => {
                                fs.unlinkSync(caminhoAudio);
                            });
                        } catch (err) {
                            fs.unlinkSync(caminhoVideo);
                            fs.unlinkSync(caminhoAudio);
                            console.log(err)
                            client.reply(from, mess[lang].somethingWentWrong(), id)
                        }
                    };
                } catch (err) {
                    console.log(err);
                    return client.reply(from, mess[lang].somethingWentWrong(), id);
                };
                break

            case 'tts':
            case 'texttospeech':
            case 'fala':
            case 'speak':
            case 'falar':
            case 'gtts':
                client.simulateRecording(from, true);
                client.sendSeen(from);
                if (args.length < 1) return client.reply(from, mess[lang].tts.wrongUse(prefix + command), id);
                var arrVer = ["af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "ny", "zh-cn", "zh-tw", "co", "hr", "cs", "da", "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw", "iw", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko", "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ps", "fa", "pl", "pt", "ma", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "te", "th", "tr", "uk", "ur", "ug", "uz", "vi", "cy", "xh", "yi", "yo", "zu"];
                var arrCL = (arrVer.indexOf(args[0].toLowerCase()) > -1);
                if (arrCL == false) return client.reply(from, mess[lang].tts.unknownLang(), id);
                createDir('./tmp');
                var tts_PATH = "./tmp/" + Math.random().toString(36).substring(7) + ".mp3";
                if (isQuotedMsg) {
                    const quoteTextTts = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : '';
                    if (quoteTextTts.split('').length > 5000) return client.reply(from, mess[lang].maxText(5000), id);
                    var gtts = require('better-node-gtts');
                    const dataText = quoteTextTts;
                    if (dataText === '') return client.reply(from, mess[lang].tts.wrongUse(prefix + command), id);
                    try {
                        new gtts.Text2Speech(args[0]).save(tts_PATH, dataText).then(async () => {
                            await client.sendPtt(from, tts_PATH, id);
                            fs.unlinkSync(tts_PATH);
                        });
                    } catch (e) {
                        client.reply(from, mess[lang].somethingWentWrong(), id);
                        console.log(e);
                    }
                } else {
                    if (args.length == 1) return client.reply(from, mess[lang].tts.wrongUse(prefix + command), id);
                    if (body.split('').length > 5000) return client.reply(from, mess[lang].maxText(5000), id);
                    var gtts = require('better-node-gtts');
                    const dataText = body.slice(prefix.length + command.length + args[0].length + 2);
                    if (dataText === '') return client.reply(from, mess[lang].tts.wrongUse(prefix + command), id);
                    try {
                        new gtts.Text2Speech(args[0]).save(tts_PATH, dataText).then(async () => {
                            await client.sendPtt(from, tts_PATH, id);
                            fs.unlinkSync(tts_PATH);
                        });
                    } catch (e) {
                        client.reply(from, mess[lang].somethingWentWrong(), id);
                        console.log(e);
                    }
                }
                break

            case 'audio':
            case 'áudio':
                try {
                    var msgMedia = isQuotedMsg ? quotedMsg : message;
                    client.simulateRecording(from, true);
                    client.sendSeen(from);
                    if (msgMedia.duration > 600) return client.reply(from, mess[lang].maxDuration(10, 'm', 'aud'), id);
                    var rName = Math.floor(Math.random() * (99999999 + 11111111));
                    const randomNameAudio = `${rName}.mp3`;
                    if (args.length === 0) return client.reply(from, mess[lang].wrongUse.andAudioAndEffect(prefix + command), id)
                    var efeitosSuportados = [
                        'explode', 'burst', 'explodir', 'estourar', '2x', 'x2', 'reverse', 'reverso', 'bass', 'grave', 'acute', 'agudo', 'volume', 'nightcore', 'lo-fi', 'lofi', 'banheiro', 'bathroom', 'toilet', 'baño', 'slow', 'reverb'
                    ], tipoEfeito = body.slice(prefix.length + command.length + 1).trim()
                    createDir('./tmp');
                    var pathAudios = './tmp/';
                    if (!efeitosSuportados.includes(tipoEfeito)) return client.reply(from, mess[lang].invalidOptions(['explode', '2x', 'reverse', 'bass', 'acute', 'volume', 'nightcore', 'lofi', 'bathroom', 'slow', 'reverb']), id)
                    if (msgMedia.type === "ptt" || msgMedia.type === "audio") {
                        var mediaData = await decryptMedia(msgMedia, uaOverride)
                        var audioOriginal = pathAudios + randomNameAudio;
                        fs.writeFileSync(audioOriginal, mediaData, "base64")
                        try {
                            var audioEditado = await api.obterAudioModificado(pathAudios + randomNameAudio, tipoEfeito)
                                .catch(() => {
                                    return client.reply(from, mess[lang].somethingWentWrong(), id);
                                })
                            client.sendFile(from, audioEditado, "audio.mp3", "", id).then(() => {
                                fs.unlinkSync(audioEditado);
                                fs.unlinkSync(audioOriginal);
                            })
                        } catch (err) {
                            fs.unlinkSync(audioOriginal)
                            fs.unlinkSync(audioEditado);

                            return client.reply(from, mess[lang].somethingWentWrong(), id)
                        }
                    } else {
                        client.reply(from, mess[lang].wrongUse.andAudioAndEffect(prefix + command), id);
                    }
                } catch (err) {
                    return client.reply(from, mess[lang].somethingWentWrong(), id)
                };
                break

            // Other Command
            case 'play':
            case 'p':
                client.simulateRecording(from, true);
                client.sendSeen(from);
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id)
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.addMusicName(prefix + command), id);
                var textoPlay = body.slice(prefix.length + command.length + 1);
                const searchOptions = {
                    query: textoPlay,
                    pageStart: 1,
                    pageEnd: 3,
                };
                let { videos } = await yts(searchOptions);
                if (videos.length === 0) {
                    return client.reply(from, mess[lang].play.noVideoFound(), id);
                }
                let { videoId, title, duration } = videos[0];
                var musicmMs = duration.seconds * 1000;
                var playTimerMs = ms(musicmMs);
                var formatedTimeP = (
                    (playTimerMs.hours && playTimerMs.hours > 0 ? (
                        playTimerMs.hours < 10 ?
                            "0" + playTimerMs.hours.toString() + ":" :
                            playTimerMs.hours + ":") : '')
                    +
                    (
                        playTimerMs.minutes < 10 ?
                            "0" + playTimerMs.minutes.toString() + ":" :
                            playTimerMs.minutes + ":")
                    +
                    (
                        playTimerMs.seconds < 10 ?
                            "0" + playTimerMs.seconds.toString() :
                            playTimerMs.seconds)
                );

                if (duration.seconds >= 2760) {
                    return client.reply(from, mess[lang].maxDuration('45', 'm', 'vid', title, formatedTimeP), id);
                }
                client.reply(from, mess[lang].play.resp(title, formatedTimeP), id);

                if (config.save_musics) {
                    createDir('./media/musics');
                } else {
                    createDir('./tmp');
                };
                var pathPlay = `./${config.save_musics ? 'media/musics/' : 'tmp/'}${videoId}`;
                fs.stat(`${pathPlay}.mp3`, async function (err) {
                    if (err == null) {
                        client.sendFile(from, `${pathPlay}.mp3`, `${videoId}.mp3`, '', id);
                    } else {
                        await downloaderYt.download(videoId, `${videoId}.mp3`);

                        client.sendFile(from, `${pathPlay}.mp3`, `${videoId}.mp3`, '', id);

                        if (!config.save_musics) {
                            fs.unlinkSync(`${pathPlay}.mp3`);
                        };
                    };
                });
                break;

            case 'vídeo':
            case 'video':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andVideoName(prefix + command), id)
                try {
                    const searchOptions = {
                        query: body.slice(prefix.length + command.length + 1),
                        pageStart: 1,
                        pageEnd: 3,
                    };
                    let { videos } = await yts(searchOptions);
                    let { videoId, title, duration } = videos[0];
                    var musicmMs = duration.seconds * 1000;
                    var playTimerMs = ms(musicmMs);
                    var formatedTimeP = (
                        (playTimerMs.hours && playTimerMs.hours > 0 ? (
                            playTimerMs.hours < 10 ?
                                "0" + playTimerMs.hours.toString() + ":" :
                                playTimerMs.hours + ":") : '')
                        +
                        (
                            playTimerMs.minutes < 10 ?
                                "0" + playTimerMs.minutes.toString() + ":" :
                                playTimerMs.minutes + ":")
                        +
                        (
                            playTimerMs.seconds < 10 ?
                                "0" + playTimerMs.seconds.toString() :
                                playTimerMs.seconds)
                    );

                    if (duration.seconds >= 660) {
                        return client.reply(from, mess[lang].maxDuration('10', 'm', 'vid', title, formatedTimeP), id);
                    };
                    client.reply(from, mess[lang].video.resp(title, formatedTimeP), id);

                    var stream = await ytdl("https://www.youtube.com/watch?v=" + videoId, {
                        quality: '18'
                    });

                    createDir('./tmp');
                    var pathBase = './tmp/'

                    var file = fs.createWriteStream(pathBase + videoId + '.mp4');
                    stream.pipe(file);
                    file.on('finish', async () => {
                        await client.sendFile(from, pathBase + videoId + '.mp4', `${videoId}.mp4`, '', id);
                        fs.unlinkSync(`${pathBase}${videoId}.mp4`);
                    });
                } catch (err) {
                    console.log(err);
                    client.reply(from, mess[lang].somethingWentWrong(), id);
                };
                break

            case 'ima':
            case 'img':
            case 'image':
            case 'imagem':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var query = body.slice(prefix.length + command.length + 1);
                if (!query || args.length < 1 || !args) return client.reply(from, mess[lang].wrongUse.andSearch(prefix + command), id);
                if (query.length > 100) return client.reply(from, mess[lang].maxText(100), id);
                try {
                    var imageF = await imageFromGoogle.get(query, {
                        headless: true,
                        executablePath: executablePath
                    });
                    if (imageF.includes("No results found")) return client.reply(from, mess[lang].messages.noResults(), id);
                    await client.sendFile(from, imageF, 'img.png', '', id);
                } catch (e) {
                    client.reply(from, mess[lang].messages.noResults(), id);
                };
                break

            case 'upimg':
            case 'upimage':
            case 'upimagem':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if ((isMedia && type === 'image') || isQuotedImage || isQuotedSticker) {
                    const upimgoh = isQuotedMsg ? quotedMsg : message
                    const mediaData = await decryptMedia(upimgoh, uaOverride)
                    createDir('./tmp');
                    var uplimg = './tmp/' + Math.random().toString(26).substring(7) + '.jpg'
                    await fs.writeFile(uplimg, mediaData)
                    let options = {
                        apiKey: config.api_keys.imgbb,
                        imagePath: uplimg,
                        expiration: 604800
                    }
                    const sdimg = await imgbbUploader(options)
                    await client.reply(from, mess[lang].upimg.success(sdimg.url), id);
                    fs.unlinkSync(uplimg);
                } else {
                    await client.reply(from, mess[lang].wrongUse.quotingImage(prefix + command), id)
                }
                break

            case 'sorteio':
            case 'giveaway':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return client.reply(from, mess[lang].onlyAdmins(), id)
                let timeS = args[0];
                if (!timeS) return client.reply(from, mess[lang].giveaway.wrongUse(prefix + command), id);

                if (
                    (!timeS.endsWith('d') &&
                        !timeS.endsWith('h') &&
                        !timeS.endsWith('m') &&
                        !timeS.endsWith('s')) ||
                    (isNaN(timeS.replace(/.$/, '')) || timeS.replace(/.$/, '') == '' || timeS.replace(/.$/, '') == ' ')
                ) return client.reply(from, mess[lang].giveaway.invalidTime(), id);
                let prize = body.slice(prefix.length + command.length + 1 + args[0].length + 1);

                if (!prize) return client.reply(from, mess[lang].giveaway.wrongUse(prefix + command), id);

                client.reply(from, mess[lang].giveaway.resp(timeS, prize, prefix), id);
                db.set(`sorteioRolando.${from}`, 1);

                setTimeout(async () => {
                    var difarr = [];

                    var groupMemm = await client.getGroupMembers(groupId);

                    for (let i = 0; i < groupMemm.length; i++) {
                        difarr.push(groupMemm[i]);
                    }

                    var mes = [];

                    for (let i = 0; i < difarr.length; i++) {
                        var participantesB = db.get(`participantesSorteio.${from}.${difarr[i].id}`) || 0;

                        if (participantesB == 0 || participantesB == null) { } else {
                            mes.push({
                                id: difarr[i].id,
                                pushname: difarr[i].pushname
                            });
                            db.set(`participantesSorteio.${from}.${difarr[i].id}`, 0);
                        }
                        db.set(`participantesSorteio.${from}.${difarr[i].id}`, 0);
                    }

                    if (mes.length < 2) {
                        db.set(`sorteioRolando.${from}`, 0);
                        return client.reply(from, mess[lang].giveaway.noParticipants(), id);
                    }
                    let winN = Math.floor(Math.random() * mes.length);
                    let winner = mes[winN];
                    await client.sendReplyWithMentions(from, mess[lang].giveaway.winner(winner), id);
                    db.set(`sorteioRolando.${from}`, 0);
                }, time(timeS))
                break

            case 'participar':
            case 'participate':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                var sorteioRolando = await db.get(`sorteioRolando.${from}`);
                console.log(sorteioRolando);
                if (sorteioRolando == 0 || sorteioRolando == undefined) return client.reply(from, mess[lang].giveaway.noGiveaway(), id);
                var parts = await db.get(`participantesSorteio.${from}.${user}`);
                if (parts) return client.reply(from, mess[lang].giveaway.alreadyOnGiveaway(), id);
                db.add(`participantesSorteio.${from}.${user}`, 1)
                await client.reply(from, mess[lang].giveaway.joinedList(), id);
                break

            case 'musicidentify':
            case 'mi':
            case 'im':
            case 'identifymusic':
            case 'identificarmusica':
            case 'musicaidentificar':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                const randomNameAudioMi = `${Math.floor(Math.random() * 10000)}.mp3`;
                const randomNameVideoMi = `${Math.floor(Math.random() * 10000)}.mp4`;
                var dadosMensagem = quotedMsg ? quotedMsg : message;
                if (dadosMensagem.mimetype != "video/mp4" && dadosMensagem.type != "audio" && dadosMensagem.type != "ptt") return client.reply(from, mess[lang].wrongUse.quotingAudioOrVideo(prefix + command), id);
                if (dadosMensagem.duration > 120) return client.reply(from, mess[lang].maxDuration('2', 'm', 'vid'), id);
                var mediaData = await decryptMedia(dadosMensagem, uaOverride);

                var caminhoAudio, caminhoVideo;
                createDir('./tmp');
                var pathBase = './tmp/';

                if (dadosMensagem.mimetype == "video/mp4") {
                    caminhoVideo = pathBase + randomNameVideoMi;
                    fs.writeFileSync(caminhoVideo, mediaData, "base64");
                    try {
                        caminhoAudio = await conversao.converterMp4ParaMp3(caminhoVideo);
                        fs.unlinkSync(caminhoVideo);
                    } catch (err) {
                        fs.unlinkSync(caminhoVideo);
                        client.reply(from, mess[lang].somethingWentWrongConversion(), id);
                    };
                };
                if (dadosMensagem.type == "audio" || dadosMensagem.type == "ptt") {
                    caminhoAudio = pathBase + randomNameAudioMi;
                    fs.writeFileSync(caminhoAudio, mediaData, "base64");
                };
                try {
                    var resp = await api.obterReconhecimentoMusica(caminhoAudio);
                    await client.reply(from, mess[lang].mi.resp(resp), id);
                    fs.unlinkSync(caminhoAudio);
                } catch (err) {
                    console.log(err);
                    client.reply(from, mess[lang].mi.cantIdentify(), id);
                    fs.unlinkSync(caminhoAudio);
                };
                break;

            case 'cotação':
            case 'cotacao':
            case 'cot':
            case 'cotaçao':
            case 'currency':
            case 'cambio':
            case 'exchange':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var coinsArr = await mess[lang].cot.coins;

                var coinstg = [];
                let _i = 0;
                while (_i < coinsArr.coins.length) {
                    var _temp = await axios.get(`https://economia.awesomeapi.com.br/all/${coinsArr.coins[_i].coin}`);
                    var _tempCode = coinsArr.coins[_i].coin.split('-')[0];
                    if (coinsArr.coins[_i].name == 'Bitcoin') {
                        coinstg.push(`${coinsArr.coins[_i].emoji} - *${coinsArr.coins[_i].name}/${coinsArr.default_coin} (${_temp.data[_tempCode].codein}):*\n${_temp.data[_tempCode].bid}`);
                    } else {
                        coinstg.push(`${coinsArr.coins[_i].emoji} - *${coinsArr.default_coin}/${coinsArr.coins[_i].name} (${_temp.data[_tempCode].codein}):*\n${_temp.data[_tempCode].bid}`);
                    };
                    if (_i >= coinsArr.coins.length - 1) {
                        await client.reply(from, mess[lang].cot.resp(coinstg), id)
                    };
                    _i++;
                };
                break;

            case 'comment':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].comment.wrongUse(prefix + command), id)
                if (args.length < 2) return client.reply(from, mess[lang].comment.wrongUse(prefix + command), id)
                if (!body.slice('9').includes('|')) return client.reply(from, mess[lang].comment.wrongUse(prefix + command), id)
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                if (isMedia && type === 'image' || isQuotedSticker || isQuotedImage && args.length >= 2) {
                    const top = arg.split('|')[0] || ' ';
                    const bottom = arg.split('|')[1] || ' '
                    const encryptMedia = isQuotedMsg ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    await canvas.Canvas.youtube({
                        username: top,
                        avatar: mediaData,
                        content: bottom,
                        dark: true
                    })
                        .then(async (c) => {
                            var base64b = new Buffer.from(c).toString("base64");
                            var b64b = "data:image/png;base64," + base64b;
                            await client.sendFile(from, b64b, 'image.png', '', id);
                        });
                } else {
                    await client.reply(from, mess[lang].wrongUse.twoWords(prefix + command), id)
                }
                break
                
            case 'trigger':
            case 'triggered':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (isMedia && type === 'image' || isQuotedImage || isQuotedSticker) {
                    createDir('./tmp');
                    var path = "./tmp/" + Math.random().toString(36).substring(7);
                    try {
                        const triggermd = isQuotedMsg ? quotedMsg : message
                        const upTrigger = await decryptMedia(triggermd, uaOverride);
                        await canvas.Canvas.trigger(upTrigger)
                            .then(async (vv) => {
                                await canvas.write(vv, path + ".gif");

                                await ffmpeg(path + ".gif")
                                    .toFormat('mp4')
                                    .save(path + ".mp4")
                                    .on('end', async function () {
                                        await client.sendMp4AsSticker(from, path + ".mp4", {}, mess[lang].stickerMetadataVideo(30, '00:00:01.0', true, false), id);
                                        fs.unlinkSync(path + ".gif");
                                        fs.unlinkSync(path + ".mp4");
                                    })
                            })
                            .catch(async () => { await client.reply(from, mess[lang].somethingWentWrong(), id) });
                    } catch (err) {
                        client.reply(from, mess[lang].somethingWentWrong(), id)
                    }
                } else {
                    return await client.reply(from, mess[lang].wrongUse.quotingImage(prefix + command), id)
                }
                break

            case 'gsbl':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isQuotedImage && !(isMedia && type == 'image') && !isQuotedSticker) return client.reply(from, mess[lang].wrongUse.quotingImage(prefix + command), id);
                try {
                    var qtl = isQuotedMsg ? quotedMsg : message;
                    var mediaData = await decryptMedia(qtl, uaOverride);

                    createDir('./tmp');
                    var path = "./tmp/" + Math.random().toString(36).substring(7);
                    var filetype = qtl.mimetype.split('/')[1];

                    fs.writeFileSync(path + "." + filetype, mediaData, 'base64');
                    await exec("gsbl " + path + "." + filetype + " " + path + ".mp4 -r 500 500 -s 0.7 --line-bg-color 0 0 0", async function (error) {
                        if (error) { console.log(error); return client.reply(from, mess[lang].somethingWentWrong(), id); };
                        await client.sendFile(from, path + ".mp4", 'gsbl.mp4', 'Get Stick Bugged Lol!', id);
                        fs.unlinkSync(path + ".mp4");
                        fs.unlinkSync(path + "." + filetype);
                    })
                } catch (e) {
                    client.reply(from, mess[lang].somethingWentWrong(), id);
                };
                break

            case 'meme':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].meme.wrongUse(prefix + command), id)
                var arb = body.slice(prefix.length + command.length + 1);
                if (!arb.includes('|')) return client.reply(from, mess[lang].meme.wrongUse(prefix + command), id)
                if (arb.length > 100) return client.reply(from, mess[lang].maxText(100), id);

                if ((isMedia && type === 'image') || isQuotedImage && args.length >= 2) {
                    var top, bottom;
                    if (arb.includes(' | ')) {
                        top = arb.split(' | ')[0];
                        bottom = arb.split(' | ')[1];
                    } else {
                        top = arb.split('|')[0];
                        bottom = arb.split('|')[1];
                    };
                    top == "" ? top = "_" : top = top;
                    bottom == "" ? bottom = "_" : bottom = bottom;
                    var encryptMedia = isQuotedMsg ? quotedMsg : message
                    var mediaData = await decryptMedia(encryptMedia, uaOverride)
                    var imageUrl = await uploadImages(mediaData, false)

                    var topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s');
                    var bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s');
                    fetchBase64(`https://api.memegen.link/images/custom/${encodeURIComponent(topText)}/${encodeURIComponent(bottomText)}.png?background=${imageUrl}`, 'image/png')
                        .then(async (result) => await client.sendFile(from, result, 'image.png', '', id).catch((err) => console.error(err)));
                } else {
                    await client.reply(from, mess[lang].meme.wrongUse(prefix + command), id)
                }
                break

            case 'translate':
            case 'traduzir':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var arrVer = ["af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "ny", "zh-cn", "zh-tw", "co", "hr", "cs", "da", "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw", "iw", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko", "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ps", "fa", "pl", "pt", "ma", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "te", "th", "tr", "uk", "ur", "ug", "uz", "vi", "cy", "xh", "yi", "yo", "zu"];
                var arrCL = (arrVer.indexOf(args[0].toLowerCase()) > -1);
                if (arrCL == false) return client.reply(from, mess[lang].tts.unknownLang(), id);
                if (isQuotedMsg) {
                    if (args.length !== 1) return client.reply(from, mess[lang].tts.wrongUse(prefix + command), id)
                    const entradaTranslate = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    if (entradaTranslate.length > 5000) return client.reply(from, mess[lang].maxText(5000), id);
                    const saidaTranslate = await translate(entradaTranslate, args[0].toLowerCase())
                    client.reply(from, saidaTranslate, id)
                } else {
                    if (args.length < 2) return client.reply(from, mess[lang].tts.wrongUse(prefix + command), id)
                    const entradaTranslate = body.slice(prefix.length + command.length + 1 + 2 + 1);
                    if (entradaTranslate.length > 5000) return client.reply(from, mess[lang].maxText(5000), id);
                    const saidaTranslate = await translate(entradaTranslate, args[0].toLowerCase());
                    client.reply(from, saidaTranslate, id);
                }
                break;

            case 'ip':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                try {
                    if (args.length !== 1) return client.reply(from, mess[lang].wrongUse.addLink(prefix + command), id);
                    if (body.slice(prefix.length + command.length + 1).length > 1000) return client.reply(from, mess[lang].maxText(1000), id);
                    const ip = await axios.get(`http://ipwhois.app/json/${args[0].replace('https://', '').replace('http://', '')}`);
                    if (ip.data.ip == undefined) return client.reply(from, mess[lang].ip.notfound(), id);
                    await client.reply(from, mess[lang].ip.resp(ip), id);
                } catch (err) {
                    client.reply(from, mess[lang].somethingWentWrong(), id);
                }
                break

            case 'lyric':
            case 'lyrics':
            case 'lirik':
            case 'liriks':
            case 'letra':
            case 'letras':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.addMusicName(prefix + command), id);
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                try {
                    const options = {
                        apiKey: config.api_keys.genius_lyrics,
                        title: body.slice(prefix.length + command.length + 1),
                        artist: "??",
                        optimizeQuery: true
                    };

                    getLyrics(options)
                        .then((lyrics) => {
                            client.reply(from, lyrics, id);
                        });
                } catch (e) {
                    console.log(e);
                    await client.reply(from, mess[lang].lyrics.noLyrics(), id)
                }
                break

            case 'lingua':
            case 'língua':
            case 'idioma':
            case 'lang':
            case 'setlang':
            case 'language':
            case 'setlanguage':
            case 'definiridioma':
            case 'deflang':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length < 1) return client.reply(from, mess[lang].wrongUse.setlang(prefix + command), id);
                var lang_entry = args[0].toLowerCase();
                if (lang_entry.includes('_')) {
                    lang_entry = lang_entry.split('_');
                    lang_entry[1] = lang_entry[1].toUpperCase();
                    lang_entry = lang_entry.join('_');
                };
                if (lang_entry != 'pt_BR' && lang_entry != 'en_US' && lang_entry != 'es_ES') return client.reply(from, mess[lang].setlang.unsuported(), id);
                if (lang_entry == lang) return client.reply(from, mess[lang].setlang.alreadyDefined(lang), id);
                var usr_lang = db.get('usr_lang');
                var usrIsLang = false;
                var old_lang = lang;
                for (let i = 0; i < usr_lang.length; i++) {
                    if (usr_lang[i].id == sender.id.replace(/@c.us/gi, '')) {
                        usrIsLang = true;
                        lang = lang_entry;
                        usr_lang[i] = { id: sender.id.replace(/@c.us/gi, ''), lang: lang_entry };
                        db.set('usr_lang', usr_lang);
                    };
                };
                if (usrIsLang == false) {
                    lang = lang_entry;
                    usr_lang.push({ id: sender.id.replace(/@c.us/gi, ''), lang: lang_entry });
                    db.set('usr_lang', usr_lang);
                };
                client.reply(from, mess[lang].setlang.resp(old_lang, lang), id);
                break;

            case 'dice':
            case 'dado':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                const dice = Math.floor(Math.random() * 6) + 1;
                client.sendImageAsSticker(from, './media/dice/' + dice + '.png', mess[lang].stickerMetadataImg(true));
                break

            case 'write':
            case 'deathnote':
            case 'dn':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andText(prefix + command), id)
                imgEditor.createWrite(body.slice(prefix.length + command.length + 1), client, message, { mess, lang });
                break

            case 'printwpp':
                if (!isowner) return
                client.simulateTyping(from, true);
                client.sendSeen(from);
                const sesPic = await client.getSnapshot()
                client.sendFile(from, sesPic, 'session.png', ' ', id)
                break

            // Group Commands (group admin only)
            case 'groupinfo':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id);
                if (!isGroupAdmins) return client.reply(from, mess[lang].onlyAdmins(), id);
                //var errorurl = "https://i.redd.it/dtljzwihuh861.jpg";
                var totalMem = chat.groupMetadata.participants.length || 0;
                var desc = chat.groupMetadata.desc || mess[lang].messages.noDesc();
                var groupname = name || formattedTitle || mess[lang].messages.noName();
                var welgrp = db.get('welcome').includes(groupId) ? mess[lang].messages.enabled() : mess[lang].messages.disabled();
                var xpgp = db.get('gamexp').includes(groupId) ? mess[lang].messages.enabled() : mess[lang].messages.disabled();
                var lzex = db.get('antilink').includes(groupId) ? mess[lang].messages.enabled() : mess[lang].messages.disabled();
                var autostk = db.get('autosticker').includes(oqid) ? mess[lang].messages.enabled() : mess[lang].messages.disabled();
                var grouppic, pfp;
                try {
                    grouppic = await client.getProfilePicFromServer(groupId) || undefined;
                } catch (err) {
                    grouppic = undefined;
                }
                if (grouppic == undefined || !grouppic || grouppic == null) {
                    pfp = false;
                } else {
                    pfp = grouppic;
                };
                var textF = mess[lang].groupinfo.info({ groupname, totalMem, welgrp, lzex, xpgp, autostk, prefix, desc });
                if (pfp == false || pfp.includes('ERROR: 404')) {
                    client.sendFile(from, './media/welcome/pfo.jpg', 'pfo.jpg', textF, id)
                        .catch(() => {
                            client.reply(from, mess[lang].somethingWentWrong(), id);
                        });
                } else {
                    await client.sendFileFromUrl(from, pfp, 'group.png', textF, id);
                };
                break

            case 'kick':
            case 'ban':
            case 'banir':
            case 'remove':
            case 'remover':
            case 'expulsar':
            case 'chutar':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return client.reply(from, mess[lang].onlyAdmins(), id)
                if (!isBotGroupAdmins) return client.reply(from, mess[lang].botIsntAdmin(), id)
                for (let i = 0; i < owners.length; i++) {
                    if (owners[i] + "@c.us" == mentionedJidList[0]) {
                        return client.reply(from, mess[lang].kick.cantBanOwner(), id);
                    };
                };

                async function checkAlreadyOnGroup(id) {
                    let values = await client.getGroupMembers(groupId);
                    yes = false;
                    for (let i = 0; i < values.length; i++) {
                        if (values[i].id == id) {
                            yes = true;
                        };
                    };
                    return yes;
                };

                if (quotedMsg) {
                    var userAserBan = quotedMsgObj.sender.id;
                    a = await checkAlreadyOnGroup(userAserBan);
                    if (!a) return await client.reply(from, mess[lang].kick.userIsntOnGroup(), id);
                    if (groupAdmins.includes(userAserBan)) return await client.reply(from, mess[lang].kick.cantBanAdmin(), id);

                    await client.sendReplyWithMentions(from, mess[lang].kick.areYouBanned('@' + userAserBan), id);
                    await client.removeParticipant(groupId, userAserBan);
                } else {
                    a = await checkAlreadyOnGroup(mentionedJidList[0]);
                    if (mentionedJidList[0] === botNumber) return await client.reply(from, mess[lang].kick.youCantKickMe(), id)
                    if (mentionedJidList.length === 0) return client.reply(from, mess[lang].wrongUse.quotingMessageOrTagSomeone(prefix + command), id)

                    if (!a) return client.reply(from, mess[lang].kick.userIsntOnGroup(), id);
                    if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, mess[lang].kick.cantBanAdmin(), id);

                    await client.sendReplyWithMentions(from, mess[lang].kick.areYouBanned('@' + mentionedJidList[0]), id)
                    await client.removeParticipant(groupId, mentionedJidList[0]);

                };
                break;

            case 'add':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length === 0) return client.reply(from, mess[lang].wrongUse.useNumber(prefix + command), id);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id);
                if (!isGroupAdmins) return client.reply(from, mess[lang].onlyAdmins(), id);
                if (!isBotGroupAdmins) return client.reply(from, mess[lang].botIsntAdmin(), id);
                const orang = body.slice(prefix.length + command.length + 1).replace(/\+/gi, "").replace(/ /gi, "").replace(/ /gi, "").replace(/\-/gi, "").replace(/\(/gi, "").replace(/\)/gi, "");
                await client.addParticipant(from, `${orang}@c.us`)
                    .then((res) => {
                        if (res.error === 'participant-already-in-group') return client.reply(from, mess[lang].add.alreadyOnGroup(), id);
                        if (res.error === 'participant-already-invited') return client.reply(from, mess[lang].add.alreadyInvited(), id);
                        if (res.error === 'participant-already-in-group-pending-invite') return client.reply(from, mess[lang].add.alreadyInvited(), id);

                        client.sendTextWithMentions(from, mess[lang].add.successfullyAdded(orang));
                    })
                    .catch(async (e) => {
                        if (e.data !== undefined) {
                            status_code = e.data[orang + "@c.us"];
                            if (status_code == 409) return client.reply(from, mess[lang].add.alreadyOnGroup(), id);
                            if (status_code == 403) {
                                group_link = await client.getGroupInviteLink(from);
                                client.reply(from, mess[lang].add.noPermissions(), id);
                                client.sendText(orang + "@c.us", `${group_link}`);
                                return;
                            }
                        } else {
                            error_status = e.toString().split(" ")[1];
                            if (error_status == "NOT_A_CONTACT") return client.reply(from, mess[lang].add.invalidNumber(), id);
                        };
                    });
                break;

            case 'gp':
            case 'grupolink':
            case 'grouplink':
            case 'linkdogrupo':
            case 'linkgrupo':
            case 'linkgroup':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return client.reply(from, mess[lang].onlyAdmins(), id)
                if (!isBotGroupAdmins) return client.reply(from, mess[lang].botIsntAdmin(), id)
                if (isGroupMsg) {
                    const inviteLink = await client.getGroupInviteLink(groupId);
                    client.reply(from, inviteLink, id);
                } else {
                    client.reply(from, mess[lang].onlyGroups(), id)
                }
                break

            case 'revoke':
            case 'revogar':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return client.reply(from, mess[lang].onlyAdmins(), id)
                if (!isBotGroupAdmins) return client.reply(from, mess[lang].botIsntAdmin(), id)
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                client.revokeGroupInviteLink(groupId)
                client.reply(from, mess[lang].revoke.resp())
                break

            case 'flip':
            case 'coin':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var coinside = ["real1.png", "real2.png", "euro1.png", "euro2.png"]
                var flipcoin = Math.floor(Math.random() * coinside.length)
                client.sendImageAsSticker(from, './media/coin/' + coinside[flipcoin], mess[lang].stickerMetadataImg(true))
                break

            case 'bata':
            case 'bater':
            case 'tapa':
            case 'slap':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (mentionedJidList.length == 0 || mentionedJidList.length > 1) return client.reply(from, mess[lang].wrongUse.tagSomeone(prefix + command), id);
                const argo = body.trim().split(' ')
                const person = author.replace('@c.us', '')
                if (mentionedJidList[0] == sender.id) {
                    await client.sendMp4AsSticker(from, './media/fun/slap2.mp4', { fps: 10 }, mess[lang].stickerMetadataImg(true), id);
                    await client.sendReplyWithMentions(from, mess[lang].slap.self(person), id);
                    return;
                }
                await client.sendMp4AsSticker(from, './media/fun/slap.mp4', { fps: 10 }, mess[lang].stickerMetadataImg(true), id)
                await client.sendReplyWithMentions(from, mess[lang].slap.resp(person, argo[1]), id)
                break

            case 'sleep':
            case 'mimir':
            case 'amimir':
            case 'dormir':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                const personp = author.replace('@c.us', '')
                await client.sendImageAsSticker(from, './media/fun/sleep.jpg', mess[lang].stickerMetadataImg(true))
                await client.sendReplyWithMentions(from, mess[lang].sleep.resp(personp), id)
                break

            case 'wakeup':
            case 'wake':
            case 'acordar':
            case 'acordei':
            case 'coidei':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                const persond = author.replace('@c.us', '')
                await client.sendImageAsSticker(from, './media/fun/wakeup.jpg', mess[lang].stickerMetadataImg(true))
                await client.sendReplyWithMentions(from, mess[lang].wakeup.resp(persond), id)
                break

            case 'hug':
            case 'abraçar':
            case 'abraço':
            case 'abraco':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id);
                if (mentionedJidList.length == 0 || mentionedJidList.length > 1) return client.reply(from, mess[lang].wrongUse.tagSomeone(prefix + command), id);
                const personk = author.replace('@c.us', '');
                if (mentionedJidList[0] == sender.id) {
                    await client.sendImageAsSticker(from, './media/fun/hug2.jpg', mess[lang].stickerMetadataImg(true));
                    await client.sendReplyWithMentions(from, mess[lang].hug.self(personk), id);
                    return;
                }
                await client.sendMp4AsSticker(from, './media/fun/hug.mp4', { fps: 10 }, mess[lang].stickerMetadataImg(true), id);
                await client.sendReplyWithMentions(from, mess[lang].hug.resp(personk, mentionedJidList[0].replace('@c.us', '')), id);
                break

            case 'beijar':
            case 'beija':
            case 'beijo':
            case 'kiss':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (mentionedJidList.length == 0 || mentionedJidList.length > 1) return client.reply(from, mess[lang].wrongUse.tagSomeone(prefix + command), id);
                const arge = body.trim().split(' ')
                const persona = author.replace('@c.us', '')
                if (mentionedJidList[0] == sender.id) {
                    await client.sendImageAsSticker(from, './media/fun/kiss2.jpg', mess[lang].stickerMetadataImg(true));
                    await client.sendReplyWithMentions(from, mess[lang].kiss.self(persona), id);
                    return;
                }
                await client.sendMp4AsSticker(from, './media/fun/kiss.mp4', { fps: 10 }, mess[lang].stickerMetadataImg(true), id)
                await client.sendReplyWithMentions(from, mess[lang].kiss.resp(persona, arge[1]), id)
                break

            case 'kill':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (mentionedJidList.length == 0 || mentionedJidList.length > 1) return client.reply(from, mess[lang].wrongUse.tagSomeone(prefix + command), id);
                const argy = body.trim().split(' ')
                const personay = author.replace('@c.us', '')
                if (mentionedJidList == sender.id) {
                    await client.sendMp4AsSticker(from, './media/fun/kill2.mp4', { fps: 10 }, mess[lang].stickerMetadataImg(true), id);
                    await client.sendReplyWithMentions(from, mess[lang].kill.self(personay), id);
                    return;
                }
                await client.sendMp4AsSticker(from, './media/fun/kill.mp4', { fps: 10 }, mess[lang].stickerMetadataImg(true), id)
                await client.sendReplyWithMentions(from, mess[lang].kill.resp(personay, argy[1]), id)
                break

            case 'shrug':
            case 'shruggie':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                const rgifts = fs.readFileSync('./media/text/shrug.txt').toString().split('\n')
                const rgidds = rgifts[Math.floor(Math.random() * rgifts.length)]
                await client.reply(from, rgidds, id)
                break

            case 'bemvindo':
            case 'welcome':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (isGroupMsg && isGroupAdmins || isGroupMsg && isowner) {
                    if (args.length !== 1) return client.reply(from, mess[lang].onOrOff(), id)
                    if (args[0].toLowerCase() == 'on') {
                        if (db.get('welcome').includes(groupId)) return client.reply(from, mess[lang].welcome.alreadyOn(), id)
                        welcomedUsers = db.get('welcomedUsers');
                        var groupMembers = await client.getGroupMembers(groupId);
                        var groupMembersFormatted = [];

                        for (let i = 0; i < groupMembers.length; i++) {
                            groupMembersFormatted.push(groupMembers[i].id);
                        };

                        welcomedUsers[groupId] = {
                            users: groupMembersFormatted
                        };

                        db.set('welcomedUsers', welcomedUsers);
                        db.push('welcome', groupId);
                        await client.reply(from, mess[lang].welcome.enable(), id)
                    } else if (args[0].toLowerCase() == 'off') {
                        if (!db.get('welcome').includes(groupId)) return client.reply(from, mess[lang].welcome.alreadyOff(), id)
                        let tmpDb = db.get('welcome');
                        let dbPrm = tmpDb.indexOf(groupId);
                        tmpDb.splice(dbPrm, 1);
                        db.set('welcome', tmpDb);
                        await client.reply(from, mess[lang].welcome.disable(), id)
                    } else {
                        await client.reply(from, mess[lang].onOrOff(), id)
                    }
                } else if (isGroupMsg) {
                    await client.reply(from, mess[lang].onlyAdmins(), id)
                } else {
                    await client.reply(from, mess[lang].onlyGroups(), id)
                }
                break


            case 'antilink':
            case 'atlk':
            case 'anti-link':
            case 'antlink':
            case 'alink':
            case 'antilnk':
            case 'antlnk':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (isGroupMsg && isGroupAdmins || isGroupMsg && isowner) {
                    if (args.length !== 1) return client.reply(from, mess[lang].onOrOff(), id)
                    if (args[0].toLowerCase() == 'on') {
                        if (!isBotGroupAdmins) return await client.reply(from, mess[lang].botIsntAdmin(), id)
                        if (db.get('antilink').includes(groupId)) return client.reply(from, mess[lang].antilink.alreadyOn(), id)
                        db.push('antilink', groupId);
                        await client.reply(from, mess[lang].antilink.enable(), id)
                    } else if (args[0].toLowerCase() == 'off') {
                        let tmpDb = db.get('antilink');
                        let dbPrm = tmpDb.indexOf(groupId);
                        tmpDb.splice(dbPrm, 1);
                        db.set('antilink', tmpDb);
                        await client.reply(from, mess[lang].antilink.disable(), id)
                    } else {
                        await client.reply(from, mess[lang].onOrOff(), id)
                    }
                } else if (isGroupMsg) {
                    await client.reply(from, mess[lang].onlyAdmins(), id)
                } else {
                    await client.reply(from, mess[lang].onlyGroups(), id)
                }
                break

            case 'autosticker':
            case 'autostk':
                if (isGroupMsg && isGroupAdmins || !isGroupMsg) {
                    if (args.length !== 1) return client.reply(from, mess[lang].onOrOff(), id);
                    if (args[0].toLowerCase() == 'on') {
                        if (db.get('autosticker').includes(oqid) && isGroupMsg) return client.reply(from, mess[lang].autostk.alreadyOn(), id)
                        if (db.get('autosticker').includes(oqid) && !isGroupMsg) return client.reply(from, mess[lang].autostk.alreadyOn(), id)
                        db.push('autosticker', oqid);
                        await client.reply(from, mess[lang].autostk.enable(), id)
                    } else if (args[0].toLowerCase() == 'off') {
                        let tmpDb = db.get('autosticker');
                        let dbPrm = tmpDb.indexOf(oqid);
                        tmpDb.splice(dbPrm, 1);
                        db.set('autosticker', tmpDb);
                        await client.reply(from, mess[lang].autostk.disable(), id)
                    } else {
                        await client.reply(from, mess[lang].onOrOff(), id)
                    }
                } else {
                    return client.reply(from, mess[lang].onlyAdmins(), id);
                }
                break

            case 'autopromote':
                if (!isowner) return
                if (!isGroupMsg) return await client.reply(from, mess[lang].onlyGroups(), id)
                if (!isBotGroupAdmins) return await client.reply(from, mess[lang].botIsntAdmin(), id)
                await client.promoteParticipant(groupId, user)
                break

            case 'autodemote':
                if (!isowner) return
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isBotGroupAdmins) return client.reply(from, mess[lang].botIsntAdmin(), id)
                await client.demoteParticipant(groupId, user)
                break

            case 'adminonly':
            case 'adminsonly':
            case 'onlyadmins':
            case 'onlyadm':
            case 'admonly':
            case 'onlyadmin':
            case 'oa':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return await client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return await client.reply(from, mess[lang].onlyAdmins(), id)
                if (!isBotGroupAdmins) return await client.reply(from, mess[lang].botIsntAdmin(), id)
                if (args.length == 0) return client.reply(from, mess[lang].onOrOff(), id)
                if (args[0].toLowerCase() == 'on') {
                    await client.setGroupToAdminsOnly(from, true)
                    await client.reply(from, mess[lang].onlyadmins.on(), id)
                } else if (args[0].toLowerCase() == 'off') {
                    await client.setGroupToAdminsOnly(from, false)
                    await client.reply(from, mess[lang].onlyadmins.off(), id)
                } else {
                    client.reply(from, mess[lang].onOrOff(), id)
                }
                break

            case 'promote':
            case 'promove':
            case 'promover':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return await client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return await client.reply(from, mess[lang].onlyAdmins(), id)
                if (!isBotGroupAdmins) return await client.reply(from, mess[lang].botIsntAdmin(), id)
                if (mentionedJidList.length != 1) return client.reply(from, mess[lang].wrongUse.tagSomeone(prefix + command), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, mess[lang].promote.alreadyAdmin(), id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, mess[lang].promote.cantPromoteBot(), id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendReplyWithMentions(from, mess[lang].promote.promote(mentionedJidList[0].replace('@c.us', '')), id)
                break

            case 'demote':
            case 'rebaixar':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return client.reply(from, mess[lang].onlyAdmins(), id)
                if (!isBotGroupAdmins) return client.reply(from, mess[lang].botIsntAdmin(), id)
                if (mentionedJidList.length !== 1) return client.reply(from, mess[lang].wrongUse.tagSomeone(prefix + command), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, mess[lang].demote.alreadyDemoted(), id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, mess[lang].demote.cantSelfDemote(), id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendReplyWithMentions(from, mess[lang].demote.demote(mentionedJidList[0].replace('@c.us', '')), id)
                break

            case 'join':
                if (!isowner) return
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andGroupLink(prefix + command), message.id)
                const link = body.slice(prefix.length + command.length + 1)
                const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
                if (!isLink) return client.reply(from, mess[lang].wrongUse.andGroupLink(prefix + command), message.id)
                await client.joinGroupViaLink(link).then(async () => {
                    await client.reply(from, mess[lang].join.joined(), message.id)
                })
                break

            case 'bye':
            case 'leave':
                if (!isowner) return
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                client.leaveGroup(groupId)
                break

            case 'pokemon1':
            case 'pkm1':
            case 'pokemon':
            case 'poke':
            case 'pkm':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                var pkmr = [];
                var pkmrs = [];

                for (let i = 1; i < 1010+1; i++) {
                    let parsed = "0000".substring(0, "0000".length - i.toString().length) + i.toString();
                    pkmr.push(parsed+".png");
                };
                
                for (let i = 1; i < 1008+1; i++) {
                    let parseds = "0000".substring(0, "0000".length - i.toString().length) + i.toString();
                    pkmrs.push(parseds+".png");
                };

                var pkmrsp = Math.floor(Math.random() * pkmrs.length);
                var pkmrp = Math.floor(Math.random() * pkmr.length);

                if ((Math.floor(Math.random() * (4096 - 1)) + 1) === 4096) {
                    client.sendImageAsSticker(from, './media/pokedex/pokemon/shiny/' + pkmrs[pkmrsp], mess[lang].stickerMetadataImg(true))
                        .catch(() => client.reply(from, mess[lang].somethingWentWrong(), id))
                } else {
                    client.sendImageAsSticker(from, './media/pokedex/pokemon/normal/' + pkmr[pkmrp], mess[lang].stickerMetadataImg(true))
                        .catch(() => client.reply(from, mess[lang].somethingWentWrong(), id))
                };
                break

            case 'curiosidade':
            case 'curio':
            case 'curiosidades':
            case 'curiosity':
            case 'curiosidad':
            case 'vocesabia':
            case 'vocêsabia':
            case 'vocesabia?':
            case 'vocêsabia?':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                const rcurio = fs.readFileSync(`./media/text/curio-${lang}.txt`).toString().split('\n')
                const rsidd = rcurio[Math.floor(Math.random() * rcurio.length)]
                await client.reply(from, rsidd, id)
                break

            case 'fox1':
            case 'raposa1':
            case 'fox':
            case 'raposa':
            case 'enzo':
            case 'fox-bot':
                let directoryf = "./media/fox"
                let dirBuft = Buffer.from(directoryf);
                fs.readdir(dirBuft, (err, files) => {
                    client.sendImageAsSticker(from, `./media/fox/${files[Math.floor(Math.random() * files.length)]}`, mess[lang].stickerMetadataImg(true), id);
                })
                break

            case 'cachorro':
            case 'dog':
                let directoryy = "./media/dog"
                let dirBuff = Buffer.from(directoryy);
                fs.readdir(dirBuff, (err, files) => {
                    client.sendImageAsSticker(from, `./media/dog/${files[Math.floor(Math.random() * files.length)]}`, mess[lang].stickerMetadataImg(false), id);
                })
                break

            case 'gato':
            case 'cat':
                let directory = "./media/cat"
                let dirBuf = Buffer.from(directory);
                fs.readdir(dirBuf, (err, files) => {
                    client.sendImageAsSticker(from, `./media/cat/${files[Math.floor(Math.random() * files.length)]}`, mess[lang].stickerMetadataImg(true), id);
                })
                break

            case 'cmm':
            case 'changemymind':
                if (args.length < 1) return client.reply(from, mess[lang].wrongUse.andText(prefix + command), id);
                if (body.slice(prefix.length + command.length + 1).length > 1500) return client.reply(from, mess[lang].maxText(1500), id);
                await canvas.Canvas.changemymind(body.slice(prefix.length + command.length + 1))
                    .then(async (c) => {
                        var base64b = new Buffer.from(c).toString("base64");
                        var b64b = "data:image/png;base64," + base64b;
                        await client.sendFile(from, b64b, 'cmm.png', '', id);
                    })
                    .catch((e) => {
                        console.log(e);
                        client.reply(from, mess[lang].somethingWentWrong(), id);
                    });
                break

            case 'barcode':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andText(prefix + command), id)
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                try {
                    var textBar = body.slice(prefix.length + command.length + 1);

                    var canvabarcode = require("canvas").createCanvas();

                    JsBarcode(canvabarcode, textBar);

                    var outBuffer = canvabarcode.toBuffer('image/png');
                    var imageB64 = 'data:image/png;base64,' + outBuffer.toString('base64');

                    await client.sendFile(from, imageB64, "barcode.png", "", id);
                } catch (err) {
                    console.log(err);
                    client.reply(from, mess[lang].somethingWentWrong(), id);
                }
                break

            case 'qrcode':
            case 'qr':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andText(prefix + command), id);
                if (body.slice(prefix.length + command.length + 1).length > 1000) return client.reply(from, mess[lang].maxText(1000), id);
                try {
                    QRCode.toDataURL(body.slice(prefix.length + command.length + 1), async function (err, url) {
                        if (err) { return console.log(err); };
                        await client.sendFile(from, url, "qr.png", '', id);
                    })
                } catch (err) {
                    client.reply(from, mess[lang].somethingWentWrong(), id)
                }
                break

            case 'readqr':
            case 'readqrcode':
            case 'qrread':
            case 'qrreader':
                const qrCodeO = isQuotedImage ? quotedMsg : message;
                if (!isMedia && !isQuotedImage) return client.reply(from, mess[lang].wrongUse.quotingImageOrAsBody(prefix + command), id);
                const downQrO = await decryptMedia(qrCodeO, uaOverride);
                try {
                    Jimp.read(downQrO, async function (err, image) {
                        if (err) {
                            client.reply(from, mess[lang].readqr.cantread(), id);
                            return;
                        };
                        var qrr = new QrCodeRead();
                        qrr.callback = async function (err, value) {
                            if (err) {
                                return client.reply(from, mess[lang].readqr.cantread(), id);
                            };
                            if (!value.result) return client.reply(from, mess[lang].readqr.cantread(), id);
                            await client.reply(from, value.result, id);
                        };
                        qrr.decode(image.bitmap);
                    });
                } catch (e) {
                    client.reply(from, mess[lang].somethingWentWrong(), id);
                };
                break;

            case 'gamer':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length < 1) return client.reply(from, mess[lang].wrongUse.andName(prefix + command), id);
                await imgEditor.createGamerImg(body.slice(prefix.length + command.length + 1), client, message, { mess, lang });
                break;

            case 'scan':
            case 'scanurl':
            case 'escanear':
            case 'scanear':
            case 'escan':
            case 'malware':
            case 'file-scan':
            case 'scan-file':
            case 'filescan':
            case 'scanfile':
            case 'virustotal':
            case 'virus-total':
            case 'vt':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (body.slice(prefix.length + command.length + 1).length > 1000) return client.reply(from, mess[lang].maxText(1000), id);
                if (args.length == 0) {
                    try {

                        var vtArch = isQuotedMsg ? quotedMsg : message
                        var vtFile = await decryptMedia(vtArch, uaOverride)
                        var rName = Math.random().toString(36).substring(7);
                        createDir('./tmp');
                        var vtImg = './tmp/' + rName + '.txt';
                        fs.writeFileSync(vtImg, vtFile)

                        var data = fs.readFileSync(vtImg);

                        client.reply(from, mess[lang].scan.scanning(), id);
                        virusTotal
                            .fileScan(data, vtImg)
                            .then(async (response) => {
                                virusTotal.fileReport(response.resource).then(async (result) => {
                                    client.simulateTyping(from, true);
                                    client.sendSeen(from);
                                    var saidaVT = mess[lang].scan.resp(result).replace(/false/gi, '✅').replace(/true/gi, '⛔');
                                    var saidaVT = mess[lang].scan.resp(result).replace(/undefined/gi, '0');
                                    await client.reply(from, saidaVT, id);
                                    fs.unlinkSync(vtImg);
                                });
                            })
                            .catch(async () => {
                                await client.reply(from, mess[lang].tooBig(), id)
                                fs.unlinkSync(vtImg);
                            });
                    } catch (err) {
                        console.log(err)
                        client.reply(from, mess[lang].wrongUse.andLinkOrQuotingFile(prefix + command), id)
                    }
                } else if (args.length > 0) {
                    try {
                        var inputScan = encodeURIComponent(args[0])
                        const outputScanUrl = await axios.get(`https://ipqualityscore.com/api/json/url/${config.api_keys.ip_quality_score}/${inputScan}`)
                        const oScanUrl = outputScanUrl.data
                        if (oScanUrl.unsafe == undefined) return client.reply(from, mess[lang].isntURL(), id)
                        client.reply(from, mess[lang].scan.scanning(), id)
                        var Sadult = oScanUrl.adult
                        var Smalware = oScanUrl.malware
                        var Ssuspicious = oScanUrl.suspicious
                        var SriskS = oScanUrl.risk_score
                        var Sunsafe = oScanUrl.unsafe
                        var Sspam = oScanUrl.spamming

                        await client.reply(from, mess[lang].scan.returnURL(oScanUrl, Sspam, Smalware, Ssuspicious, Sunsafe, Sadult, SriskS), id)
                    } catch (err) {
                        client.reply(from, mess[lang].somethingWentWrong(), id)
                    }
                } else {
                    client.reply(from, mess[lang].wrongUse.andLinkOrQuotingFile(prefix + command), id)
                }
                break

            case 'shortlink':
            case 'cutlink':
            case 'cortarlink':
            case 'encurtarlink':
            case 'short':
            case 'shortener':
            case 'shortener':
            case 'shortlink':
            case 'sl':
            case 'bit':
            case 'bitly':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andLink(prefix + command), id)
                if (body.slice(prefix.length + command.length + 1).length > 1000) return client.reply(from, mess[lang].maxText(1000), id);
                var inBit = args[0];
                var re = new RegExp("^(http|https)://", "i");
                var match = re.test(inBit);
                if (!match) {
                    inBit = "http://" + inBit;
                }
                bitly.shorten(inBit)
                    .then(function (result) {
                        client.reply(from, `${result.link}`, id)
                    })
                    .catch(function () {
                        client.reply(from, mess[lang].invalidURL(), id)
                    })
                break

            case 'defprefix':
            case 'definirprefixo':
            case 'setprefixo':
            case 'setprefix':
            case 'prefix':
            case 'prefixo':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (isGroupMsg && isGroupAdmins || !isGroupMsg) {
                    if (args.length !== 1) return client.reply(from, mess[lang].wrongUse.andChar(prefix + command), id)
                    prefixer = args[0]
                    if (prefixer.split('').length !== 1) return client.reply(from, mess[lang].prefix.tooBig(), id);

                    var blockChar = "#$&-+/!?:;|~^.%";
                    blockChar.split('');

                    let pos = null
                    let found = false
                    Object.keys(blockChar).forEach((i) => {
                        if (blockChar[i] === prefixer) {
                            pos = i
                            found = true
                        }
                    })
                    if (!found && pos === null) return client.reply(from, mess[lang].prefix.cantBeUsed(prefixer), id);

                    prefix = prefixer;
                    db.set(`prefix.${oqid}`, args[0]);
                    await client.reply(from, mess[lang].prefix.changed(prefixer), id)
                } else { return client.reply(from, mess[lang].onlyAdmins(), id); }
                break

            case 'ttp':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length < 1) return client.reply(from, mess[lang].wrongUse.andPhrase(prefix + command), id);
                if (body.slice(prefix.length + command.length + 1).split('').length > 30) return client.reply(from, mess[lang].maxText(30), id);
                await imgEditor.createTtpImg(body.slice(prefix.length + command.length + 1), client, message, { mess, lang });
                break;

            case 'say':
                if (!isowner) return
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length == 0) return client.reply(from, mess[lang].wrongUse.andPhrase(prefix + command), id)
                await client.sendText(from, body.slice(4))
                break

            case 'gpt':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id);
                if (processedMessages.includes(id) || !body.startsWith(prefix)) return message;
                processedMessages.push(id);
                var content = body.slice(prefix.length + command.length + 1);
                var gptMessages = [
                    { role: "system", content: "You are a helpful assistant." },
                    ...(await client.getGptArray(from, 10)),
                    { role: "user", content: content }
                ];
                await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: gptMessages,
                })
                    .catch(e => console.error(e))
                    .then(async (completion) => {
                        await client.reply(from, completion.data.choices[0].message.content, id);
                    });

                break;

            case 'climate':
            case 'clima':
            case 'weather':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (args.length < 1) return client.reply(from, mess[lang].wrongUse.andLocal(prefix + command), id);
                if (body.slice(prefix.length + command.length + 1).length > 100) return client.reply(from, mess[lang].maxText(100), id);
                try {
                    var query = body.slice(prefix.length + command.length + 1).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    var dataget = await axios.get(mess[lang].weather.url(query, config.api_keys.weather_api));
                    var resw = mess[lang].weather.resp(dataget.data);
                    await client.reply(from, resw, id);
                } catch (err) {
                    console.log(err);
                    client.reply(from, mess[lang].somethingWentWrong(), id);
                };
                break

            case 'wasted':
            case 'gtav':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (isMedia && type === 'image' || isQuotedImage || isQuotedSticker) {
                    const wastedmd = isQuotedMsg ? quotedMsg : message
                    const wstddt = await decryptMedia(wastedmd, uaOverride)
                    await canvas.Canvas.wasted(wstddt)
                        .then(async (c) => {
                            var base64b = new Buffer.from(c).toString("base64");
                            var b64b = "data:image/png;base64," + base64b;
                            await client.sendImageAsSticker(from, b64b, mess[lang].stickerMetadataImg(true), id);
                        });
                } else {
                    await client.reply(from, mess[lang].wrongUse.quotingImage(prefix + command), id)
                }
                break

            case 'del':
            case 'delete':
            case 'erase':
            case 'excluir':
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                if (!isGroupAdmins) return client.reply(from, mess[lang].onlyAdmins(), id)
                if (!quotedMsg) return client.reply(from, mess[lang].wrongUse.quotingMyMessage(prefix + command), id)
                await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                await client.deleteMessage(quotedMsgObj.chatId, id, false)
                break

            case 'adminslist':
            case 'admlist':
            case 'adminlist':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isGroupMsg) return client.reply(from, mess[lang].onlyGroups(), id)
                let mimin = '╔══✪〘 Admins List 〙✪══\n'
                for (let admin of groupAdmins) {
                    mimin += `╠➥ @${admin.replace(/@c.us/g, '')}\n`
                }
                mimin += '╚═〘 Lune Bot 〙'
                await client.sendReplyWithMentions(from, mimin, id)
                break

            case 'everyone':
            case 'tagall':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (isGroupMsg && isowner || isGroupMsg && isGroupAdmins) {
                    const groupMem = await client.getGroupMembers(groupId);
                    let hehe = `╔══✪〘 Everyone 〙✪═\n`
                    for (let i = 0; i < groupMem.length; i++) {
                        hehe += `╠➥ @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                    }
                    hehe += '╚═✪〘 Lune Bot 〙✪═'
                    await sleep(2000)
                    await client.sendReplyWithMentions(from, hehe, id)
                } else if (isGroupMsg) {
                    await client.reply(from, mess[lang].onlyAdmins(), id)
                } else {
                    await client.reply(from, mess[lang].onlyGroups(), id)
                }
                break

            case 'stop':
            case 'restart':
            case 'reiniciar':
                client.simulateTyping(from, true);
                client.sendSeen(from);
                if (!isowner) return
                await client.reply(from, mess[lang].stop.resp(), id)
                await client.setMyStatus('Bot under maintenance! ⚠️')
                await client.kill()
                break


            default:
                if (message.body.toLowerCase().includes("prefixo atual") ||
                    message.body.toLowerCase().includes("current prefix") ||
                    message.body.toLowerCase().includes("prefijo actual")
                ) {
                    client.reply(from, mess[lang].messages.actualPrefix(), id);
                }

                if (message.body.toLowerCase() == "linda" ||
                    message.body.toLowerCase() == "beautiful" ||
                    message.body.toLowerCase() == "pretty"
                ) {
                    if (!isQuotedMsg) return;
                    if (!quotedMsg.fromMe) return;
                    client.reply(from, mess[lang].messages.thanks(), id);
                };

                if (
                    message.body.toLowerCase() === 'obg' ||
                    message.body.toLowerCase() === 'vlw' ||
                    message.body.toLowerCase() === 'thanks' ||
                    message.body.toLowerCase() === 'thx' ||
                    message.body.toLowerCase() === 'obgg' ||
                    message.body.toLowerCase() === 'obgda' ||
                    message.body.toLowerCase() === 'obgdo' ||
                    message.body.toLowerCase() === 'obrigado' ||
                    message.body.toLowerCase() === 'obgdo' ||
                    message.body.toLowerCase() === 'obgdo' ||
                    message.body.toLowerCase() === 'gracias'
                ) {
                    if (!isQuotedMsg) return;
                    if (!quotedMsg.fromMe) return;
                    client.reply(from, mess[lang].messages.happyFace(), id);
                };

                if (
                    message.body.toLowerCase() == "fofa" ||
                    message.body.toLowerCase() == "fofs" ||
                    message.body.toLowerCase() == "fofinha" ||
                    message.body.toLowerCase() == "cute"
                ) {
                    if (!isQuotedMsg) return;
                    if (!quotedMsg.fromMe) return;
                    client.reply(from, mess[lang].messages.cute(), id);
                };

                if (["ss", "sim", "s", "yes", "uhum", "claro", "yeh", "ye", "ya", "yah", "yep", "óbvio", "certamente", "sure", "si", "sí"].includes(message.body.toLowerCase())) {
                    if (!isQuotedMsg) return;
                    if (!quotedMsg.fromMe) return;
                    if (quotedMsg.body !== mess[lang].messages.calledMe()) return;
                    client.reply(from, mess[lang].messages.needHelp(prefix), id);
                };

                if (message.body === `@${botNumber.replace('@c.us', '')}`) {
                    client.reply(from, mess[lang].messages.calledMe(), id)
                };
        };
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    };
};

const runBot = async (client, message) => {
    return new Promise(() => {
        main(client, message)
    });
};

module.exports = {
    main,
    runBot,
    prefix,
    lang
};

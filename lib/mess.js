const db = require('quick.db');

// pt_BR
// en_US
// es_ES
module.exports = {
    "pt_BR": {
        responseTime: (time) => { return `Tempo de resposta: ${time}ms`; },
        onlyAdmins: () => { return `Sinto muito, este comando só pode ser usado por administradores do grupo! ❌`; },
        onlyGroups: () => { return `Desculpe, este comando só pode ser usado dentro de grupos! ❌`; },
        onlyNum: () => { return `Sinto muito, mas a mensagem deve ser um número! ⚠️`; },
        onlyText: () => { return `Sinto muito, mas a mensagem deve ser um texto! ⚠️`; },
        somethingWentWrong: () => { return `Ops! Algo deu errado! ❌`; },
        somethingWentWrongConversion: () => { return `Ops! Algo deu errado durante a conversão! ❌`; },
        stickerMetadataImg: (keepScale) => { return { author: '+55 (16) 99787-2383', pack: 'Lune Bot', keepScale: keepScale }; },
        stickerMetadataVideo: (fps, end, keepScale, crop) => { return { stickerMetadata: true, author: '+55 (16) 99787-2383', pack: 'Lune Bot', fps: fps, startTime: '00:00:00.0', endTime : end, crop: crop, loop: 0, keepScale: keepScale }; },
        lang: () => { return `pt`; },
        maxText: (max) => { return `Sinto muito, mas a mensagem não pode possuir mais de ${max} caracteres! ⚠️`; },
        maxCustom: (maxT) => { return `Sinto muito, mas a mensagem não pode possuir mais de ${maxT}! ⚠️`; },
        maxDuration: (max, maxType, mediaType) => {
            switch (maxType) {
                case 's':;
                    maxType = "segundo(s)";
                break;
                case 'm':;
                    maxType = "minuto(s)";
                break;
                case 'h':;
                    maxType = "hora(s)";
                break;    
                case 'ms':;
                    maxType = "milésimo(s)";
                break;
                case 'd':;
                    maxType = "dia(s)";
                break;
            };
            mediaType = mediaType == 'aud' ? "áudio" : "vídeo"; return `Ops! O ${mediaType} não pode conter mais que ${max} ${maxType} de duração! ⚠️`;
        },
        botIsntAdmin: () => { return `Para usar este comando, é necessario eu ser um administrador do grupo! ⚠️`; },
        invalidOptions: (validOptions) => { var $ = `Escolha uma opção válida! ⚠️\nLista de opções:`; validOptions.forEach((option) => { $ += `\n${option}`; }); return $; },
        cantfind: (arg) => { return `Ops! Não foi possível encontrar ${arg}! ❌`; },
        onOrOff: () => { return `Defina entre "on" e "off"! ⚠️`; },
        isntURL: () => { return `Isto não é um URL! ❌`; },
        invalidURL: () => { return `Ops! Link inválido! ❌`; },
        invalidDDD: () => { return `Ops! DDD inválido! ❌`; },
        minTries: (min) => { return `Coloque no mínimo de ${min} tentativas! ⚠️`; },
        maxTries: (max) => { return `Coloque um número máximo de tentativas até ${max}! ⚠️`; },
        getMounth: (mounth) => { switch (mounth) { case '01':; return "Janeiro"; case '02':; return "Fevereiro"; case '03':; return "Março"; case '04':; return "Abril"; case '05':; return "Maio"; case '06':; return "Junho"; case '07':; return "Julho"; case '08':; return "Agosto"; case '09':; return "Setembro"; case '10':; return "Outubro"; case '11':; return "Novembro"; case '12':; return "Dezembro"; }; },
        noSpecialCharacters: () => { return `Ei, não use caracteres especiais! ⚠️`; },
        noEmojiFound: () => { return `Nenhum emoji foi encontrado!`; },
        noResultFound: () => { return `Nenhum resultado encontrado!`; },
        yes: () => { return `Sim`; },
        no: () => { return `Não`; },
        "wrongUse": {
            default: (cmd) => { return `Uso incorreto! Utilize *${cmd}*! ❌`; },
            defaultArgs: (cmd, args) => { return `Uso incorreto! Utilize *${cmd}* <${args.join('> <').replace(/ </g, '')}>!`; },
            quotingMessage: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma mensagem! ❌`; },
            quotingMessageOrAtSide: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o texto ou marcando uma mensagem! ❌`; },
            quotingImage: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem! ❌`; },
            quotingImageOrAsBody: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem ou como legenda! ❌`; },
            quotingVideo: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um vídeo! ❌`; },
            quotingImageOrVideoOrGIF: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem, vídeo ou GIF! ❌`; },
            quotingAudioOrVideo: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um áudio ou vídeo! ❌`; },
            quotingText: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um texto! ❌`; },
            quotingSticker: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um sticker! ❌`; },
            quotingAudio: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um áudio! ❌`; },
            quotingFile: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um arquivo! ❌`; },
            quotingMyMessage: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma mensagem minha! ❌`; },
            quotingImageOrAsBody: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem ou use como legenda! ❌`; },
            quotingMessageAndTimeInMinutes: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma mensagem e ao lado o tempo em minutos! ❌`; },
            quotingMessageOrTagSomeone: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma mensagem ou mencione alguém! ❌`; },
            andLocal: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um local! ❌`; },
            andPhrase: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado uma frase! ❌`; },
            addMusicName: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um nome de música! ❌`; },
            andTagAndVal: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado marque a pessoa que deseja dar XP e ao lado digite o valor! ❌`; },
            andChar: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um caractere! ❌`; },
            andLink: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um link! ❌`; },
            andLinkOrQuotingFile: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um link ou marcando um arquivo! ❌`; },
            andName: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um nome! ❌`; },
            andText: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um texto! ❌`; },
            andCep: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um CEP! ❌`; },
            andDDD: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um DDD! ❌`; },
            andAudioAndEffect: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um áudio e ao lado o efeito!\n\nLista de efeitos suportados:\nexplode - 2x - reverse - bass - acute - volume - nightcore - lo-fi - bathroom - slow`; },
            andSearch: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o que deseja pesquisar! ❌`; },
            andPokemon: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o nome de Pokémon!`; },
            andVideoName: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o nome do vídeo!`; },
            andGroupLink: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o link do grupo! ❌`; },
            andSeed: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado a seed! ❌`; },
            andPrompt: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o prompt! ❌`; },
            twoWords: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem e ao lado (palavra1) | (palavra2)! ❌`; },
            useNumber: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um número <55XXXXXXXXX>! ❌`; },
            tagTwoPeople: (cmd, separator) => { return `Uso incorreto! Utilize *${cmd}* (usuário n1) ${separator} (pessoa n2)! ❌`; },
            tagSomeone: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado mencione alguém! ❌`; },
            axp: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando a pessoa que deseja dar ou remover XP e ao lado o valor! ❌`; },
            roll: (cmd) => { return `Uso incorreto! Utilize *${cmd}* <N° de dados>d<N° de lados dos dados>+<proeficiência (opcional)>!`; },
            ppt: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e uma escolha\n\n*(Escolha entre PEDRA, PAPEL, TESOURA)*`; },
            setlang: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e o idioma que quer utilizar! ❌\n\n*("pt_BR", "es_ES", "en_US")*`; },
        },
        "menu": {
            onlyPv: () => { return `Sinto muito, mas este menu está disponível apenas no privado!`; },
            dontExist: () => { return `Sinto muito, mas este menu não existe!`; },
        },
        "messages": {
            thanks: () => { return `Muito obrigada... 🥰`; },
            enabled: () => { return `Ativado ✅`; },
            disabled: () => { return `Desativado ❌`; },
            noName: () => { return `Sem nome. ❌`; },
            noDesc: () => { return `Sem descrição. ❌`; },
            noResults: () => { return `Nenhum resultado encontrado! ❌`; },
            linksAreNotAllowed: () => { return `Links não são permitidos neste grupo! ❌`; },
            calledMe: () => { return `Me chamou? ☺️✨`; },
            happyFace: () => { return `;D`; },
            needHelp: (prefix) => { return `Precisa de ajuda? Mande *${prefix}menu* para mais informações! 😉`; },
            cute: () => { return `Ah, que isso kkk 🥰`; },
            actualPrefix: (prefix) => { return `O prefixo atual deste chat é: *"${prefix}"*`; },
        },
        "kick": {
            removedUser: () => { return `Usuário removido! ✅`; },
            areYouBanned: (banUser) => { return `Você foi banido! 🚫\n${banUser}`; },
            youCantKickMe: () => { return `Por que eu faria isso? 🤨`; },
            cantBanAdmin: () => { return `Sinto muito, você não pode expulsar um administrador do grupo! ⚠️`; },
            cantBanOwner: () => { return `Permissão negada! Não posso banir meu criador! ⛔`; },
            userIsntOnGroup: () => { return `O usuário não está no grupo! ⚠️`; },
        },
        "ek": {
            maxEmojis: (max) => { return `Use no máximo ${max} emojis!`; },
            dontCombine: () => { return `Ops! Estes emojis não combinam!`; },
            wrongUse: (cmd) => { return `Uso incorreto! Digite *${cmd}* <emoji> <emoji> _(obs: deve haver um espaço entre os emojis)_ ❌`; },
        },
        "xp": {
            onlyGroupsWithXp: () => { return `Este comando só pode ser usado dentro de grupos com sistema de XP!`; },
            cantGiveMoreThanYouHave: () => { return `Você não pode dar mais XP do que você possui! ❌`; },
            cantUseMinus: () => { return `Sinto muito, mas você não pode roubar o amiguinho :P`; },
            give: (gived, give, xpNow, xpNowGv) => { return `Você transferiu ${gived} XP para @${give}!\nXP anterior: ${xpNow}\nXP atual: ${xpNowGv}`; },
            axp: (user, give) => { return `Aplicado ${give} XP para ${user}!`; },
            tagGive: (cmd) => { return `Você deve marcar a pessoa que deseja transferir seu XP!\nExemplo:\n*${cmd}* @Fox 10`; },
            xpIsOff: () => { return `Para usar este e mais comandos, ative o sistema de XP no grupo!`; },
            xpOff: () => { return `Este grupo não fará mais parte do sistema de XP!`; },
            xpOn: () => { return `Este grupo agora faz parte do sistema de XP!`; },
            xpAlreadyOn: () => { return `O sistema de XP já está ativo no grupo!`; },
            level: (pushname, xp, thexpnde, uzerlvl, patente) => { return `*「 NIVEL 」*\n\n🖊️ *NOME:* ${pushname}\n💠 *XP:* ${xp} / ${thexpnde}\n📊 *Nivel:* ${uzerlvl}\n🧙‍♂️ *Classe:* ${patente}`; },
            insuficientXpToUp: () => { return `Você não possui XP o suficiente para subir o nível!`; },
            forceUp: (pushname, xp, requiredXp, lvl, role, amount) => { `*「 FORCEUP 」*\n\n🖊️ *NOME:* ${pushname}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Nivel:* ${lvl}\n🧙‍♂️ *Classe:* ${role}\n\n_*Você subiu "${amount}" ${(amount-1) == 0 ? "nível" : "níveis"}!*_`; },
            tiersTop: () => {  return `*PATENTES:*\n\n`; },
            tiers: (patent, emoji, lvl) => {  return `${patent} ${emoji} - (Nível necessário: ${lvl})\n\n`; },
            finalMsgTiers: (usr, lvl, xp, requiredXp) => { return `*Usuário:* ${usr}\n*Seu nivel:* ${lvl}\n*Seu XP:* ${xp}/${requiredXp}`; },
            actualChance: (chance) => { return `☘️ Chance atual: ${chance}%`; },
            newLevel: (name, xp, requiredXp, lvl, role) => { return  `*「 NOVO NIVEL 」*\n\n🖊️ *NOME:* ${name}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Nivel:* ${lvl}\n🧙‍♂️ *Classe:* ${role}\n\n_*Quanto mais você interage no grupo, mais alto é o seu nível!*_`; },
        },
        "games": {
            rwin: (win) => { return `Salvo! Você não levou um tiro e ganhou ${win} XP!`; },
            rlose: (lose) => { return `Bang! Você perdeu na roleta-russa, causando uma perda de ${lose} XP!`; },
            cwin: ({ e1, e2, e3 }, win) => { return `GANHOU!\n[--------------------]\n${e1} - ${e2} - ${e3}\n[--------------------]\n\nVocê ganhou ${win} XP!`; },
            close: ({ e1, e2, e3 }, lose) => { return `PERDEU!\n[--------------------]\n${e1} - ${e2} - ${e3}\n[--------------------]\n\nVocê perdeu ${lose} XP!`; },
            tooLowXp: (min, usrxp) => { return `Você não possui uma licença para jogar, obtenha uma quando tiver ${min} de XP!\n\nVocê possui ${usrxp} XP!`; },
            specifyAmount: () => { return `Especifique a quantidade de XP para apostar!`; },
            onlyNum: () => { return `Para apostar use apenas números, nada de inserir letras, a menos que queira perder todo o XP que tenha!`; },
            tooHighVal: (usrxp, max) => { return `Você não pode apostar uma quantidade de XP maior do que você possui, e nosso limite de apostas é de ${max} XP por vez!\n\nVocê possui ${usrxp} XP!`; },
            tooLowVal: (min) => { return `Desculpe, mas você não pode apostar menos de ${min} XP!`; },
        },
        "exitgame": {
            on: () => { return `Agora você poderá receber XP novamente!`; },
            off: () => { return `Você não reberá mais XP agora!`; },
            alreadyOn: () => { return `O XP já está ativado para você!`; },
            alreadyOff: () => { return `O XP já está desativado para você!`; },
        },
        "profile": {
            resp: (usr, adm, estadoCivil, lvl, xp, xpRequired, role, isxp) => { return `*Dados do perfil..* ✨️ \n\n🔖️ *Nome de usuário:*\n${usr}\n\n👑️ *Administrador?*\n${adm}\n\n💕 *Estado civil*:\n${estadoCivil}\n\n📈 *Level:*\n${isxp ? lvl : "Sistema de XP desativado"}\n\n🕹️ *XP:*\n${isxp ? xp+"/"+xpRequired : "Sistema de XP desativado"}\n\n🌐 *Patente:*\n${isxp ? role : "Sistema de XP desativado"}`; },
            marriagedWith: (usr) => { return `Casado(a) com @${usr}`; },
        },
        "sys": {
            time: (h, m, s) => { return `${h} horas | ${m} minutos | ${s} segundos - HH:MM:SS`; },
            mem: (gb, mb, kb, allram) => { return `${gb}GB | ${mb}MB | ${kb}KB | ${allram} Bytes`; },
            resp: (speed, loadedMsgs, groups, chatIds, uptime, pcUptime, cpu, cpuSpeed, os, osArch, osPlatform, osRelease, ram, username, hostname, zapVer, owaVer) => { return `🐌 - Velocidade > ${speed} segundos\n\n📊 - ${loadedMsgs} Mensagens após inicio\n\n📱 - ${groups.length} Conversas em grupo\n\n👥 - ${chatIds.length - groups.length} Conversas no PV\n\n📈 - ${chatIds.length} Total de chats\n\n⌛ Bot Uptime - ${uptime}\n\n💻​ PC Uptime - ${pcUptime}\n\n🌡️ CPU - ${cpu} (${cpuSpeed} MHz)\n\n🖥️ S.O - ${os} - ${osArch} (${osPlatform} V. ${osRelease})\n\n💾 RAM - ${ram}\n\n👑 Username - ${username} (${hostname})\n\n🪀 WhatsApp - Version ${zapVer}\n\n📡 Open-WA - Version ${owaVer}`/*\n\n🔋 Bateria do Telefone - ${botBat}\n\n🔌 Telefone carregando? - ${isEnergy ? 'Sim' : 'Não'}`*/; },
        },
        "death": {
            resp: (name, deathAge) => { return `Pessoas com o nome "${name}" tendem a morrer aos ${deathAge} anos de idade!`; },
        },
        "ping": {
            resp: (speed, uptime) => { return `🏓 *PONG!*\n\n⏳ Ping: ${speed}ms\n\n⏳ Tempo Online: ${uptime}`; },
        },
        "anime": {
            noResults: () => { return `Nenhum resultado encontrado! ❌`; },
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o nome do anime! ❌`; },
            inDev: () => { return `(Em desenvolvimento)`; },
            resp: (val) => { return `✨ Titulo: ${val.title}\n\n🎆 Episódios: ${val.episodes}\n\n💌 Classificação: ${val.rating}\n\n${val.status ? `⚠️ Status: ${val.status}\n\n` : ''}🕑 Duração: ${val.duration}\n\n❤️ Nota: ${val.score}\n\n${val.synopsis ? `💚 Sinopse: ${val.synopsis}\n\n` : ''}🌐 Link: ${val.url}`; },
        },
        "manga": {
            noResults: () => { return `Nenhum resultado encontrado! ❌`; },
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o nome do mangá! ❌`; },
            inDev: () => { return `(Em desenvolvimento)`; },
            resp: (val) => { return `✨ Titulo: ${val.title}\n\n🎆 Capítulos: ${val.chapters}\n\n💌 Volumes: ${val.volumes}\n\n${val.status ? `⚠ Status: ${val.status}\n\n` : ''}❤️ Nota: ${val.score}\n\n${val.synopsis ? `💚 Sinopse: ${val.synopsis}\n\n` : ''}🌐 Link: ${val.url}`; },
        },
        "emo": {
            resp: (percent) => {
                if (percent == 100) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nEmo supremo(a)!`;
                } else if (percent == 101) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é SUPREME% Emo!\n\nHYPER MEGA EMO!`;
                } else if (percent == 0) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nQue cara mais comum...`;
                } else if (percent == 25) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nMerece mais maquiagem preta!`;
                } else if (percent == 50) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nÉ emo ou não? Decida-se!`;
                } else if (percent == 75) {
                    `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nMega Emo!`;
                } else {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!`;
                };
            },
        },
        "gay": {
            resp: (percent) => {
                if (percent == 100) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nGay supremo(a)!`;
                } else if (percent == 101) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é SUPREME% Gay!\n\nHYPER MEGA GAY!`;
                } else if (percent == 0) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nTotalmente hétero!`;
                } else if (percent == 25) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nDa pra melhorar!`;
                } else if (percent == 50) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nÉ gay ou hétero? Decida-se!`;
                } else if (percent == 75) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nMega gay!`;
                } else {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!`;
                };
            },
        },
        "corno": {
            resp: (percent) => {
                if (percent === 100) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\nCorno(a) supremo(a) -(->x🐂x<-)-`;
                } else if (percent == 101) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é SUPREME% Corno(a)!\n\nGADO MODO DEUS!`;
                } else if (percent == 0) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\nNunca foi traido(a) 😎👌`;
                } else if (percent == 25) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\nCorno(a) conformado(a)`;
                } else if (percent == 50) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\n😐`;
                } else if (percent == 75) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\nCorno(a) mestre(a) 🐂👌`;
                } else {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!`;
                };
            },
        },
        "fofo": {
            resp: (percent) => {
                if (percent === 100) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nSUPER FOFO(A)! 🌟🌟🌟🌟🌟`;
                } else if (percent == 0) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nAssustador(a)... 🌟`;
                } else if (percent == 25) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nFofinho(a) 🌟🌟;^;`;
                } else if (percent == 50) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nFofo(a) 🌟🌟🌟`;
                } else if (percent == 75) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nMuito fofo(a) 🌟🌟🌟🌟`;
                } else {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!`;
                };
            },
        },
        "pokedex": {
            dontExistPokemon: () => { return `Sinto muito, mas este pokemon não existe!\n\nCaso exista verifique se está escrito corretamente!`; },
            resp: async(pk, translate) => {
                var txtPoke = {
                    nm: '*Name*: ' + (pk.name.split('')[0].toUpperCase()+pk.name.slice(1)),
                    desc: '*Description:*\n'+pk.description,
                    typ: '*Type:* '+pk.type,
                    gr: '*Generation:* '+pk.generation,
                    egg: '*Egg group:* '+pk.egg_groups.join(' - ').replace(/ - $/, '').replace("Undiscovered", "Não descoberto"),
                    stt: '*Status:*\nHP: '+pk.stats.hp+'\nAttack: '+pk.stats.attack+'\nDefense: '+pk.stats.defense+'\nSP Attack: '+pk.stats.sp_atk+'\nSP Defense: '+pk.stats.sp_def+'\nSpeed: '+pk.stats.speed+'\nTotal: '+pk.stats.total,
                    fml: '*Evolution:* '+pk.family.evolutionStage+'',
                    gend: '*Gender:*\n'+(pk.gender.join(', ').replace(/, $/, '')),
                    hab: '*Abilities:* '+pk.abilities.join(' - ').replace(/ - $/, ''),
                    tam: '*Height:* '+pk.height,
                    pes: '*Weight:* '+pk.weight,
                    esp: '*Category:* '+(pk.species.join(', ').replace(/, $/, '')),
                }
                return `*---POKEDEX---*\n\n🗒️ ${txtPoke.nm}\n\n📃 ${txtPoke.desc}\n\n🔎 ${txtPoke.typ}\n\n🗓️ ${txtPoke.gr}\n\n🥚 ${txtPoke.egg}\n\n🧮 ${txtPoke.stt}\n\n📶 ${txtPoke.fml}\n\n⚧️ ${txtPoke.gend}\n\n⚔️ ${txtPoke.hab}\n\n📐 ${txtPoke.tam}\n\n⚖️ ${txtPoke.pes}\n\n🧬 ${txtPoke.esp}`;
            },
        },
        "marriage": {
            alreadySentRequest: () => { return `Você já enviou um pedido de casamento para este usuário! ⚠️`; },
            divorce: (usr1, usr2) => { return `@${usr1} se divorciou de @${usr2}!`; },
            marryRequest: (usr1, usr2) => { return `@${usr1} enviou um pedido de casamento para @${usr2}!`; },
            alreadyMarried: () => { return `Este usuário já está casado(a) com outra pessoa!`; },
            tagSomeone: (cmd) => { return `Você deve marcar alguem que te enviou um pedido de caasmento para aceitar. Utilize *${cmd}* @usuário`; },
            thatPersonDontSendYouARequest: () => { return `Esta pessoa não lhe enviou um pedido de casamento!`; },
            noOneSentYouARequest: () => { return `Ninguém te enviou um pedido de casamento!`; },
            cantMarryTwoOrMore: (prefix) => { return `Você não pode casar com mais de uma pessoa!\n\nCaso queira encerrar o seu atual casamento envie *${prefix}divorce*`; },
            cantSelfMarry: () => { return `Sinto muito, mas você não pode se casar com você mesmo(a)`; },
            cantMarryBot: () => { return `Está tentando me conquistar?`; },
            fmarry: (usr1, usr2) => { return `@${usr1} foi forçado(a) a se casar com @${usr2}!`; },
            alone: () => {  return `Solteiro(a)`; },
            youArentMarried: () => { return `Você não está casado(a) com ninguém!`; },
            thisUserArentMarried: () => { return `Parece este usuário não está casado(a) ainda!`; },
            couple: (req, usr1, usr2, time) => { return `Olá @${req}, o usuário @${usr1} está casado(a) com @${usr2} há ${time} dias!`; },
            selfCouple: (req, usr1, time) => { return `Olá @${req}, você está casado(a) com @${usr1} há ${time} dias!`; },
            dontMarriedToDivorce: () => { return `Você não está casado(a) com ninguém para se divorciar!`; },
            marry: (usr1, usr2, day, mounth, year) => {
                return ``+
                `═════════「💍」═════════\n`+
                `          Certidão de Casamento\n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `Este documento certifica oficialmente que\n`+
                `🌹@${usr1} & 🌷@${usr2}\n`+
                `uniram-se no laço sagrado do matrimônio.\n`+
                `\n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `_Casamento é mais que subir em um altar e Proclamar amar eternamente._\n`+
                `_Casamento é mais que trocar as “escovas de dentes”, como falam, ultimamente._\n`+
                `_Casamento é a comprovação concreta que o amor é uma arte._\n`+
                `_E de alguma maneira hoje, quero sempre me casar com você..._\n`+
                `_Para mim este amor é diferente, não é de papel passado, é amor de papel presente._\n`+
                `\n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `      Casamento realizado dia ${day}\n`+
                `           de ${mounth} de ${year}\n\n`+
                `             Por: *Lune Bot*\n`+
                `\n`+
                `═════════「💍」═════════`;
            },
        },
        "top10": {
            top: () => { return `--[ *TOP 10 PLAYERS* ]--\n\n`; },
            insuficientPlayers: (min) => { return `Não temos ${min} jogadores ainda, tente novamente mais tarde!`; },
            resp: (pos, usr, xp, lvl, role) => { return `${pos}. ${usr}\n➸ *XP*: ${xp}\n➸ *Level*: ${lvl}\n➸ *Patente*: ${role}\n\n`; },
        },
        "meme": {
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem e ao lado (frase1) | (frase2)! ❌`; },
        },
        "groupinfo": {
            info: ({groupname, totalMem, welgrp, lzex, xpgp, autostk, prefix, desc, gpOwner, admgp}) => { return `*${groupname}*\n\n*Quantidade de Membros: ${totalMem}*\n\n*Welcome: ${welgrp}*\n\n*Anti-Link:  ${lzex}*\n\n*XP: ${xpgp}*\n\n*Autosticker: ${autostk}*\n\n*Prefixo: ${prefix}*\n\n______________________________\n*Descrição:*\n ${desc}\n______________________________\n\n*Dono:* @${gpOwner.replace("@c.us", "")}\n\n*Administradores:*\n${admgp}`; },
        },
        "roll": {
            minAndMaxProeficiency: (min, max) => { return `O número de proeficiência deve ser de até ${max}! E maior que ${min}!`; },
            minDices: (min) => { return `A quantidade de dados deve ser de pelo menos ${min}!`; },
            minFaces: (min) => { return `O número de lados dos dados deve ser de pelo menos ${min}!`; },
            maxDices: (max) => { return `A quantidade de dados a serem jogados deve ser até ${max}!`; },
            maxFaces: (max) => { return `A quantidade de lados dos dados a serem jogados deve ser de até ${max}!`; },
            onlyNatural: () => { return `Use apenas números naturais!`; },
        },
        "add": {
            successfullyAdded: (user) => { return `Usuário @${user} adicionado! ✅`; },
            alreadyOnGroup: () => { return `O usuário já está no grupo! ⚠️`; },
            alreadyInvited: () => { return `O usuário já foi convidado! ⚠️`; },
            noPermissions: () => { return `Este usuário não permite ser adicionado em grupos! Portanto, eu enviarei um link de convite para o mesmo! ⚠️`; },
            invalidNumber: () => { return `Este número não existe!`; },
            cantAdd: () => { return `Ops! Não foi possível adicionar o usuário ao grupo! ❌`; },
        },
        "ppt": {
            selectValidOption: () => { return `Escolha uma opção válida!`; },
            win: (emojiUsr, emojiBot) => { return `Você venceu! Você escolheu ${emojiUsr} e eu escolhi ${emojiBot}!` },
            tie: (emojiUsr, emojiBot) => { return `Um empate! Você escolheu ${emojiUsr} e eu escolhi ${emojiBot}!` },
            lose: (emojiUsr, emojiBot) => { return `Você perdeu! Você escolheu ${emojiUsr} e eu escolhi ${emojiBot}!` },
        },
        "emoji": {
            onlyOneEmoji: () => { return `Sinto muito, mande apenas um emoji por vez!`; },
        },
        "antispam": {
            ban: () => { return `*⚠️ AVISO ⚠️*\n\nSistema anti-spam habilitado!\n\nNas próximas 24 horas você não poderá interagir comigo!"`}
        },
        "slap": {
            resp: (usr1, usr2) => { return `@${usr1} bateu em ${usr2}!`; },
            noUser: () => { return `Uso incorreto! Utilize *slap @usuário*! ❌`; },
            self: (user) => { return `@${user} se bateu!`; },
        },
        "sleep": {
            resp: (user) => { return `@${user} está a mimir!`; },
        },
        "gift": {
            doYouWin: (usr, gift) => { return `${usr}, você irá ganhar ${gift} de aniversário!\n\nParabéns!`; },
        },
        "wakeup": {
            resp: (user) => { return `@${user} acordou!`; },
        },
        "hug": {
            resp: (usr1, usr2) => { return `@${usr1} abraçou @${usr2}!`; },
            self: (user) => { return `@${user} abraçou!`; },
        },
        "kiss": {
            resp: (usr1, usr2) => { return `@${usr1} beijou ${usr2}!`; },
            self: (user) => { return `@${user} se beijou!`; },
        },
        "kill": {
            resp: (usr1, usr2) => { return `@${usr1} matou ${usr2}!`; },
            self: (user) => { return `@${user} cometeu suicidio!`; },
        },
        "gender": {
            resp: (gender, name) => { return `O nome "${name}" é mais usado por ${gender}!`; },
            female: () => { return `mulheres`; },
            male: () => { return `homens`; },
        },
        "ship": {
            resp: (usr1, usr2, percent) => {
                if (percent == 100) {
                    return `💞 ${usr1} & ${usr2} 💞\nE o resultado é:\n${percent}%\nOs dois foram feitos um para o outro!💖`;
                } else if (percent == 50) {
                    return `💞 ${usr1} & ${usr2} 💞\nE o resultado é:\n${percent}%\nMeio a meio... 🥀`;
                } else if (percent == 0) {
                    return `💞 ${usr1} & ${usr2} 💞\nE o resultado é:\n${percent}%\nEstes dois não servem um para o outro.💔`;
                } else {
                    return `💞 ${usr1} & ${usr2} 💞\nE o resultado é:\n${percent}%`;
                };
            },
        },
        "revoke": {
            resp: () => { return `Link de grupo revogado com sucesso! ✅`; },
        },
        "tts": {
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* <pt> marcando uma mensagem! ❌\n\nVocê pode encontrar a lista de linguagens aqui:\nhttps://anotepad.com/note/read/5xqahdy8`; },
            unknownLang: () => { return `Ops, linguagem não reconhecida! ❌\n\nVocê pode encontrar a lista de linguagens aqui:\nAfrikaans: "af"\nAlbanian: "sq"\nAmharic: "am"\nArabic: "ar"\nArmenian: "hy"\nAzerbaijani: "az"\nBasque: "eu"\nBelarusian: "be"\nBengali: "bn"\nBosnian: "bs"\nBulgarian: "bg"\nCatalan: "ca"\nCebuano: "ceb"\nChichewa: "ny"\n"Chinese Simplified": "zh-cn"\n"Chinese Traditional": "zh-tw"\nCorsican: "co"\nCroatian: "hr"\nCzech: "cs"\nDanish: "da"\nDutch: "nl"\nEnglish: "en"\nEsperanto: "eo"\nEstonian: "et"\nFilipino: "tl"\nFinnish: "fi"\nFrench: "fr"\nFrisian: "fy"\nGalician: "gl"\nGeorgian: "ka"\nGerman: "de"\nGreek: "el"\nGujarati: "gu"\n"Haitian Creole": "ht"\nHausa: "ha"\nHawaiian: "haw"\nHebrew: "iw"\nHindi: "hi"\nHmong: "hmn"\nHungarian: "hu"\nIcelandic: "is"\nIgbo: "ig"\nIndonesian: "id"\nIrish: "ga"\nItalian: "it"\nJapanese: "ja"\nJavanese: "jw"\nKannada: "kn"\nKazakh: "kk"\nKhmer: "km"\nKorean: "ko"\n"Kurdish (Kurmanji)": "ku"\nKyrgyz: "ky"\nLao: "lo"\nLatin: "la"\nLatvian: "lv"\nLithuanian: "lt"\nLuxembourgish: "lb"\nMacedonian: "mk"\nMalagasy: "mg"\nMalay: "ms"\nMalayalam: "ml"\nMaltese: "mt"\nMaori: "mi"\nMarathi: "mr"\nMongolian: "mn"\n"Myanmar (Burmese)": "my"\nNepali: "ne"\nNorwegian: "no"\nPashto: "ps"\nPersian: "fa"\nPolish: "pl"\nPortuguese: "pt"\nPunjabi: "ma"\nRomanian: "ro"\nRussian: "ru"\nSamoan: "sm"\n"Scots Gaelic": "gd"\nSerbian: "sr"\nSesotho: "st"\nShona: "sn"\nSindhi: "sd"\nSinhala: "si"\nSlovak: "sk"\nSlovenian: "sl"\nSomali: "so"\nSpanish: "es"\nSundanese: "su"\nSwahili: "sw"\nSwedish: "sv"\nTajik: "tg"\nTamil: "ta"\nTelugu: "te"\nThai: "th"\nTurkish: "tr"\nUkrainian: "uk"\nUrdu: "ur"\nUyghur: "ug"\nUzbek: "uz"\nVietnamese: "vi"\nWelsh: "cy"\nXhosa: "xh"\nYiddish: "yi"\nYoruba: "yo"\nZulu: "zu"`; },
        },
        "play": {
            resp: (title, duration) => {return `*Baixando áudio...*\n\n*Título:* ${title}\n\n*Duração:* ${duration}`; }, 
            noVideoFound: () => { return `Não foi possivel encontrar um video correspondente! ❌`; },
        },
        "mi": {
            resp: (resp) => { return `Titulo: ${resp.titulo}\nProdutora: ${resp.produtora}\nDuração: ${resp.duracao}\nLançamento: ${resp.lancamento}\nAlbum: ${resp.album}\nArtistas: ${resp.artistas}`; },
            cantIdentify: () => { return `Ops! Não foi possível identificar a música! ❌`; },
        },
        "video": {
            resp: (title, duration) => {return `*Baixando vídeo...*\n\n*Título:* ${title}\n\n*Duração:* ${duration}`; }, 
            noVideoFound: () => { return `Não foi possivel encontrar um video correspondente! ❌`; },
        },
        "upimg": {
            success: (url) => { return `Link gerado com sucesso!\n\n*Obs:* Este link tem duração de 7 dias, após isso a imagem será automaticamente deletada do servidor!\n\n${url}`; },
        },
        "giveaway": {
            resp: (duration, prize, prefix) => { return `🎉 *SORTEIO* 🎉\n\n*Duração:* ${duration}\n*Prêmio:* ${prize}\nEnvie ${prefix}participar para participar do sorteio!`; },
            noParticipants: () => { return `Não haviam pessoas o suficiente para concluir o sorteio! ❌` },
            winner: (winner) => { return `Parabéns *@${winner.id}* você é o(a) ganhador(a) do sorteio! 🥳🎉`; },
            invalidTime: () => { return `O tempo que você definiu é inválido! ❌\nUtilize: "d" para dia, "h" para hora, "m" para minuto, "s" para segundo!\nExemplo: 10m`; },
            noGiveaway: () => { return `Não existe nenhum sorteio sendo realizado no momento! ⚠️`; },
            wrongUse(cmd) { return `Uso incorreto! Digite *${cmd}* (tempo que irá durar o sorteio) (prêmio)! ❌`; },
            alreadyOnGiveaway: () => { return `Você já está participando do sorteio!`; },
            joinedList: () => { return `Você entrou na lista do sorteio!`; },
        },
        "musicidentify": {
            resp: (resp) => { return `Titulo: ${resp.titulo}\nProdutora: ${resp.produtora}\nDuração: ${resp.duracao}\nLançamento: ${resp.lancamento}\nAlbum: ${resp.album}\nArtistas: ${resp.artistas}`; },
            cantIdentify: () => { return `Ops! Não foi possível identificar a música! ❌`; },
            wrongFormatOrTime: (time, timeType) => { return `Ops! Utilize um áudio ou vídeo com menos de ${time} ${timeType}! ⚠️`; },
        },
        "cot": {
            coins: {
                default_coin: 'Dólar Americano',
                coins: [
                    { coin: 'USD-EUR', emoji: '🇪🇺', name: 'Euro' }, /* EURO */
                    { coin: 'USD-GBP', emoji: '🇬🇧', name: 'Libra Esterlina' }, /* LIBRA */
                    { coin: 'USD-BRL', emoji: '🇧🇷', name: 'Real Brasileiro' }, /* REAL */
                    { coin: 'USD-CHF', emoji: '🇨🇭', name: 'Franco Suíço' }, /* FRANCO */
                    { coin: 'USD-TRY', emoji: '🇹🇷', name: 'Nova Lira Turca' }, /* LIRA TURCA */
                    { coin: 'USD-CAD', emoji: '🇨🇦', name: 'Dólar Canadense' }, /* CANADÁ */
                    { coin: 'USD-AUD', emoji: '🇦🇺', name: 'Dólar Australiano' }, /* AUSTRÁLIA */
                    { coin: 'USD-CNY', emoji: '🇨🇳', name: 'Yuan Chinês' }, /* YUAN */
                    { coin: 'USD-RUB', emoji: '🇷🇺', name: 'Rublo Russo' }, /* RUBLO */
                    { coin: 'USD-JPY', emoji: '🇯🇵', name: 'Iene Japonês' }, /* IENE */
                    { coin: 'USD-ARS', emoji: '🇦🇷', name: 'Peso Argentino' }, /* PESO ARGENTINO */
                    { coin: 'USD-MXN', emoji: '🇲🇽', name: 'Peso Mexicano' }, /* PESO MEXICANO */
                    { coin: 'BTC-USD', emoji: '💻', name: 'Bitcoin' }, /* BTC */
                ],
            },
            resp: (coins) => {
                var _finalStr = "*Cotação atual: 💎💰🤑💹*\n";
            
                coins.forEach((val) => {
                    _finalStr += `\n\n${val}`;
                });
                _finalStr += "\n\n\n_By: Lune Bot_";
                
                return _finalStr;
            },
        },
        "weather": {
            url: (query, key) => { return `http://api.weatherapi.com/v1/current.json?key=${key}&lang=pt&q=${encodeURIComponent(query)}`; },
            resp: ({ current, location }) => {
                var { condition, temp_c, temp_f, is_day, wind_kph, wind_mph, humidity, feelslike_c, feelslike_f, last_updated, precip_mm } = current;
                var { name, region, country, localtime } = location;
                var dayornight_emoji = is_day == 1 ? '☀️' : '🌙';

                var condition = condition.text;

                var conditions = [
                    {
                      "emoji": '☁️',
                      "name": "Céu limpo"
                    },
                    {
                      "emoji": '🌤️',
                      "name": "Parcialmente nublado"
                    },
                    {
                      "emoji": '⛅',
                      "name": "Nublado"
                    },
                    {
                      "emoji": '🌥️',
                      "name": "Encoberto"
                    },
                    {
                      "emoji": '🌫️',
                      "name": "Neblina"
                    },
                    {
                      "emoji": '🌧️',
                      "name": "Possibilidade de chuva irregular"
                    },
                    {
                      "emoji": '🌨️❄️',
                      "name": "Possibilidade de neve irregular"
                    },
                    {
                      "emoji": '🌨️💧',
                      "name": "Possibilidade de neve molhada irregular"
                    },
                    {
                      "emoji": '🌧️❄️',
                      "name": "Possibilidade de chuvisco gelado irregular"
                    },
                    {
                      "emoji": '⛈️',
                      "name": "Possibilidade de trovoada"
                    },
                    {
                      "emoji": '💨🌨️',
                      "name": "Rajadas de vento com neve"
                    },
                    {
                      "emoji": '🌨️🌫️',
                      "name": "Nevasca"
                    },
                    {
                      "emoji": '🌫️',
                      "name": "Nevoeiro"
                    },
                    {
                      "emoji": '🌫️❄️',
                      "name": "Nevoeiro gelado"
                    },
                    {
                      "emoji": '🌧️💧',
                      "name": "Chuvisco irregular"
                    },
                    {
                      "emoji": '💧',
                      "name": "Chuvisco"
                    },
                    {
                      "emoji": '💧❄️',
                      "name": "Chuvisco gelado"
                    },
                    {
                      "emoji": '🌧️💧❄️',
                      "name": "Chuvisco forte gelado"
                    },
                    {
                      "emoji": '🌧️💧',
                      "name": "Chuva fraca irregular"
                    },
                    {
                      "emoji": '🌧️',
                      "name": "Chuva fraca"
                    },
                    {
                      "emoji": '🌧️',
                      "name": "Períodos de chuva moderada"
                    },
                    {
                      "emoji": '🌧️',
                      "name": "Chuva moderada"
                    },
                    {
                      "emoji": '🌧️🌧️',
                      "name": "Períodos de chuva forte"
                    },
                    {
                      "emoji": '🌧️🌧️',
                      "name": "Chuva forte"
                    },
                    {
                      "emoji": '🌧️💧❄️',
                      "name": "Chuva fraca e gelada"
                    },
                    {
                      "emoji": '⛈️❄️',
                      "name": "Chuva gelada moderada ou forte"
                    },
                    {
                      "emoji": '🌧️💧🌨️',
                      "name": "Chuva fraca com neve"
                    },
                    {
                      "emoji": '🌧️🌨️',
                      "name": "Chuva forte ou moderada com neve"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve irregular e fraca"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve fraca"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve moderada e irregular"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve moderada"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve forte e irregular"
                    },
                    {
                      "emoji": '🌨️🌫️',
                      "name": "Neve intensa"
                    },
                    {
                      "emoji": '🧊',
                      "name": "Granizo"
                    },
                    {
                      "emoji": '💧💧',
                      "name": "Aguaceiros fracos"
                    },
                    {
                      "emoji": '💧💧💧',
                      "name": "Aguaceiros moderados ou fortes"
                    },
                    {
                      "emoji": '⛈️🌊',
                      "name": "Chuva torrencial"
                    },
                    {
                      "emoji": '🌊💧🌨️',
                      "name": "Aguaceiros fracos com neve"
                    },
                    {
                      "emoji": '🌊🌨️',
                      "name": "Aguaceiros moderados ou fortes com neve"
                    },
                    {
                      "emoji": '🌧️💧🌨️',
                      "name": "Chuva fraca com neve"
                    },
                    {
                      "emoji": '🌧️🌨️',
                      "name": "Chuva moderada ou forte com neve"
                    },
                    {
                      "emoji": '🌊💧🧊',
                      "name": "Aguaceiros fracos com granizo"
                    },
                    {
                      "emoji": '🌊🧊',
                      "name": "Aguaceiros moderados ou fortes com granizo"
                    },
                    {
                      "emoji": '🌧️💧⚡',
                      "name": "Chuva fraca irregular com trovoada"
                    },
                    {
                      "emoji": '🌧️⚡',
                      "name": "Chuva moderada ou forte com trovoada"
                    },
                    {
                      "emoji": '🌨️💧⚡',
                      "name": "Neve fraca irregular com trovoada"
                    },
                    {
                      "emoji": '🌨️⚡',
                      "name": "Neve moderada ou forte com trovoada"
                    }
                ];

                var pos = -1;
                var found = false;
                for (let i = 0; i < conditions.length; i++) {
                    if (conditions[i].name.toLowerCase() == condition.toLowerCase() && !found) {
                        pos = i;
                        found = true;
                    };
                };

                return `${name}, ${region}, ${country} ${dayornight_emoji}

🌡️ Temperatura: ${temp_c}°C | ${temp_f}°F
🍃 Sensação térmica: ${feelslike_c}°C | ${feelslike_f}°F
💧 Umidade: ${humidity}%
🌧️ Precipitação: ${precip_mm}mm
🔭 Condição: ${conditions[pos].name} ${conditions[pos].emoji}
⏱️ Data e hora: ${localtime} (AAAA/MM/DD hh:mm)

✔️ Última atualização: ${last_updated} (AAAA/MM/DD hh:mm)
_By: Lune Bot_`;
            },
        },
        "welcome": {
            resp: (pushname, name, formattedTitle) => { return `Olá ${pushname}! 🥰 \n\nSeja bem vindo(a) ao grupo: ${name || formattedTitle}\n\nPrazer, eu sou o *Lune Bot*, o assistente virtual deste grupo! 😉\n\nDesejamos que se divirta e obviamente que siga nossas regras! ✅ \n\nCaso precise, chame um administrador ou envie *#menu*! 👨🏻‍💻`; },
            alreadyOn: () => { return `As mensagens de Boas-Vindas já estão ativadas! ⚠️`; },
            alreadyOff: () => { return `As mensagens de Boas-Vindas já estão desativadas! ⚠️`; },
            enable: () => { return `As mensagens de Boas-Vindas foram ativadas! ✅`; },
            disable: () => { return `As mensagens de Boas-Vindas foram desativadas! ✅`; },
        },
        "antilink": {
            alreadyOn: () => { return `O Anti-Link já está ativado! ⚠️`; },
            alreadyOff: () => { return `O Anti-Link já está desativado! ⚠️`; },
            enable: () => { return `O Anti-Link foi ativado! ✅`; },
            disable: () => { return `O Anti-Link foi desativado! ✅`; },
        },
        "autostk": {
            alreadyOn: () => { return `O Auto-Sticker já está ativado! ⚠️`; },
            alreadyOff: () => { return `O Auto-Sticker já está desativado! ⚠️`; },
            enable: () => { return `O Auto-Sticker foi ativado! ✅`; },
            disable: () => { return `O Auto-Sticker foi desativado! ✅`; },
        },
        "comment": {
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem e ao lado (nome) | (frase)! ❌`; },
        },
        "onlyadmins": {
            on: () => { return `Somente administradores podem interagir e conversar! 🚫`; },
            off: () => { return `Agora todos os membros podem interagir e conversar! ✅`; },
        },
        "ddd": {
            resp: (outDDD) => { return `Informações do DDD (${outDDD.ddd})\n=========\nEstado: ${outDDD.state}\n=========`; },
            cantFind: () => { return `Ops! O DDD informado é invalido! ❌`; },
        },
        "ip": {
            resp: (ip) => { return `http://www.google.com/maps/place/${ip.data.latitude},${ip.data.longitude}\n\n✪ IP: ${ip.data.ip}\n\n✪ Tipo: ${ip.data.type}\n\n✪ Região: ${ip.data.region}\n\n✪ Cidade: ${ip.data.city}\n\n✪ Latitude: ${ip.data.latitude}\n\n✪ Longitude: ${ip.data.longitude}\n\n✪ Provedor: ${ip.data.isp}\n\n✪ Continente: ${ip.data.continent}\n\n✪ Sigla do continente: ${ip.data.continent_code}\n\n✪ País: ${ip.data.country}\n\n✪ Sigla do País: ${ip.data.country_code}\n\n✪ Capital do País: ${ip.data.country_capital}\n\n✪ DDI: ${ip.data.country_phone}\n\n✪ Países Vizinhos: ${ip.data.country_neighbours}\n\n✪ Fuso Horário: ${ip.data.timezone} ${ip.data.timezone_name} ${ip.data.timezone_gmt}\n\n✪ Moeda: ${ip.data.currency}\n\n✪ Sigla da Moeda: ${ip.data.currency_code}\n\n-=Busca de IP realizada por Lune Bot=-`; },
            notfound: () => { return `Não foi possivel encontrar o IP especificado. ❌`; },
        },
        "translate": {
            noLang: () => { return `Me desculpe, mas não foi possivel encontrar esta linguagem! ❌\n\nVocê pode encontrar a lista de linguagens aqui:\nhttps://anotepad.com/note/read/5xqahdy8`; },
        },
        "cep": {
            resp: (cepPP) => { return `https://www.google.com/maps/place/${cepPP.location.coordinates.latitude},${cepPP.location.coordinates.longitude}\n\nCEP: ${cepPP.cep}\nRua: ${cepPP.street}\nBairro: ${cepPP.neighborhood}\nCidade: ${cepPP.city}\nEstado: ${cepPP.state}\nLatitude: "${cepPP.location.coordinates.latitude}"\nLongitude: "${cepPP.location.coordinates.longitude}"\n\n_By: Lune Bot_`; },
            invalidCep: () => { return `Ops! O CEP informado é inválido! ❌`; },
        },
        "promote": {
            promote: (user) => { return `@${user} agora é um(a) administrador(a) do grupo! ✅`; },
            alreadyAdmin: () => { return `Este usuário já é um(a) administrador(a) do grupo! ⚠️`; },
            cantPromoteBot: () => { return `Desculpe, não posso me promover! ❌`; },
        },
        "lyrics": {
            noLyrics: () => { return `Ops! Não foi possível encontrar a letra da música! ❌`; },
        },
        "demote": {
            demote: (user) => { return `@${user} não é mais um(a) administrador(a) do grupo! ✅`; },
            alreadyDemoted: () => { return `Desculpe, o usuário não é um administrador!`; },
            cantSelfDemote: () => { return `Desculpe, não posso me rebaixar! ❌`; },
        },
        "join": {
            joined: () => { return `O Bot Juntou-se ao grupo! ✅`; },
        },
        "readqr": {
            cantread: () => { return `Ops! Não foi possivel encontrar um QR code nesta imagem! ❌`; },
        },
        "scan": {
            scanning: () => { return `🔎 Escaneando...`; },
            tooBig: () => { return `Ops! Não foi possível concluir! O arquivo é maior que 32MB! ❌`; },
            returnURL: (oScanUrl, spam, malware, suspicious, unsafe, adult, risk) => { return `Dominio: ${oScanUrl.domain}\n*Endereço IP:* ${oScanUrl.ip_address}\n*Spam:* ${spam}\n*Malware:* ${malware}\n*Suspeito:* ${suspicious}\n*Não Seguro:* ${unsafe}\n*+18:* ${adult}\n\n*Nivel de risco:* ${risk}`; },
            resp: (result) => {
                var safe = result.positives;
                var estado = '✅ = Seguro';
                if (safe >= 1 && safe < 25) {
                    estado = '⚠️ = Suspeito';
                } else if (safe >= 25) {
                    estado = '⛔ = Perigoso';
                };
                return `🔎 - ARQUIVO ESCANEADO - 🔎\n🔎 - COM SUCESSO - 🔎\n---------------------------------------------------------\nINFO:\n✅ = 0 suspeitas\n⚠️ = 1 a 25 suspeitas\n⛔ = 26 a 74 suspeitas\n---------------------------------------------------------\n\nDetectados: ( ${result.positives} / 74 )\n${estado}`;
            },
        },
        "prefix": {
            tooBig: () => { return `Ops! O prefixo deve possuir apenas um caractere! ⚠️`; },
            cantBeUsed: (prefix) => { return `Ops! O caractere *"${prefix}"* não pode ser usado como prefixo! ❌`; },
            actual: (prefix) => { return `O prefixo atual deste chat é: *"${prefix}"* ⚠️`; },
            changed: (prefix) => { return `O prefixo foi alterado para: *"${prefix}"* ✅`; },
        },
        "setlang": {
            unsuported: () => { return `Ops! O idioma especificado não é suportado! Escolha entre "pt_BR", "en_US" e "es_ES"! ⚠️`; },
            alreadyDefault: () => { return `Seu idioma já está definido como padrão! ⚠️`; },
            alreadyDefined: (langusr) => { return `Seu idioma atual já é "${langusr}"! ✅`; },
            resp: (old, now) => { return `Idioma alterado de "${old}" para "${now}" com sucesso! ✅`; },
            respdefault: () => { return `Seu idioma foi definido como padrão! ✅`; },
        },
        "mylang": {
            resp: (langusr) => { return `Seu idioma atual é "${langusr}"!`; },
        },
        "stop": {
            resp: () => { return `Reiniciando sistema... 💾`; },
        },
    },
    "en_US": {
        responseTime: (time) => { return `Response Time: ${time}ms`; },
        onlyAdmins: () => { return `Sorry, this command can only be used by group admins! ❌`; },
        onlyGroups: () => { return `Sorry, this command can only be used in groups! ❌`; },
        onlyNum: () => { return `Sorry, but the message must be a number! ⚠️`; },
        onlyText: () => { return `Sorry, but the message must be a text! ⚠️`; },
        somethingWentWrong: () => { return `Oops! Something went wrong! ❌`; },
        somethingWentWrongConversion: () => { return `Oops! Something went wrong during the conversion! ❌`; },
        stickerMetadataImg: (keepScale) => { return { author: '+55 (16) 99787-2383', pack: 'Lune Bot', keepScale: keepScale }; },
        stickerMetadataVideo: (fps, end, keepScale, crop) => { return { stickerMetadata: true, author: '+55 (16) 99787-2383', pack: 'Lune Bot', fps: fps, startTime: '00:00:00.0', endTime : end, crop: crop, loop: 0, keepScale: keepScale }; },
        lang: () => { return `en`; },
        maxText: (max) => { return `Sorry, but the message cannot be longer than ${max} characters! ⚠️`; },
        maxCustom: (maxT) => { return `Sorry, but the message cannot be longer than ${maxT}! ⚠️`; },
        maxDuration: (max, maxType, mediaType) => {
            switch (maxType) {
                case 's':;
                    maxType = "second(s)";
                break;
                case 'm':;
                    maxType = "minute(s)";
                break;
                case 'h':;
                    maxType = "hour(s)";
                break;    
                case 'ms':;
                    maxType = "millisecond(s)";
                break;
                case 'd':;
                    maxType = "day(s)";
                break;
            };
            mediaType = mediaType == 'aud' ? "audio" : "video"; return `Ops! The ${mediaType} has limit up to ${max} ${maxType}! ⚠️`;
        },
        botIsntAdmin: () => { return `To use this command, I need to be a group admin! ⚠️`; },
        invalidOptions: (validOptions) => { var $ = `Choose a valid option! ⚠️\nList of options:`; validOptions.forEach((option) => { $ += `\n${option}`; }); return $; },
        cantfind: (arg) => { return `Oops! could not find ${arg}! ❌`; },
        onOrOff: () => { return `Set between "on" and "off"! ⚠️`; },
        isntURL: () => { return `This is not a URL! ❌`; },
        invalidURL: () => { return `Oops! Invalid link! ❌`; },
        invalidDDD: () => { return `Oops! Invalid area code! ❌`; },
        minTries: (min) => { return `Put a minimum of ${min} attempts! ⚠️`; },
        maxTries: (max) => { return `Put a maximum number of attempts up to ${max}! ⚠️`; },
        getMounth: (mounth) => { switch (mounth) { case '01':; return "January"; case '02':; return "February"; case '03':; return "March"; case '04':; return "April"; case '05':; return "May"; case '06':; return "June"; case '07':; return "July"; case '08':; return "August"; case '09':; return "September"; case '10':; return "October"; case '11':; return "November"; case '12':; return "December"; }; },
        noSpecialCharacters: () => { return `Hey, don't use special characters! ⚠️`; },
        noEmojiFound: () => { return `No emoji found!`; },
        noResultFound: () => { return `No results found!`; },
        yes: () => { return `Yes`; },
        no: () => { return `No`; },
        "wrongUse": {
            default: (cmd) => { return `Incorrect usage! use *${cmd}*! ❌`; },
            defaultArgs: (cmd, args) => { return `Incorrect usage! Use *${cmd}* <${args.join('> <').replace(/ </g, '')}>!`; },
            quotingMessage: (cmd) => { return `Incorrect usage! Use *${cmd}* replying a message! ❌`; },
            quotingMessageOrAtSide: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside the text or replying a message! ❌`; },
            quotingImage: (cmd) => { return `Incorrect usage! Use *${cmd}* tagging an image! ❌`; },
            quotingImageOrAsBody: (cmd) => { return `Incorrect usage! Use *${cmd}* replying an image or as a caption! ❌`; },
            quotingVideo: (cmd) => { return `Incorrect usage! Use *${cmd}* replying a video! ❌`; },
            quotingImageOrVideoOrGIF: (cmd) => { return `Incorrect usage! Use *${cmd}* replying an image, video or GIF! ❌`; },
            quotingAudioOrVideo: (cmd) => { return `Incorrect usage! Use *${cmd}* replying an audio or video! ❌`; },
            quotingText: (cmd) => { return `Incorrect usage! Use *${cmd}* replying a text! ❌`; },
            quotingSticker: (cmd) => { return `Incorrect usage! Use *${cmd}* replying a sticker! ❌`; },
            quotingAudio: (cmd) => { return `Incorrect usage! Use *${cmd}* replying an audio! ❌`; },
            quotingFile: (cmd) => { return `Incorrect usage! Use *${cmd}* replying a file! ❌`; },
            quotingMyMessage: (cmd) => { return `Incorrect usage! Use *${cmd}* replying a message from me! ❌`; },
            quotingImageOrAsBody: (cmd) => { return `Incorrect usage! Use *${cmd}* replying an image or use it as a caption! ❌`; },
            quotingMessageAndTimeInMinutes: (cmd) => { return `Incorrect usage! Use *${cmd}* replying a message and beside the time in minutes! ❌`; },
            quotingMessageOrTagSomeone: (cmd) => { return `Incorrect usage! Use *${cmd}* replying a message or mentioning someone! ❌`; },
            andLocal: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a local! ❌`; },
            andPhrase: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a phrase! ❌`; },
            addMusicName: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a song name! ❌`; },
            andTagAndVal: (cmd) => { return `Incorrect usage! Use *${cmd}* and on the side mark the person who wants to give XP and on the side enter the value! ❌`; },
            andChar: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a character! ❌`; },
            andLink: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a link! ❌`; },
            andLinkOrQuotingFile: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a link or replying a file! ❌`; },
            andName: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a name! ❌`; },
            andText: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a text! ❌`; },
            andCep: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a CEP! ❌`; },
            andDDD: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a DDD! ❌`; },
            andAudioAndEffect: (cmd) => { return `Incorrect usage! Use *${cmd}* replying an audio and next to the effect!\n\nList of supported effects:\nexplode - 2x - reverse - bass - acute - volume - nightcore - lofi - bathroom - slow`; },
            andSearch: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside what you want to search for! ❌`; },
            andPokemon: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a Pokémon name!`; },
            andVideoName: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside the name of the video!`; },
            andGroupLink: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside the group link! ❌`; },
            andSeed: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside the seed! ❌`; },
            andPrompt: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside the prompt! ❌`; },
            twoWords: (cmd) => { return `Incorrect usage! Use *${cmd}* replying an image and beside (word1) | (word2)! ❌`; },
            useNumber: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside a number <XXXXXXXXXXX>! ❌`; },
            tagTwoPeople: (cmd, separator) => { return `Incorrect usage! Use *${cmd}* (user n1) ${separator} (user n2)! ❌`; },
            tagSomeone: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside mention someone! ❌`; },
            axp: (cmd) => { return `Incorrect usage! Use *${cmd}* replying the person you want to give or remove XP and next to the value! ❌`; },
            roll: (cmd) => { return `Incorrect usage! Use *${cmd}* <N° of dice>d<N° of sides of the dice>+<proficiency (optional)>!`; },
            ppt: (cmd) => { return `Incorrect usage! Use *${cmd}* and a choice\n\n*(Choose between ROCK, PAPER, SCISSORS)*`; },
            setlang: (cmd) => { return `Incorrect usage! Use *${cmd}* and the language you want to use! ❌\n\n*("en_US", "es_ES", "pt_BR")*`; },
        },
        "menu": {
            onlyPv: () => { return `Sorry, but this menu is only available in private chat!`; },
            dontExist: () => { return `Sorry, but this menu doesn't exist!`; },
        },
        "messages": {
            thanks: () => { return `Thanks... 🥰`; },
            enabled: () => { return `Enabled ✅`; },
            disabled: () => { return `Disable ❌`; },
            noName: () => { return `No name. ❌`; },
            noDesc: () => { return `No description. ❌`; },
            noResults: () => { return `No results found! ❌`; },
            linksAreNotAllowed: () => { return `Links are not allowed in this group! ❌`; },
            calledMe: () => { return `Called me? ☺️✨`; },
            happyFace: () => { return `;D`; },
            needHelp: (prefix) => { return `Need help? Send *${prefix}menu* for more information! 😉`; },
            cute: () => { return `🥰`; },
            actualPrefix: (prefix) => { return `The current prefix of this chat is:*"${prefix}"*`; },
        },
        "kick": {
            removedUser: () => { return `User removed! ✅`; },
            areYouBanned: (banUser) => { return `You have been banned! 🚫\n${banUser}`; },
            youCantKickMe: () => { return `Why would I do that? 🤨`; },
            cantBanAdmin: () => { return `Sorry, you can't kick a group admin! ⚠️`; },
            cantBanOwner: () => { return `Permission denied! I can't banish my creator! ⛔`; },
            userIsntOnGroup: () => { return `The user is not in the group! ⚠️`; },
        },
        "ek": {
            maxEmojis: (max) => { return `Use a maximum of ${max} emojis!`; },
            dontCombine: () => { return `Oops! These emojis don't match!`; },
            wrongUse: (cmd) => { return `Incorrect usage! Type *${cmd}* <emoji> <emoji> _(note: there must be a space between emojis) ❌_`; },
        },
        "xp": {
            onlyGroupsWithXp: () => { return `This command can only be used in groups with XP system!`; },
            cantGiveMoreThanYouHave: () => { return `You cannot give away more XP than you have! ❌`; },
            cantUseMinus: () => { return `Sorry but you cannot steal another user :P`; },
            give: (gived, give, xpNow, xpNowGv) => { return `You transferred ${gived} XP to @${give}!\nPrevious XP: ${xpNow}\nCurrent XP: ${xpNowGv}`; },
            axp: (user, give) => { return `Changed ${give} XP to ${user}!`; },
            tagGive: (cmd) => { return `You must mention the person you want to transfer your XP to!\nExample:\n*${cmd}* @Fox 10`; },
            xpIsOff: () => { return `To use this and more commands, activate the XP system in the group!`; },
            xpOff: () => { return `This group will no longer be part of the XP system!`; },
            xpOn: () => { return `This group is now part of the XP system!`; },
            xpAlreadyOn: () => { return `The XP system is already active in the group!`; },
            level: (pushname, xp, thexpnde, uzerlvl, patente) => { return `*「 LEVEL 」*\n\n🖊️ *NAME:* ${pushname}\n💠 *XP:* ${xp} / ${thexpnde}\n📊 *Level:* ${uzerlvl}\n🧙‍♂️ *Class:* ${patente}`; },
            insuficientXpToUp: () => { return `You don't have enough XP to level up!`; },
            forceUp: (pushname, xp, requiredXp, lvl, role, amount) => { `*「 FORCEUP 」*\n\n🖊️ *NAME:* ${pushname}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Level:* ${lvl}\n🧙‍♂️ *Classs:* ${role}\n\n_*You leveled up "${amount}" ${(amount-1) == 0 ? "time" : "times"}!*_`; },
            tiersTop: () => {  return `*RANK:*\n\n`; },
            tiers: (patent, emoji, lvl) => {  return `${patent} ${emoji} - (Required level: ${lvl})\n\n`; },
            finalMsgTiers: (usr, lvl, xp, requiredXp) => { return `*User:* ${usr}\n*Level:* ${lvl}\n*XP:* ${xp}/${requiredXp}`; },
            actualChance: (chance) => { return `☘️ Current luck: ${chance}%`; },
            newLevel: (name, xp, requiredXp, lvl, role) => { return  `*「 NEW LEVEL 」*\n\n🖊️ *NAME:* ${name}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Level:* ${lvl}\n🧙‍♂️ *Class:* ${role}\n\n_*The more you interact in the group, the higher your level!*_`; },
        },
        "games": {
            rwin: (win) => { return `Saved! You didn't get shot and you won ${win} XP!`; },
            rlose: (lose) => { return `Bang! You lost at Russian roulette, causing a loss of ${lose} XP!`; },
            cwin: ({ e1, e2, e3 }, win) => { return `WON!\n[--------------------]\n${e1} - ${e2} - ${e3}\n[--------------------]\n\nYou Won ${win} XP!`; },
            close: ({ e1, e2, e3 }, lose) => { return `LOOSE!\n[--------------------]\n${e1} - ${e2} - ${e3}\n[--------------------]\n\nYou Loose ${lose} XP!`; },
            tooLowXp: (min, usrxp) => { return `You don't have a license to play, get one when you have ${min} XP!\n\nYou have ${usrxp} XP!`; },
            specifyAmount: () => { return `Especifique a quantidade de XP para apostar!`; },
            onlyNum: () => { return `To bet use only numbers, no entering letters, unless you want to lose all the XP you have!`; },
            tooHighVal: (usrxp, max) => { return `You cannot bet more XP than you have, and our betting limit is ${max} XP at a time!\n\nYou have ${usrxp} XP!`; },
            tooLowVal: (min) => { return `Sorry, but you cannot bet less than ${min} XP!`; },
        },
        "exitgame": {
            on: () => { return `You will now be able to receive XP again!`; },
            off: () => { return `You will no longer receive XP now!`; },
            alreadyOn: () => { return `XP is already activated for you!`; },
            alreadyOff: () => { return `XP is already disabled for you!`; },
        },
        "profile": {
            resp: (usr, adm, estadoCivil, lvl, xp, xpRequired, role, isxp) => { return `*Profile data..* ✨️ \n\n🔖️ *Username:*\n${usr}\n\n👑️ *Administrator?*\n${adm}\n\n💕 *Marital status*: \n${estadoCivil}\n\n📈 *Level:*\n${isxp ? lvl : "XP System Disabled"}\n\n🕹️ *XP:*\n${isxp ? xp+"/"+xpRequired : "XP System Disabled"}\n\n🌐 *Rank:*\n${isxp ? role : "XP System Disabled"}`; },
            marriagedWith: (usr) => { return `Married to @${usr}`; },
        },
        "sys": {
            time: (h, m, s) => { return `${h} hours | ${m} minutes | ${s} seconds - HH:MM:SS`; },
            mem: (gb, mb, kb, allram) => { return `${gb}GB | ${mb}MB | ${kb}KB | ${allram} Bytes`; },
            resp: (speed, loadedMsgs, groups, chatIds, uptime, pcUptime, cpu, cpuSpeed, os, osArch, osPlatform, osRelease, ram, username, hostname, zapVer, owaVer) => { return `🐌 - Speed ​​> ${speed} seconds\n\n📊 - ${loadedMsgs} Messages after start\n\n📱 - ${groups.length} Group chats\n\n👥 - ${chatIds.length - groups. length} PV Conversations\n\n📈 - ${chatIds.length} Total Chats\n\n⌛ Bot Uptime - ${uptime}\n\n💻​ PC Uptime - ${pcUptime}\n\n🌡️ CPU - ${cpu} (${cpuSpeed} MHz)\n\n🖥️ OS - ${os} - ${osArch} (${osPlatform} V. ${osRelease})\n\n💾 RAM - ${ ram}\n\n👑 Username - ${username} (${hostname})\n\n🪀 WhatsApp - Version ${zapVer}\n\n📡 Open-WA - Version ${owaVer}`/*\n\n🔋 Bateria do Telefone - ${botBat}\n\n🔌 Telefone carregando? - ${isEnergy ? 'Sim' : 'Não'}`*/; },
        },
        "death": {
            resp: (name, deathAge) => { return `People with the name "${name}" tend to die at ${deathAge} years of age!`; },
        },
        "ping": {
            resp: (speed, uptime) => { return `🏓 *PONG!*\n\n⏳ Ping: ${speed}ms\n\n⏳ Online Time: ${uptime}`; },
        },
        "anime": {
            noResults: () => { return `No results found! ❌`; },
            wrongUse: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside the name of the anime! ❌`; },
            inDev: () => { return `(Em desenvolvimento)`; },
            resp: (val) => { return `✨ Title: ${val.title}\n\n🎆 Episodes: ${val.episodes}\n\n💌 Rating: ${val.rating}\n\n${val.status ? `⚠️ Status: ${val.status}\n\n` : ''}🕑 Duration: ${val.duration}\n\n❤️ Score: ${val.score}\n\n${val.synopsis ? `💚 Synopsis: ${val.synopsis}\n\n` : ''}🌐 Link: ${val.url}`; },
        },
        "manga": {
            noResults: () => { return `No results found! ❌`; },
            wrongUse: (cmd) => { return `Incorrect usage! Use *${cmd}* and beside the name of the mangá! ❌`; },
            inDev: () => { return `(Under development)`; },
            resp: (val) => { return `✨ Title: ${val.title}\n\n🎆 Chapters: ${val.chapters}\n\n💌 Volumes: ${val.volumes}\n\n${val.status ? `⚠ Status: ${val.status}\n\n` : ''}❤️ Grade: ${val.score}\n\n${val.synopsis ? `💚 Synopsis: ${val.synopsis}\n\n` : ''}🌐 Link: ${val.url}`; },
        },
        "emo": {
            resp: (percent) => {
                if (percent == 100) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nYou are ${percent}% Emo!\n\nSuprme Emo!`;
                } else if (percent == 101) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nYou are SUPREME% Emo!\n\nHYPER MEGA EMO!`;
                } else if (percent == 0) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nYou are ${percent}% Emo!\n\ncommon guy...`;
                } else if (percent == 25) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nYou are ${percent}% Emo!\n\nNeeds more black makeup!`;
                } else if (percent == 50) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nYou are ${percent}% Emo!\n\nAre you emo or not? Make up your mind!`;
                } else if (percent == 75) {
                    `🖤-> *Emo-o-metter* <-🖤\n\nYou are${percent}% Emo!\n\nMega Emo!`;
                } else {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nYou are ${percent}% Emo!`;
                };
            },
        },
        "gay": {
            resp: (percent) => {
                if (percent == 100) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nYou are ${percent}% Gay!\n\nSupreme Gay!`;
                } else if (percent == 101) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nYou are SUPREME% Gay!\n\nHYPER MEGA GAY!`;
                } else if (percent == 0) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nYou are ${percent}% Gay!\n\nTotally straight!`;
                } else if (percent == 25) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nYou are ${percent}% Gay!\n\nYou can improve!`;
                } else if (percent == 50) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nYou are ${percent}% Gay!\n\nOk!`;
                } else if (percent == 75) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nYou are ${percent}% Gay!\n\nMega gay!`;
                } else {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nYou are ${percent}% Gay!`;
                };
            },
        },
        "corno": {
            resp: (percent) => {
                if (percent === 100) {
                    return `🐂-> *Simp-o-metter* <-🐂\n\nYou are${percent}% Simp!!\n\nSupreme Simp -(->x🐂x<-)-`;
                } else if (percent == 101) {
                    return `🐂-> *Simp-o-metter* <-🐂\n\nYou are SUPREME% Simp!`;
                } else if (percent == 0) {
                    return `🐂-> *Simp-o-metter* <-🐂\n\nYou are ${percent}% Simp!`;
                } else if (percent == 25) {
                    return `🐂-> *Simp-o-metter* <-🐂\n\nYou are ${percent}% Simp!`;
                } else if (percent == 50) {
                    return `🐂-> *Simp-o-metter* <-🐂\n\nYou are ${percent}% Simp!`;
                } else if (percent == 75) {
                    return `🐂-> *Simp-o-metter* <-🐂\n\nYou are ${percent}% Simp!`;
                } else {
                    return `🐂-> *Simp-o-metter* <-🐂\n\nYou are ${percent}% Simp!`;
                };
            },
        },
        "fofo": {
            resp: (percent) => {
                if (percent === 100) {
                    return `🌟-> *Cute-o-metter* <-🌟\n\nYou are ${percent}% Cute!\n\nSUPER CUTE! 🌟🌟🌟🌟🌟`;
                } else if (percent == 0) {
                    return `🌟-> *Cute-o-metter* <-🌟\n\nYou are ${percent}% Cute!\n\n... 🌟`;
                } else if (percent == 25) {
                    return `🌟-> *Cute-o-metter* <-🌟\n\nYou are ${percent}% Cute!\n\nCute 🌟🌟;^;`;
                } else if (percent == 50) {
                    return `🌟-> *Cute-o-metter* <-🌟\n\nYou are ${percent}% Cute!\n\nCute 🌟🌟🌟`;
                } else if (percent == 75) {
                    return `🌟-> *Cute-o-metter* <-🌟\n\nYou are ${percent}% Cute!\n\nVery Cute 🌟🌟🌟🌟`;
                } else {
                    return `🌟-> *Cute-o-metter* <-🌟\n\nYou are ${percent}% Cute!`;
                };
            },
        },
        "pokedex": {
            dontExistPokemon: () => { return `Sorry, but this pokemon doesn't exist!\n\nIf it does, check if it's spelled correctly!`; },
            resp: async(pk, translate) => {
                var txtPoke = {
                    nm: '*Name*: ' + (pk.name.split('')[0].toUpperCase()+pk.name.slice(1)),
                    desc: '*Description:*\n'+pk.description,
                    typ: '*Type:* '+pk.type,
                    gr: '*Generation:* '+pk.generation,
                    egg: '*Egg group:* '+pk.egg_groups.join(' - ').replace(/ - $/, ''),
                    stt: '*Status:*\nHP: '+pk.stats.hp+'\nAttack: '+pk.stats.attack+'\nDefense: '+pk.stats.defense+'\nSP Attack: '+pk.stats.sp_atk+'\nSP Defense: '+pk.stats.sp_def+'\nSpeed: '+pk.stats.speed+'\nTotal: '+pk.stats.total,
                    fml: '*Evolution:* '+pk.family.evolutionStage+'',
                    gend: '*Gender:*\n'+(pk.gender.join(', ').replace(/, $/, '')),
                    hab: '*Abilities:* '+pk.abilities.join(' - ').replace(/ - $/, ''),
                    tam: '*Height:* '+pk.height,
                    pes: '*Weight:* '+pk.weight,
                    esp: '*Category:* '+(pk.species.join(', ').replace(/, $/, '')),
                }
                return `*---POKEDEX---*\n\n🗒️ ${txtPoke.nm}\n\n📃 ${txtPoke.desc}\n\n🔎 ${txtPoke.typ}\n\n🗓️ ${txtPoke.gr}\n\n🥚 ${txtPoke.egg}\n\n🧮 ${txtPoke.stt}\n\n📶 ${txtPoke.fml}\n\n⚧️ ${txtPoke.gend}\n\n⚔️ ${txtPoke.hab}\n\n📐 ${txtPoke.tam}\n\n⚖️ ${txtPoke.pes}\n\n🧬 ${txtPoke.esp}`;
            },
        },
        "marriage": {
            alreadySentRequest: () => { return `You have already sent a marriage proposal to this user! ⚠️`; },
            divorce: (usr1, usr2) => { return `@${usr1} got divorced from @${usr2}!`; },
            marryRequest: (usr1, usr2) => { return `@${usr1} sent a marriage proposal to @${usr2}!`; },
            alreadyMarried: () => { return `This user is already married to someone else!`; },
            tagSomeone: (cmd) => { return `You must tag someone who sent you a marriage request to accept. Use *${cmd}* @username`; },
            thatPersonDontSendYouARequest: () => { return `This person has not sent you a marriage proposal!`; },
            noOneSentYouARequest: () => { return `Nobody sent you a marriage proposal!`; },
            cantMarryTwoOrMore: (prefix) => { return `You cannot marry more than one person!\n\nIf you want to end your current marriage send *${prefix}divorce*`; },
            cantSelfMarry: () => { return `Sorry but you can't marry yourself`; },
            cantMarryBot: () => { return `Are you trying to win me over?`; },
            fmarry: (usr1, usr2) => { return `@${usr1} was forced to marry @${usr2}!`; },
            alone: () => {  return `Single`; },
            youArentMarried: () => { return `You are not married to anyone!`; },
            thisUserArentMarried: () => { return `It appears this user is not married yet!`; },
            couple: (req, usr1, usr2, time) => { return `Hi @${req}, User @${usr1} has been married to @${usr2} for ${time} days!`; },
            selfCouple: (req, usr1, time) => { return `Hi @${req}, you've been married to @${usr1} for ${time} days!`; },
            dontMarriedToDivorce: () => { return `You are not married to anyone to divorce!`; },
            marry: (usr1, usr2, day, mounth, year) => {
                return ``+
                `═════════「💍」═════════\n`+
                `          Wedding certificate \n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `This document officially certifies\n`+
                `🌹@${usr1} & 🌷@${usr2}\n`+
                `are united in the sacred bond of matrimony.\n`+
                `\n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `_Marriage is more than going up on an altar and Proclaiming love forever._\n`+
                `_Marriage is more than exchanging "toothbrushes", as they say, lately._\n`+
                `_Marriage is concrete proof that love is an art._\n`+
                `_And somehow today, I always want to marry you..._\n`+
                `_For me this love is different, it's not past paper, it's present paper love._\n`+
                `\n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `        Marriage Held on ${day},\n`+
                `             ${mounth}, ${year}\n\n`+
                `               By: *Lune Bot*\n`+
                `\n`+
                `═════════「💍」═════════`;
            },
        },
        "top10": {
            top: () => { return `--[ *TOP 10 PLAYERS* ]--\n\n`; },
            insuficientPlayers: (min) => { return `We don't have ${min} players yet, try again later!`; },
            resp: (pos, usr, xp, lvl, role) => { return `${pos}. ${usr}\n➸ *XP*: ${xp}\n➸ *Level*: ${lvl}\n➸ *Rank*: ${role}\n\n`; },
        },
        "meme": {
            wrongUse: (cmd) => { return `Incorrect use! Use *${cmd}* marking an image and beside it (phrase1) | (sentence2)! ❌`; },
        },
        "groupinfo": {
            info: ({groupname, totalMem, welgrp, lzex, xpgp, autostk, prefix, desc, gpOwner, admgp}) => { return `*${groupname}*\n\n*Number of Members: ${totalMem}*\n\n*Welcome: ${welgrp}*\n\n*Anti-Link: ${lzex}*\n\n*XP: ${xpgp}*\n\n*Autosticker: ${autostk}*\n\n*Prefix: ${prefix}*\n\n______________________________\n*Description:*\n ${desc}\n______________________________\n\n*Owner:* @${ gpOwner.replace("@c.us", "")}\n\n*Administrators:*\n${admgp}`; },
        },
        "roll": {
            minAndMaxProeficiency: (min, max) => { return `The proficiency number must be up to ${max}! And greater than ${min}!`; },
            minDices: (min) => { return `The amount of dice must be at least ${min}!`; },
            minFaces: (min) => { return `The number of sides of the dice must be at least ${min}!`; },
            maxDices: (max) => { return `The amount of dice to be rolled must be up to ${max}!`; },
            maxFaces: (max) => { return `The number of sides of the dice to be rolled must be up to ${max}!`; },
            onlyNatural: () => { return `Use only natural numbers!`; },
        },
        "add": {
            successfullyAdded: (user) => { return `User @${user} added! ✅`; },
            alreadyOnGroup: () => { return `The user is already in the group! ⚠️`; },
            alreadyInvited: () => { return `The user has already been invited! ⚠️`; },
            noPermissions: () => { return `This user does not allow to be added to groups! Therefore, I will send an invite link! ⚠️`; },
            invalidNumber: () => { return `This number does not exist!`; },
            cantAdd: () => { return `Oops! Unable to add user to group! ❌`; },
        },
        "ppt": {
            selectValidOption: () => { return `Choose a valid option!`; },
            win: (emojiUsr, emojiBot) => { return `You won! You chose ${emojiUsr} and I chose ${emojiBot}!` },
            tie: (emojiUsr, emojiBot) => { return `Draw! You chose ${emojiUsr} and I chose ${emojiBot}!` },
            lose: (emojiUsr, emojiBot) => { return `You loose! You choose ${emojiUsr} and I choose ${emojiBot}!` },
        },
        "emoji": {
            onlyOneEmoji: () => { return `Sorry, only send one emoji at a time!`; },
        },
        "antispam": {
            ban: () => { return `*⚠️ WARNING ⚠️*\n\nAnti-spam system enabled!\n\nFor the next 24 hours you will not be able to interact with me!"`}
        },
        "slap": {
            resp: (usr1, usr2) => { return `@${usr1} slapped ${usr2}!`; },
            noUser: () => { return `Incorrect usage! Use *slap @user*! ❌`; },
            self: (user) => { return `@${user} slapped itself!`; },
        },
        "sleep": {
            resp: (user) => { return `@${user} is sleeping!`; },
        },
        "gift": {
            doYouWin: (usr, gift) => { return `${usr}, you will get ${gift} for your birthday!\n\nCongratulations!`; },
        },
        "wakeup": {
            resp: (user) => { return `@${user} woke up!`; },
        },
        "hug": {
            resp: (usr1, usr2) => { return `@${usr1} hugged @${usr2}!`; },
            self: (user) => { return `@${user} hugged!`; },
        },
        "kiss": {
            resp: (usr1, usr2) => { return `@${usr1} kissed ${usr2}!`; },
            self: (user) => { return `@${user} kissed itself!`; },
        },
        "kill": {
            resp: (usr1, usr2) => { return `@${usr1} killed ${usr2}!`; },
            self: (user) => { return `@${user} committed suicide!`; },
        },
        "gender": {
            resp: (gender, name) => { return `The name "${name}" is most used by ${gender}!`; },
            female: () => { return `women`; },
            male: () => { return `men`; },
        },
        "ship": {
            resp: (usr1, usr2, percent) => {
                if (percent == 100) {
                    return `💞 ${usr1} & ${usr2} 💞\nAnd the result is:\n${percent}%\nThe two were made for each other!💖`;
                } else if (percent == 50) {
                    return `💞 ${usr1} & ${usr2} 💞\nAnd the result is:\n${percent}%\nHalf and half... 🥀`;
                } else if (percent == 0) {
                    return `💞 ${usr1} & ${usr2} 💞\nAnd the result is:\n${percent}%\nThese two are not good for each other.💔`;
                } else {
                    return `💞 ${usr1} & ${usr2} 💞\nAnd the result is:\n${percent}%`;
                };
            },
        },
        "revoke": {
            resp: () => { return `Group link revoked successfully! ✅`; },
        },
        "tts": {
            wrongUse: (cmd) => { return `Incorrect usage! Use *${cmd}* <pt> tagging a message! ❌\n\nYou can find the language list here:\nhttps://anotepad.com/note/read/5xqahdy8`; },
            unknownLang: () => { return `Oops, unrecognized language! ❌\n\nYou can find the language list here:\nAfrikaans: "af"\nAlbanian: "sq"\nAmharic: "am"\nArabic: "ar"\nArmenian: "hy"\nAzerbaijani: "az"\nBasque: "eu"\nBelarusian: "be"\nBengali: "bn"\nBosnian: "bs"\nBulgarian: "bg"\nCatalan: "ca"\nCebuano: "ceb"\nChichewa: "ny"\n"Chinese Simplified": "zh-cn"\n"Chinese Traditional": "zh-tw"\nCorsican: "co"\nCroatian: "hr"\nCzech: "cs"\nDanish: "da"\nDutch: "nl"\nEnglish: "en"\nEsperanto: "eo"\nEstonian: "et"\nFilipino: "tl"\nFinnish: "fi"\nFrench: "fr"\nFrisian: "fy"\nGalician: "gl"\nGeorgian: "ka"\nGerman: "de"\nGreek: "el"\nGujarati: "gu"\n"Haitian Creole": "ht"\nHausa: "ha"\nHawaiian: "haw"\nHebrew: "iw"\nHindi: "hi"\nHmong: "hmn"\nHungarian: "hu"\nIcelandic: "is"\nIgbo: "ig"\nIndonesian: "id"\nIrish: "ga"\nItalian: "it"\nJapanese: "ja"\nJavanese: "jw"\nKannada: "kn"\nKazakh: "kk"\nKhmer: "km"\nKorean: "ko"\n"Kurdish (Kurmanji)": "ku"\nKyrgyz: "ky"\nLao: "lo"\nLatin: "la"\nLatvian: "lv"\nLithuanian: "lt"\nLuxembourgish: "lb"\nMacedonian: "mk"\nMalagasy: "mg"\nMalay: "ms"\nMalayalam: "ml"\nMaltese: "mt"\nMaori: "mi"\nMarathi: "mr"\nMongolian: "mn"\n"Myanmar (Burmese)": "my"\nNepali: "ne"\nNorwegian: "no"\nPashto: "ps"\nPersian: "fa"\nPolish: "pl"\nPortuguese: "pt"\nPunjabi: "ma"\nRomanian: "ro"\nRussian: "ru"\nSamoan: "sm"\n"Scots Gaelic": "gd"\nSerbian: "sr"\nSesotho: "st"\nShona: "sn"\nSindhi: "sd"\nSinhala: "si"\nSlovak: "sk"\nSlovenian: "sl"\nSomali: "so"\nSpanish: "es"\nSundanese: "su"\nSwahili: "sw"\nSwedish: "sv"\nTajik: "tg"\nTamil: "ta"\nTelugu: "te"\nThai: "th"\nTurkish: "tr"\nUkrainian: "uk"\nUrdu: "ur"\nUyghur: "ug"\nUzbek: "uz"\nVietnamese: "vi"\nWelsh: "cy"\nXhosa: "xh"\nYiddish: "yi"\nYoruba: "yo"\nZulu: "zu"`; },
        },
        "play": {
            resp: (title, duration) => {return `*Downloading audio...*\n\n*Title:* ${title}\n\n*Duration:* ${duration}`; }, 
            noVideoFound: () => { return `Could not find a matching video! ❌`; },
        },
        "mi": {
            resp: (resp) => { return `Title: ${resp.titulo}\nProducer: ${resp.produtora}\nDuration: ${resp.duracao}\nRelease: ${resp.lancamento}\nAlbum: ${resp.album}\nArtists: ${resp.artistas}`; },
            cantIdentify: () => { return `Oops! Could not identify the song! ❌`; },
        },
        "video": {
            resp: (title, duration) => {return `*Downloading video...*\n\n*Title:* ${title}\n\n*Duration:* ${duration}`; }, 
            noVideoFound: () => { return `Could not find a matching video! ❌`; },
        },
        "upimg": {
            success: (url) => { return `Link generated successfully!\n\n*Note:* This link lasts for 7 days, after which the image will be automatically deleted from the server!\n\n${url}`; },
        },
        "giveaway": {
            resp: (duration, prize, prefix) => { return `🎉 *GIVEAWAY* 🎉\n\n*Duration:* ${duration}\n*Prize:* ${prize}\nSend ${prefix}participate to participate in the draw!`; },
            noParticipants: () => { return `There weren't enough people to complete the giveaway! ❌` },
            winner: (winner) => { return `Congratulations *@${winner.id}* you are the giveaway winner! 🥳🎉`; },
            invalidTime: () => { return `The time you set is invalid! ❌\nUse: "d" for day, "h" for hour, "m" for minute, "s" for second!\nExample: 10m`; },
            noGiveaway: () => { return `There is no giveaway taking place at the moment! ⚠️`; },
            wrongUse(cmd) { return `Incorrect usage! Use *${cmd}* (time the giveaway will last) (prize)! ❌`; },
            alreadyOnGiveaway: () => { return `You are already participating in the giveaway!`; },
            joinedList: () => { return `You entered the giveaway list!`; },
        },
        "musicidentify": {
            resp: (resp) => { return `Title: ${resp.title}\nProducer: ${resp.producer}\nDuration: ${resp.duration}\nRelease: ${resp.lancamento}\nAlbum: ${resp.album}\nArtists: ${resp .artists}`; },
            cantIdentify: () => { return `Oops! Could not identify the song! ❌`; },
            wrongFormatOrTime: (time, timeType) => { return `Oops! Use an audio or video of less than ${time} ${timeType}! ⚠️`; },
        },
        "cot": {
            coins: {
                default_coin: 'American Dollar',
                coins: [
                    { coin: 'USD-EUR', emoji: '🇪🇺', name: 'Euro' }, /* EURO */
                    { coin: 'USD-GBP', emoji: '🇬🇧', name: 'Pound Sterling' }, /* LIBRA */
                    { coin: 'USD-BRL', emoji: '🇧🇷', name: 'Brazilian real' }, /* REAL */
                    { coin: 'USD-CHF', emoji: '🇨🇭', name: 'Swiss Franc' }, /* FRANCO */
                    { coin: 'USD-TRY', emoji: '🇹🇷', name: 'New Turkish Lira' }, /* LIRA TURCA */
                    { coin: 'USD-CAD', emoji: '🇨🇦', name: 'Canadian dollar' }, /* CANADÁ */
                    { coin: 'USD-AUD', emoji: '🇦🇺', name: 'Australian Dollar' }, /* AUSTRÁLIA */
                    { coin: 'USD-CNY', emoji: '🇨🇳', name: 'Chinese Yuan' }, /* YUAN */
                    { coin: 'USD-RUB', emoji: '🇷🇺', name: 'Russian Ruble' }, /* RUBLO */
                    { coin: 'USD-JPY', emoji: '🇯🇵', name: 'Japanese Yen' }, /* IENE */
                    { coin: 'USD-ARS', emoji: '🇦🇷', name: 'Argentinian Peso' }, /* PESO ARGENTINO */
                    { coin: 'USD-MXN', emoji: '🇲🇽', name: 'Mexican Peso' }, /* PESO MEXICANO */
                    { coin: 'BTC-USD', emoji: '💻', name: 'Bitcoin' }, /* BTC */
                ],
            },
            resp: (coins) => {
                var _finalStr = "*Exchange: 💎💰🤑💹*\n";
            
                coins.forEach((val) => {
                    _finalStr += `\n\n${val}`;
                });
                _finalStr += "\n\n\n_By: Lune Bot_";
                
                return _finalStr;
            },
        },
        "weather": {
            url: (query, key) => { return `http://api.weatherapi.com/v1/current.json?key=${key}&lang=en&q=${encodeURIComponent(query)}`; },
            resp: ({ current, location }) => {
                var { condition, temp_c, temp_f, is_day, wind_kph, wind_mph, humidity, feelslike_c, feelslike_f, last_updated, precip_mm } = current;
                var { name, region, country, localtime } = location;
                var dayornight_emoji = is_day == 1 ? '☀️' : '🌙';

                var condition = condition.text;

                var conditions = [
                    {
                      "emoji": "☁️",
                      "name": "Clear"
                    },
                    {
                      "emoji": "🌤️",
                      "name": "Partly Cloudy"
                    },
                    {
                      "emoji": "⛅",
                      "name": "Cloudy"
                    },
                    {
                      "emoji": "🌥️",
                      "name": "Overcast"
                    },
                    {
                      "emoji": "🌫️",
                      "name": "Mist"
                    },
                    {
                      "emoji": "🌧️",
                      "name": "Patchy rain nearby"
                    },
                    {
                      "emoji": "🌨️❄️",
                      "name": "Patchy snow nearby"
                    },
                    {
                      "emoji": "🌨️💧",
                      "name": "Patchy sleet nearby"
                    },
                    {
                      "emoji": "🌧️❄️",
                      "name": "Patchy freezing drizzle nearby"
                    },
                    {
                      "emoji": "⛈️",
                      "name": "Thundery outbreaks in nearby"
                    },
                    {
                      "emoji": "💨🌨️",
                      "name": "Blowing snow"
                    },
                    {
                      "emoji": "🌨️🌫️",
                      "name": "Blizzard"
                    },
                    {
                      "emoji": "🌫️",
                      "name": "Fog"
                    },
                    {
                      "emoji": "🌫️❄️",
                      "name": "Freezing fog"
                    },
                    {
                      "emoji": "🌧️💧",
                      "name": "Patchy light drizzle"
                    },
                    {
                      "emoji": "💧",
                      "name": "Light drizzle"
                    },
                    {
                      "emoji": "💧❄️",
                      "name": "Freezing drizzle"
                    },
                    {
                      "emoji": "🌧️💧❄️",
                      "name": "Heavy freezing drizzle"
                    },
                    {
                      "emoji": "🌧️💧",
                      "name": "Patchy light rain"
                    },
                    {
                      "emoji": "🌧️",
                      "name": "Light rain"
                    },
                    {
                      "emoji": "🌧️",
                      "name": "Moderate rain at times"
                    },
                    {
                      "emoji": "🌧️",
                      "name": "Moderate rain"
                    },
                    {
                      "emoji": "🌧️🌧️",
                      "name": "Heavy rain at times"
                    },
                    {
                      "emoji": "🌧️🌧️",
                      "name": "Heavy rain"
                    },
                    {
                      "emoji": "🌧️💧❄️",
                      "name": "Light freezing rain"
                    },
                    {
                      "emoji": "⛈️❄️",
                      "name": "Moderate or heavy freezing rain"
                    },
                    {
                      "emoji": "🌧️💧🌨️",
                      "name": "Light sleet"
                    },
                    {
                      "emoji": "🌧️🌨️",
                      "name": "Moderate or heavy sleet"
                    },
                    {
                      "emoji": "🌨️",
                      "name": "Patchy light snow"
                    },
                    {
                      "emoji": "🌨️",
                      "name": "Light snow"
                    },
                    {
                      "emoji": "🌨️",
                      "name": "Patchy moderate snow"
                    },
                    {
                      "emoji": "🌨️",
                      "name": "Moderate snow"
                    },
                    {
                      "emoji": "🌨️",
                      "name": "Patchy heavy snow"
                    },
                    {
                      "emoji": "🌨️🌫️",
                      "name": "Heavy snow"
                    },
                    {
                      "emoji": "🧊",
                      "name": "Ice pellets"
                    },
                    {
                      "emoji": "💧💧",
                      "name": "Light rain shower"
                    },
                    {
                      "emoji": "💧💧💧",
                      "name": "Moderate or heavy rain shower"
                    },
                    {
                      "emoji": "⛈️🌊",
                      "name": "Torrential rain shower"
                    },
                    {
                      "emoji": "🌊💧🌨️",
                      "name": "Light sleet showers"
                    },
                    {
                      "emoji": "🌊🌨️",
                      "name": "Moderate or heavy sleet showers"
                    },
                    {
                      "emoji": "🌧️💧🌨️",
                      "name": "Light snow showers"
                    },
                    {
                      "emoji": "🌧️🌨️",
                      "name": "Moderate or heavy snow showers"
                    },
                    {
                      "emoji": "🌊💧🧊",
                      "name": "Light showers of ice pellets"
                    },
                    {
                      "emoji": "🌊🧊",
                      "name": "Moderate or heavy showers of ice pellets"
                    },
                    {
                      "emoji": "🌧️💧⚡",
                      "name": "Patchy light rain in area with thunder"
                    },
                    {
                      "emoji": "🌧️⚡",
                      "name": "Moderate or heavy rain in area with thunder"
                    },
                    {
                      "emoji": "🌨️💧⚡",
                      "name": "Patchy light snow in area with thunder"
                    },
                    {
                      "emoji": "🌨️⚡",
                      "name": "Moderate or heavy snow in area with thunder"
                    }
                ];

                var pos = -1;
                var found = false;
                for (let i = 0; i < conditions.length; i++) {
                    if (conditions[i].name.toLowerCase() == condition.toLowerCase() && !found) {
                        pos = i;
                        found = true;
                    };
                };

                return `*${name}, ${region}, ${country} ${dayornight_emoji}*

🌡️ Temperature: ${temp_c}°C | ${temp_f}°F
🍃 Thermal sensation: ${feelslike_c}°C | ${feelslike_f}°F
💧 Humidity: ${humidity}%
🌧️ Precipitation: ${precip_mm}mm
🔭 Condition: ${conditions[pos].name} ${conditions[pos].emoji}
⏱️ Date and hour: ${localtime} (YYYY/MM/DD hh:mm)

✔️ Last update: ${last_updated} (YYYY/MM/DD hh:mm)
_By: Lune Bot_`;
            },
        },
        "welcome": {
            resp: (pushname, name, formattedTitle) => { return `Olá ${pushname}! 🥰 \n\nWelcome to the group: ${name || formattedTitle}\n\nNice to meet you, I'm *Lune Bot*, the virtual assistant of this group! 😉\n\nWe want you to have fun and obviously follow our rules! ✅ \n\nIf necessary, call an administrator or send *#menu*! 👨🏻‍💻`; },
            alreadyOn: () => { return `Welcome messages are already activated! ⚠️`; },
            alreadyOff: () => { return `Welcome messages are already disabled! ⚠️`; },
            enable: () => { return `Welcome messages have been activated! ✅`; },
            disable: () => { return `Welcome messages have been disabled! ✅`; },
        },
        "antilink": {
            alreadyOn: () => { return `Anti-Link is already activated! ⚠️`; },
            alreadyOff: () => { return `Anti-Link is already disabled! ⚠️`; },
            enable: () => { return `Anti-Link has been activated! ✅`; },
            disable: () => { return `Anti-Link has been disabled! ✅`; },
        },
        "autostk": {
            alreadyOn: () => { return `Auto-Sticker is already activated! ⚠️`; },
            alreadyOff: () => { return `Auto-Sticker is already disabled! ⚠️`; },
            enable: () => { return `Auto-Sticker has been activated! ✅`; },
            disable: () => { return `Auto-Sticker has been disabled! ✅`; },
        },
        "comment": {
            wrongUse: (cmd) => { return `Incorrect usage! Use *${cmd}* replying an image and next to (name) | (phrase)! ❌`; },
        },
        "onlyadmins": {
            on: () => { return `Only admins can interact and chat! 🚫`; },
            off: () => { return `Now all members can interact and chat! ✅`; },
        },
        "ddd": {
            resp: (outDDD) => { return `DDD information (${outDDD.ddd})\n=========\nState: ${outDDD.state}\n=========`; },
            cantFind: () => { return `Oops! The DDD entered is invalid! ❌`; },
        },
        "ip": {
            resp: (ip) => { return `http://www.google.com/maps/place/${ip.data.latitude},${ip.data.longitude}\n\n✪ IP: ${ip.data.ip}\n\n✪ Type: ${ip.data.type}\n\n✪ Region: ${ip.data.region}\n\n✪ City: ${ip.data.city}\n\n✪ Latitude: ${ip .data.latitude}\n\n✪ Longitude: ${ip.data.longitude}\n\n✪ Provider: ${ip.data.isp}\n\n✪ Continent: ${ip.data.continent} \n\n✪ Continent Acronym: ${ip.data.continent_code}\n\n✪ Country: ${ip.data.country}\n\n✪ Country Acronym: ${ip.data.country_code}\n\n✪ Country Capital: ${ip.data.country_capital}\n\n✪ DDI: ${ip.data.country_phone}\n\n✪ Neighboring Countries: ${ip.data.country_neighbours}\n\n✪ Timezone: ${ip.data.timezone} ${ip.data.timezone_name} ${ip.data.timezone_gmt}\n\n✪ Currency: ${ip.data.currency}\n\n✪ Acronym from Currency: ${ip.data.currency_code}\n\n-=IP lookup performed by Lune Bot=-`; },
            notfound: () => { return `The specified IP could not be found. ❌`; },
        },
        "translate": {
            noLang: () => { return `Me desculpe, mas não foi possivel encontrar esta linguagem! ❌\n\nVocê pode encontrar a lista de linguagens aqui:\nhttps://anotepad.com/note/read/5xqahdy8`; },
        },
        "cep": {
            resp: (cepPP) => { return `https://www.google.com/maps/place/${cepPP.location.coordinates.latitude},${cepPP.location.coordinates.longitude}\n\nCEP: ${cepPP.cep}\nStreet: ${cepPP.street}\nDistrict: ${cepPP.neighborhood}\nCity: ${cepPP.city}\nState: ${cepPP.state}\nLatitude: "${cepPP.location.coordinates.latitude}"\nLongitude: "${cepPP.location.coordinates.longitude}"\n\n_By: Lune Bot_`; },
            invalidCep: () => { return `Oops! The zip code entered is invalid! ❌`; },
        },
        "promote": {
            promote: (user) => { return `@${user} is now a group admin! ✅`; },
            alreadyAdmin: () => { return `This user is already a group admin! ⚠️`; },
            cantPromoteBot: () => { return `Sorry I can't promote myself! ❌`; },
        },
        "lyrics": {
            noLyrics: () => { return `Oops! Couldn't find the lyrics to the song! ❌`; },
        },
        "demote": {
            demote: (user) => { return `@${user} You are no longer a group admin! ✅`; },
            alreadyDemoted: () => { return `Sorry, the user is not an admin!`; },
            cantSelfDemote: () => { return `Sorry, I can't demote myself! ❌`; },
        },
        "join": {
            joined: () => { return `The Bot has joined the group! ✅`; },
        },
        "readqr": {
            cantread: () => { return `Oops! Couldn't find a QR code on this image! ❌`; },
        },
        "scan": {
            scanning: () => { return `🔎 Scanning...`; },
            tooBig: () => { return `Oops! Could not complete! The file is larger than 32MB! ❌`; },
            returnURL: (oScanUrl, spam, malware, suspicious, unsafe, adult, risk) => { return `Domain: ${oScanUrl.domain}\n*IP Address:* ${oScanUrl.ip_address}\n*Spam:* ${spam}\n*Malware:* ${malware}\n*Suspicious:* ${suspicious }\n*Not Safe:* ${unsafe}\n*+18:* ${adult}\n\n*Risk level:* ${risk}`; },
            resp: (result) => {
                var safe = result.positives;
                var estado = '✅ = Safe';
                if (safe >= 1 && safe < 25) {
                    estado = '⚠️ = Suspect';
                } else if (safe >= 25) {
                    estado = '⛔ = Dangerous';
                };
                return `🔎 - SCAN FILE - 🔎\n🔎 - SUCCESSFULLY - 🔎\n---------------------------------------------------------\nINFO:\n✅ = 0 suspects\n⚠️ = 1 a 25 suspects\n⛔ = 26 a 74 suspects\n---------------------------------------------------------\n\nDetected: ( ${result.positives} / 74 )\n${estado}`;
            },
        },
        "prefix": {
            tooBig: () => { return `Oops! The prefix must have only one character! ⚠️`; },
            cantBeUsed: (prefix) => { return `Oops! The character *"${prefix}"* cannot be used as a prefix! ❌`; },
            actual: (prefix) => { return `The current prefix of this chat is: *"${prefix}"* ⚠️`; },
            changed: (prefix) => { return `The prefix has been changed to: *"${prefix}"* ✅`; },
        },
        "setlang": {
            unsuported: () => { return `Oops! The specified language is not supported! Choose between "pt_BR", "en_US" and "es_ES"! ⚠️`; },
            alreadyDefault: () => { return `Your current language has been set as the default ⚠️`; },
            alreadyDefined: (langusr) => { return `Your current language is "${langusr}"! ✅`; },
            resp: (old, now) => { return `Language changed from "${old}" to "${now}" successfully! ✅`; },
            respdefault: () => { return `Your language has been set as default! ✅`; },
        },
        "mylang": {
            resp: (langusr) => { return `Your current language is "${langusr}"!`; },
        },
        "stop": {
            resp: () => { return `Restarting System... 💾`; },
        },
    },
    "es_ES": {
        responseTime: (time) => { return `Tiempo de respuesta: ${time}ms`; },
        onlyAdmins: () => { return `Lo siento, Este comando solo puede ser utilizado por administradores del grupo! ❌`; },
        onlyGroups: () => { return `Lo siento, ¡Este comando solo se puede usar dentro de los grupos! ❌`; },
        onlyNum: () => { return `Lo siento, ¡Pero el mensaje debe ser un número! ⚠️`; },
        onlyText: () => { return `Lo siento, ¡Pero el mensaje debe ser un texto! ⚠️`; },
        somethingWentWrong: () => { return `¡Ups! ¡Algo salió mal! ❌`; },
        somethingWentWrongConversion: () => { return `¡Ups! ¡Algo salió mal durante la conversión! ❌`; },
        stickerMetadataImg: (keepScale) => { return { author: '+55 (16) 99787-2383', pack: 'Lune Bot', keepScale: keepScale }; },
        stickerMetadataVideo: (fps, end, keepScale, crop) => { return { stickerMetadata: true, author: '+55 (16) 99787-2383', pack: 'Lune Bot', fps: fps, startTime: '00:00:00.0', endTime : end, crop: crop, loop: 0, keepScale: keepScale }; },
        lang: () => { return `es`; },
        maxText: (max) => { return `Lo siento, ¡pero el mensaje no puede tener más de ${max} personajes! ⚠️`; },
        maxCustom: (maxT) => { return `Lo siento, ¡pero el mensaje no puede tener más que ${maxT}! ⚠️`; },
        maxDuration: (max, maxType, mediaType) => {
            switch (maxType) {
                case 's':;
                    maxType = "segundo(s)";
                break;
                case 'm':;
                    maxType = "minuto(s)";
                break;
                case 'h':;
                    maxType = "hora(s)";
                break;    
                case 'ms':;
                    maxType = "milésimo(s)";
                break;
                case 'd':;
                    maxType = "día(s)";
                break;
            };
            mediaType = mediaType == 'aud' ? "audio" : "video"; return `¡Ops! ¡El ${mediaType} No puede contener más de ${max} ${maxType} deduración! ⚠️`;
        },
        botIsntAdmin: () => { return `Para usar este comando, ¡necesito ser un administrador grupal! ⚠️`; },
        invalidOptions: (validOptions) => { var $ = `¡Elija una opción válida! ⚠️\nLista de opciones:`; validOptions.forEach((option) => { $ += `\n${option}`; }); return $; },
        cantfind: (arg) => { return `¡Ups! ¡No fue posible encontrar ${arg}! ❌`; },
        onOrOff: () => { return `¡Defina entre "On" y "Off"! ⚠️`; },
        isntURL: () => { return `¡Esta no es una URL! ❌`; },
        invalidURL: () => { return `¡Ups!Link no válido! ❌`; },
        invalidDDD: () => { return `¡Ups!Ddd Inválido! ❌`; },
        minTries: (min) => { return `coloqueNoMínimoDe ${min}Tentativas! ⚠️`; },
        maxTries: (max) => { return `Poner un número máximo de intentos hasta ${max}! ⚠️`; },
        getMounth: (mounth) => { switch (mounth) { case '01':; return "Enero"; case '02':; return "Febrero"; case '03':; return "Marzo"; case '04':; return "Abril"; case '05':; return "Mayo"; case '06':; return "Junio"; case '07':; return "Julio"; case '08':; return "Agosto"; case '09':; return "Septiembre"; case '10':; return "Octubre"; case '11':; return "Noviembre"; case '12':; return "Diciembre"; }; },
        noSpecialCharacters: () => { return `¡Oye, no uses caracteres especiales! ⚠️`; },
        noEmojiFound: () => { return `¡No se encontró emoji!`; },
        noResultFound: () => { return `¡Ningún resultado encontrado!`; },
        yes: () => { return `Si`; },
        no: () => { return `No`; },
        "wrongUse": {
            default: (cmd) => { return `Uso incorrecto! Use *${cmd}*! ❌`; },
            defaultArgs: (cmd, args) => { return `¡Uso Incorrecto! ¡Usar *${cmd}* <${args.join('> <').replace(/ </g, '')}>!`; },
            quotingMessage: (cmd) => { return `¡Uso incorrecto! ¡Use *${cmd}* que marca un mensaje! ❌`; },
            quotingMessageOrAtSide: (cmd) => { return `¡Uso incorrecto! ¡Use *${cmd}* y al lado del texto o marcando un mensaje! ❌`; },
            quotingImage: (cmd) => { return `¡Uso incorreto! Utilize *${cmd}* marcando uma imagem! ❌`; },
            quotingImageOrAsBody: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem ou como legenda! ❌`; },
            quotingVideo: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um vídeo! ❌`; },
            quotingImageOrVideoOrGIF: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem, vídeo ou GIF! ❌`; },
            quotingAudioOrVideo: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um áudio ou vídeo! ❌`; },
            quotingText: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um texto! ❌`; },
            quotingSticker: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um sticker! ❌`; },
            quotingAudio: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um áudio! ❌`; },
            quotingFile: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um arquivo! ❌`; },
            quotingMyMessage: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma mensagem minha! ❌`; },
            quotingImageOrAsBody: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem ou use como legenda! ❌`; },
            quotingMessageAndTimeInMinutes: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma mensagem e ao lado o tempo em minutos! ❌`; },
            quotingMessageOrTagSomeone: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma mensagem ou mencione alguém! ❌`; },
            andLocal: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um local! ❌`; },
            andPhrase: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado uma frase! ❌`; },
            addMusicName: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um nome de música! ❌`; },
            andTagAndVal: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado marque a pessoa que deseja dar XP e ao lado digite o valor! ❌`; },
            andChar: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um caractere! ❌`; },
            andLink: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um link! ❌`; },
            andLinkOrQuotingFile: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um link ou marcando um arquivo! ❌`; },
            andName: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um nome! ❌`; },
            andText: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um texto! ❌`; },
            andCep: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um CEP! ❌`; },
            andDDD: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um DDD! ❌`; },
            andAudioAndEffect: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando um áudio e ao lado o efeito!\n\nLista de efeitos suportados:\nexplode - 2x - reverse - bass - acute - volume - nightcore - lo-fi - bathroom - slow`; },
            andSearch: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o que deseja pesquisar! ❌`; },
            andPokemon: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o nome de Pokémon!`; },
            andVideoName: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o nome do vídeo!`; },
            andGroupLink: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o link do grupo! ❌`; },
            andSeed: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado a seed! ❌`; },
            andPrompt: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o prompt! ❌`; },
            twoWords: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem e ao lado (palavra1) | (palavra2)! ❌`; },
            useNumber: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado um número <55XXXXXXXXX>! ❌`; },
            tagTwoPeople: (cmd, separator) => { return `Uso incorreto! Utilize *${cmd}* (usuário n1) ${separator} (pessoa n2)! ❌`; },
            tagSomeone: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado mencione alguém! ❌`; },
            axp: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando a pessoa que deseja dar ou remover XP e ao lado o valor! ❌`; },
            roll: (cmd) => { return `Uso incorreto! Utilize *${cmd}* <N° de dados>d<N° de lados dos dados>+<proeficiência (opcional)>!`; },
            ppt: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e uma escolha\n\n*(Escolha entre PEDRA, PAPEL, TESOURA)*`; },
            setlang: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e o idioma que quer utilizar! ❌\n\n*("pt_BR", "es_ES", "en_US")*`; },
        },
        "menu": {
            onlyPv: () => { return `Sinto muito, mas este menu está disponível apenas no privado!`; },
            dontExist: () => { return `Sinto muito, mas este menu não existe!`; },
        },
        "messages": {
            thanks: () => { return `Muito obrigada... 🥰`; },
            enabled: () => { return `Ativado ✅`; },
            disabled: () => { return `Desativado ❌`; },
            noName: () => { return `Sem nome. ❌`; },
            noDesc: () => { return `Sem descrição. ❌`; },
            noResults: () => { return `Nenhum resultado encontrado! ❌`; },
            linksAreNotAllowed: () => { return `Links não são permitidos neste grupo! ❌`; },
            calledMe: () => { return `Me chamou? ☺️✨`; },
            happyFace: () => { return `;D`; },
            needHelp: (prefix) => { return `Precisa de ajuda? Mande *${prefix}menu* para mais informações! 😉`; },
            cute: () => { return `Ah, que isso kkk 🥰`; },
            actualPrefix: (prefix) => { return `O prefixo atual deste chat é: *"${prefix}"*`; },
        },
        "kick": {
            removedUser: () => { return `Usuário removido! ✅`; },
            areYouBanned: (banUser) => { return `Você foi banido! 🚫\n${banUser}`; },
            youCantKickMe: () => { return `Por que eu faria isso? 🤨`; },
            cantBanAdmin: () => { return `Sinto muito, você não pode expulsar um administrador do grupo! ⚠️`; },
            cantBanOwner: () => { return `Permissão negada! Não posso banir meu criador! ⛔`; },
            userIsntOnGroup: () => { return `O usuário não está no grupo! ⚠️`; },
        },
        "ek": {
            maxEmojis: (max) => { return `Use no máximo ${max} emojis!`; },
            dontCombine: () => { return `Ops! Estes emojis não combinam!`; },
            wrongUse: (cmd) => { return `Uso incorreto! Digite *${cmd}* <emoji> <emoji> _(obs: deve haver um espaço entre os emojis)_ ❌`; },
        },
        "xp": {
            onlyGroupsWithXp: () => { return `Este comando só pode ser usado dentro de grupos com sistema de XP!`; },
            cantGiveMoreThanYouHave: () => { return `Você não pode dar mais XP do que você possui! ❌`; },
            cantUseMinus: () => { return `Sinto muito, mas você não pode roubar o amiguinho :P`; },
            give: (gived, give, xpNow, xpNowGv) => { return `Você transferiu ${gived} XP para @${give}!\nXP anterior: ${xpNow}\nXP atual: ${xpNowGv}`; },
            axp: (user, give) => { return `Aplicado ${give} XP para ${user}!`; },
            tagGive: (cmd) => { return `Você deve marcar a pessoa que deseja transferir seu XP!\nExemplo:\n*${cmd}* @Fox 10`; },
            xpIsOff: () => { return `Para usar este e mais comandos, ative o sistema de XP no grupo!`; },
            xpOff: () => { return `Este grupo não fará mais parte do sistema de XP!`; },
            xpOn: () => { return `Este grupo agora faz parte do sistema de XP!`; },
            xpAlreadyOn: () => { return `O sistema de XP já está ativo no grupo!`; },
            level: (pushname, xp, thexpnde, uzerlvl, patente) => { return `*「 NIVEL 」*\n\n🖊️ *NOME:* ${pushname}\n💠 *XP:* ${xp} / ${thexpnde}\n📊 *Nivel:* ${uzerlvl}\n🧙‍♂️ *Classe:* ${patente}`; },
            insuficientXpToUp: () => { return `Você não possui XP o suficiente para subir o nível!`; },
            forceUp: (pushname, xp, requiredXp, lvl, role, amount) => { `*「 FORCEUP 」*\n\n🖊️ *NOME:* ${pushname}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Nivel:* ${lvl}\n🧙‍♂️ *Classe:* ${role}\n\n_*Você subiu "${amount}" ${(amount-1) == 0 ? "nível" : "níveis"}!*_`; },
            tiersTop: () => {  return `*PATENTES:*\n\n`; },
            tiers: (patent, emoji, lvl) => {  return `${patent} ${emoji} - (Nível necessário: ${lvl})\n\n`; },
            finalMsgTiers: (usr, lvl, xp, requiredXp) => { return `*Usuário:* ${usr}\n*Seu nivel:* ${lvl}\n*Seu XP:* ${xp}/${requiredXp}`; },
            actualChance: (chance) => { return `☘️ Chance atual: ${chance}%`; },
            newLevel: (name, xp, requiredXp, lvl, role) => { return  `*「 NOVO NIVEL 」*\n\n🖊️ *NOME:* ${name}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Nivel:* ${lvl}\n🧙‍♂️ *Classe:* ${role}\n\n_*Quanto mais você interage no grupo, mais alto é o seu nível!*_`; },
        },
        "games": {
            rwin: (win) => { return `Salvo! Você não levou um tiro e ganhou ${win} XP!`; },
            rlose: (lose) => { return `Bang! Você perdeu na roleta-russa, causando uma perda de ${lose} XP!`; },
            cwin: ({ e1, e2, e3 }, win) => { return `GANHOU!\n[--------------------]\n${e1} - ${e2} - ${e3}\n[--------------------]\n\nVocê ganhou ${win} XP!`; },
            close: ({ e1, e2, e3 }, lose) => { return `PERDEU!\n[--------------------]\n${e1} - ${e2} - ${e3}\n[--------------------]\n\nVocê perdeu ${lose} XP!`; },
            tooLowXp: (min, usrxp) => { return `Você não possui uma licença para jogar, obtenha uma quando tiver ${min} de XP!\n\nVocê possui ${usrxp} XP!`; },
            specifyAmount: () => { return `Especifique a quantidade de XP para apostar!`; },
            onlyNum: () => { return `Para apostar use apenas números, nada de inserir letras, a menos que queira perder todo o XP que tenha!`; },
            tooHighVal: (usrxp, max) => { return `Você não pode apostar uma quantidade de XP maior do que você possui, e nosso limite de apostas é de ${max} XP por vez!\n\nVocê possui ${usrxp} XP!`; },
            tooLowVal: (min) => { return `Desculpe, mas você não pode apostar menos de ${min} XP!`; },
        },
        "exitgame": {
            on: () => { return `Agora você poderá receber XP novamente!`; },
            off: () => { return `Você não reberá mais XP agora!`; },
            alreadyOn: () => { return `O XP já está ativado para você!`; },
            alreadyOff: () => { return `O XP já está desativado para você!`; },
        },
        "profile": {
            resp: (usr, adm, estadoCivil, lvl, xp, xpRequired, role, isxp) => { return `*Dados do perfil..* ✨️ \n\n🔖️ *Nome de usuário:*\n${usr}\n\n👑️ *Administrador?*\n${adm}\n\n💕 *Estado civil*:\n${estadoCivil}\n\n📈 *Level:*\n${isxp ? lvl : "Sistema de XP desativado"}\n\n🕹️ *XP:*\n${isxp ? xp+"/"+xpRequired : "Sistema de XP desativado"}\n\n🌐 *Patente:*\n${isxp ? role : "Sistema de XP desativado"}`; },
            marriagedWith: (usr) => { return `Casado(a) com @${usr}`; },
        },
        "sys": {
            time: (h, m, s) => { return `${h} horas | ${m} minutos | ${s} segundos - HH:MM:SS`; },
            mem: (gb, mb, kb, allram) => { return `${gb}GB | ${mb}MB | ${kb}KB | ${allram} Bytes`; },
            resp: (speed, loadedMsgs, groups, chatIds, uptime, pcUptime, cpu, cpuSpeed, os, osArch, osPlatform, osRelease, ram, username, hostname, zapVer, owaVer) => { return `🐌 - Velocidade > ${speed} segundos\n\n📊 - ${loadedMsgs} Mensagens após inicio\n\n📱 - ${groups.length} Conversas em grupo\n\n👥 - ${chatIds.length - groups.length} Conversas no PV\n\n📈 - ${chatIds.length} Total de chats\n\n⌛ Bot Uptime - ${uptime}\n\n💻​ PC Uptime - ${pcUptime}\n\n🌡️ CPU - ${cpu} (${cpuSpeed} MHz)\n\n🖥️ S.O - ${os} - ${osArch} (${osPlatform} V. ${osRelease})\n\n💾 RAM - ${ram}\n\n👑 Username - ${username} (${hostname})\n\n🪀 WhatsApp - Version ${zapVer}\n\n📡 Open-WA - Version ${owaVer}`/*\n\n🔋 Bateria do Telefone - ${botBat}\n\n🔌 Telefone carregando? - ${isEnergy ? 'Sim' : 'Não'}`*/; },
        },
        "death": {
            resp: (name, deathAge) => { return `Pessoas com o nome "${name}" tendem a morrer aos ${deathAge} anos de idade!`; },
        },
        "ping": {
            resp: (speed, uptime) => { return `🏓 *PONG!*\n\n⏳ Ping: ${speed}ms\n\n⏳ Tempo Online: ${uptime}`; },
        },
        "anime": {
            noResults: () => { return `Nenhum resultado encontrado! ❌`; },
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o nome do anime! ❌`; },
            inDev: () => { return `(Em desenvolvimento)`; },
            resp: (val) => { return `✨ Titulo: ${val.title}\n\n🎆 Episódios: ${val.episodes}\n\n💌 Classificação: ${val.rating}\n\n${val.status ? `⚠️ Status: ${val.status}\n\n` : ''}🕑 Duração: ${val.duration}\n\n❤️ Nota: ${val.score}\n\n${val.synopsis ? `💚 Sinopse: ${val.synopsis}\n\n` : ''}🌐 Link: ${val.url}`; },
        },
        "manga": {
            noResults: () => { return `Nenhum resultado encontrado! ❌`; },
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* e ao lado o nome do mangá! ❌`; },
            inDev: () => { return `(Em desenvolvimento)`; },
            resp: (val) => { return `✨ Titulo: ${val.title}\n\n🎆 Capítulos: ${val.chapters}\n\n💌 Volumes: ${val.volumes}\n\n${val.status ? `⚠ Status: ${val.status}\n\n` : ''}❤️ Nota: ${val.score}\n\n${val.synopsis ? `💚 Sinopse: ${val.synopsis}\n\n` : ''}🌐 Link: ${val.url}`; },
        },
        "emo": {
            resp: (percent) => {
                if (percent == 100) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nEmo supremo(a)!`;
                } else if (percent == 101) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é SUPREME% Emo!\n\nHYPER MEGA EMO!`;
                } else if (percent == 0) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nQue cara mais comum...`;
                } else if (percent == 25) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nMerece mais maquiagem preta!`;
                } else if (percent == 50) {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nÉ emo ou não? Decida-se!`;
                } else if (percent == 75) {
                    `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!\n\nMega Emo!`;
                } else {
                    return `🖤-> *Emo-o-metter* <-🖤\n\nVocê é ${percent}% Emo!`;
                };
            },
        },
        "gay": {
            resp: (percent) => {
                if (percent == 100) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nGay supremo(a)!`;
                } else if (percent == 101) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é SUPREME% Gay!\n\nHYPER MEGA GAY!`;
                } else if (percent == 0) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nTotalmente hétero!`;
                } else if (percent == 25) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nDa pra melhorar!`;
                } else if (percent == 50) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nÉ gay ou hétero? Decida-se!`;
                } else if (percent == 75) {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!\n\nMega gay!`;
                } else {
                    return `🏳️‍🌈️-> *Gay-o-metter* <-🏳️‍🌈️\n\nVocê é ${percent}% Gay!`;
                };
            },
        },
        "corno": {
            resp: (percent) => {
                if (percent === 100) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\nCorno(a) supremo(a) -(->x🐂x<-)-`;
                } else if (percent == 101) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é SUPREME% Corno(a)!\n\nGADO MODO DEUS!`;
                } else if (percent == 0) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\nNunca foi traido(a) 😎👌`;
                } else if (percent == 25) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\nCorno(a) conformado(a)`;
                } else if (percent == 50) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\n😐`;
                } else if (percent == 75) {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!\n\nCorno(a) mestre(a) 🐂👌`;
                } else {
                    return `🐂-> *Corno-o-metter* <-🐂\n\nVocê é ${percent}% Corno(a)!`;
                };
            },
        },
        "fofo": {
            resp: (percent) => {
                if (percent === 100) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nSUPER FOFO(A)! 🌟🌟🌟🌟🌟`;
                } else if (percent == 0) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nAssustador(a)... 🌟`;
                } else if (percent == 25) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nFofinho(a) 🌟🌟;^;`;
                } else if (percent == 50) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nFofo(a) 🌟🌟🌟`;
                } else if (percent == 75) {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!\n\nMuito fofo(a) 🌟🌟🌟🌟`;
                } else {
                    return `🌟-> *Fofo-o-metter* <-🌟\n\nVocê é ${percent}% Fofo(a)!`;
                };
            },
        },
        "pokedex": {
            dontExistPokemon: () => { return `Sinto muito, mas este pokemon não existe!\n\nCaso exista verifique se está escrito corretamente!`; },
            resp: async(pk, translate) => {
                var txtPoke = {
                    nm: '*Name*: ' + (pk.name.split('')[0].toUpperCase()+pk.name.slice(1)),
                    desc: '*Description:*\n'+pk.description,
                    typ: '*Type:* '+pk.type,
                    gr: '*Generation:* '+pk.generation,
                    egg: '*Egg group:* '+pk.egg_groups.join(' - ').replace(/ - $/, '').replace("Undiscovered", "Não descoberto"),
                    stt: '*Status:*\nHP: '+pk.stats.hp+'\nAttack: '+pk.stats.attack+'\nDefense: '+pk.stats.defense+'\nSP Attack: '+pk.stats.sp_atk+'\nSP Defense: '+pk.stats.sp_def+'\nSpeed: '+pk.stats.speed+'\nTotal: '+pk.stats.total,
                    fml: '*Evolution:* '+pk.family.evolutionStage+'',
                    gend: '*Gender:*\n'+(pk.gender.join(', ').replace(/, $/, '')),
                    hab: '*Abilities:* '+pk.abilities.join(' - ').replace(/ - $/, ''),
                    tam: '*Height:* '+pk.height,
                    pes: '*Weight:* '+pk.weight,
                    esp: '*Category:* '+(pk.species.join(', ').replace(/, $/, '')),
                }
                return `*---POKEDEX---*\n\n🗒️ ${txtPoke.nm}\n\n📃 ${txtPoke.desc}\n\n🔎 ${txtPoke.typ}\n\n🗓️ ${txtPoke.gr}\n\n🥚 ${txtPoke.egg}\n\n🧮 ${txtPoke.stt}\n\n📶 ${txtPoke.fml}\n\n⚧️ ${txtPoke.gend}\n\n⚔️ ${txtPoke.hab}\n\n📐 ${txtPoke.tam}\n\n⚖️ ${txtPoke.pes}\n\n🧬 ${txtPoke.esp}`;
            },
        },
        "marriage": {
            alreadySentRequest: () => { return `Você já enviou um pedido de casamento para este usuário! ⚠️`; },
            divorce: (usr1, usr2) => { return `@${usr1} se divorciou de @${usr2}!`; },
            marryRequest: (usr1, usr2) => { return `@${usr1} enviou um pedido de casamento para @${usr2}!`; },
            alreadyMarried: () => { return `Este usuário já está casado(a) com outra pessoa!`; },
            tagSomeone: (cmd) => { return `Debes etiquetar a alguien que te envió una solicitud de matrimonio para aceptar. Utilice *${cmd}* @nombredeusuario`; },
            thatPersonDontSendYouARequest: () => { return `Esta pessoa não lhe enviou um pedido de casamento!`; },
            noOneSentYouARequest: () => { return `Ninguém te enviou um pedido de casamento!`; },
            cantMarryTwoOrMore: (prefix) => { return `Você não pode casar com mais de uma pessoa!\n\nCaso queira encerrar o seu atual casamento envie *${prefix}divorce*`; },
            cantSelfMarry: () => { return `Sinto muito, mas você não pode se casar com você mesmo(a)`; },
            cantMarryBot: () => { return `Está tentando me conquistar?`; },
            fmarry: (usr1, usr2) => { return `@${usr1} foi forçado(a) a se casar com @${usr2}!`; },
            alone: () => {  return `Solteiro(a)`; },
            youArentMarried: () => { return `Você não está casado(a) com ninguém!`; },
            thisUserArentMarried: () => { return `Parece este usuário não está casado(a) ainda!`; },
            couple: (req, usr1, usr2, time) => { return `Olá @${req}, o usuário @${usr1} está casado(a) com @${usr2} há ${time} dias!`; },
            selfCouple: (req, usr1, time) => { return `Olá @${req}, você está casado(a) com @${usr1} há ${time} dias!`; },
            dontMarriedToDivorce: () => { return `Você não está casado(a) com ninguém para se divorciar!`; },
            marry: (usr1, usr2, day, mounth, year) => {
                return ``+
                `═════════「💍」═════════\n`+
                `          Certidão de Casamento\n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `Este documento certifica oficialmente que\n`+
                `🌹@${usr1} & 🌷@${usr2}\n`+
                `uniram-se no laço sagrado do matrimônio.\n`+
                `\n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `_Casamento é mais que subir em um altar e Proclamar amar eternamente._\n`+
                `_Casamento é mais que trocar as “escovas de dentes”, como falam, ultimamente._\n`+
                `_Casamento é a comprovação concreta que o amor é uma arte._\n`+
                `_E de alguma maneira hoje, quero sempre me casar com você..._\n`+
                `_Para mim este amor é diferente, não é de papel passado, é amor de papel presente._\n`+
                `\n`+
                `═════════「💍」═════════\n`+
                `\n`+
                `      Casamento realizado dia ${day}\n`+
                `           de ${mounth} de ${year}\n\n`+
                `             Por: *Lune Bot*\n`+
                `\n`+
                `═════════「💍」═════════`;
            },
        },
        "top10": {
            top: () => { return `--[ *TOP 10 PLAYERS* ]--\n\n`; },
            insuficientPlayers: (min) => { return `Não temos ${min} jogadores ainda, tente novamente mais tarde!`; },
            resp: (pos, usr, xp, lvl, role) => { return `${pos}. ${usr}\n➸ *XP*: ${xp}\n➸ *Level*: ${lvl}\n➸ *Patente*: ${role}\n\n`; },
        },
        "meme": {
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem e ao lado (frase1) | (frase2)! ❌`; },
        },
        "groupinfo": {
            info: ({groupname, totalMem, welgrp, lzex, xpgp, autostk, prefix, desc, gpOwner, admgp}) => { return `*${groupname}*\n\n*Quantidade de Membros: ${totalMem}*\n\n*Welcome: ${welgrp}*\n\n*Anti-Link:  ${lzex}*\n\n*XP: ${xpgp}*\n\n*Autosticker: ${autostk}*\n\n*Prefixo: ${prefix}*\n\n______________________________\n*Descrição:*\n ${desc}\n______________________________\n\n*Dono:* @${gpOwner.replace("@c.us", "")}\n\n*Administradores:*\n${admgp}`; },
        },
        "roll": {
            minAndMaxProeficiency: (min, max) => { return `O número de proeficiência deve ser de até ${max}! E maior que ${min}!`; },
            minDices: (min) => { return `A quantidade de dados deve ser de pelo menos ${min}!`; },
            minFaces: (min) => { return `O número de lados dos dados deve ser de pelo menos ${min}!`; },
            maxDices: (max) => { return `A quantidade de dados a serem jogados deve ser até ${max}!`; },
            maxFaces: (max) => { return `A quantidade de lados dos dados a serem jogados deve ser de até ${max}!`; },
            onlyNatural: () => { return `Use apenas números naturais!`; },
        },
        "add": {
            successfullyAdded: (user) => { return `Usuário @${user} adicionado! ✅`; },
            alreadyOnGroup: () => { return `O usuário já está no grupo! ⚠️`; },
            alreadyInvited: () => { return `O usuário já foi convidado! ⚠️`; },
            noPermissions: () => { return `Este usuário não permite ser adicionado em grupos! Portanto, eu enviarei um link de convite para o mesmo! ⚠️`; },
            invalidNumber: () => { return `Este número não existe!`; },
            cantAdd: () => { return `Ops! Não foi possível adicionar o usuário ao grupo! ❌`; },
        },
        "ppt": {
            selectValidOption: () => { return `Escolha uma opção válida!`; },
            win: (emojiUsr, emojiBot) => { return `Você venceu! Você escolheu ${emojiUsr} e eu escolhi ${emojiBot}!` },
            tie: (emojiUsr, emojiBot) => { return `Um empate! Você escolheu ${emojiUsr} e eu escolhi ${emojiBot}!` },
            lose: (emojiUsr, emojiBot) => { return `Você perdeu! Você escolheu ${emojiUsr} e eu escolhi ${emojiBot}!` },
        },
        "emoji": {
            onlyOneEmoji: () => { return `Sinto muito, mande apenas um emoji por vez!`; },
        },
        "antispam": {
            ban: () => { return `*⚠️ AVISO ⚠️*\n\nSistema anti-spam habilitado!\n\nNas próximas 24 horas você não poderá interagir comigo!"`}
        },
        "slap": {
            resp: (usr1, usr2) => { return `@${usr1} bateu em ${usr2}!`; },
            noUser: () => { return `Uso incorreto! Utilize *slap @usuário*! ❌`; },
            self: (user) => { return `@${user} se bateu!`; },
        },
        "sleep": {
            resp: (user) => { return `@${user} está a mimir!`; },
        },
        "gift": {
            doYouWin: (usr, gift) => { return `${usr}, você irá ganhar ${gift} de aniversário!\n\nParabéns!`; },
        },
        "wakeup": {
            resp: (user) => { return `@${user} acordou!`; },
        },
        "hug": {
            resp: (usr1, usr2) => { return `@${usr1} abraçou @${usr2}!`; },
            self: (user) => { return `@${user} abraçou!`; },
        },
        "kiss": {
            resp: (usr1, usr2) => { return `@${usr1} beijou ${usr2}!`; },
            self: (user) => { return `@${user} se beijou!`; },
        },
        "kill": {
            resp: (usr1, usr2) => { return `@${usr1} matou ${usr2}!`; },
            self: (user) => { return `@${user} cometeu suicidio!`; },
        },
        "gender": {
            resp: (gender, name) => { return `O nome "${name}" é mais usado por ${gender}!`; },
            female: () => { return `mulheres`; },
            male: () => { return `homens`; },
        },
        "ship": {
            resp: (usr1, usr2, percent) => {
                if (percent == 100) {
                    return `💞 ${usr1} & ${usr2} 💞\nE o resultado é:\n${percent}%\nOs dois foram feitos um para o outro!💖`;
                } else if (percent == 50) {
                    return `💞 ${usr1} & ${usr2} 💞\nE o resultado é:\n${percent}%\nMeio a meio... 🥀`;
                } else if (percent == 0) {
                    return `💞 ${usr1} & ${usr2} 💞\nE o resultado é:\n${percent}%\nEstes dois não servem um para o outro.💔`;
                } else {
                    return `💞 ${usr1} & ${usr2} 💞\nE o resultado é:\n${percent}%`;
                };
            },
        },
        "revoke": {
            resp: () => { return `Link de grupo revogado com sucesso! ✅`; },
        },
        "tts": {
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* <pt> marcando uma mensagem! ❌\n\nVocê pode encontrar a lista de linguagens aqui:\nhttps://anotepad.com/note/read/5xqahdy8`; },
            unknownLang: () => { return `Ops, linguagem não reconhecida! ❌\n\nVocê pode encontrar a lista de linguagens aqui:\nAfrikaans: "af"\nAlbanian: "sq"\nAmharic: "am"\nArabic: "ar"\nArmenian: "hy"\nAzerbaijani: "az"\nBasque: "eu"\nBelarusian: "be"\nBengali: "bn"\nBosnian: "bs"\nBulgarian: "bg"\nCatalan: "ca"\nCebuano: "ceb"\nChichewa: "ny"\n"Chinese Simplified": "zh-cn"\n"Chinese Traditional": "zh-tw"\nCorsican: "co"\nCroatian: "hr"\nCzech: "cs"\nDanish: "da"\nDutch: "nl"\nEnglish: "en"\nEsperanto: "eo"\nEstonian: "et"\nFilipino: "tl"\nFinnish: "fi"\nFrench: "fr"\nFrisian: "fy"\nGalician: "gl"\nGeorgian: "ka"\nGerman: "de"\nGreek: "el"\nGujarati: "gu"\n"Haitian Creole": "ht"\nHausa: "ha"\nHawaiian: "haw"\nHebrew: "iw"\nHindi: "hi"\nHmong: "hmn"\nHungarian: "hu"\nIcelandic: "is"\nIgbo: "ig"\nIndonesian: "id"\nIrish: "ga"\nItalian: "it"\nJapanese: "ja"\nJavanese: "jw"\nKannada: "kn"\nKazakh: "kk"\nKhmer: "km"\nKorean: "ko"\n"Kurdish (Kurmanji)": "ku"\nKyrgyz: "ky"\nLao: "lo"\nLatin: "la"\nLatvian: "lv"\nLithuanian: "lt"\nLuxembourgish: "lb"\nMacedonian: "mk"\nMalagasy: "mg"\nMalay: "ms"\nMalayalam: "ml"\nMaltese: "mt"\nMaori: "mi"\nMarathi: "mr"\nMongolian: "mn"\n"Myanmar (Burmese)": "my"\nNepali: "ne"\nNorwegian: "no"\nPashto: "ps"\nPersian: "fa"\nPolish: "pl"\nPortuguese: "pt"\nPunjabi: "ma"\nRomanian: "ro"\nRussian: "ru"\nSamoan: "sm"\n"Scots Gaelic": "gd"\nSerbian: "sr"\nSesotho: "st"\nShona: "sn"\nSindhi: "sd"\nSinhala: "si"\nSlovak: "sk"\nSlovenian: "sl"\nSomali: "so"\nSpanish: "es"\nSundanese: "su"\nSwahili: "sw"\nSwedish: "sv"\nTajik: "tg"\nTamil: "ta"\nTelugu: "te"\nThai: "th"\nTurkish: "tr"\nUkrainian: "uk"\nUrdu: "ur"\nUyghur: "ug"\nUzbek: "uz"\nVietnamese: "vi"\nWelsh: "cy"\nXhosa: "xh"\nYiddish: "yi"\nYoruba: "yo"\nZulu: "zu"`; },
        },
        "play": {
            resp: (title, duration) => {return `*Baixando áudio...*\n\n*Título:* ${title}\n\n*Duração:* ${duration}`; }, 
            noVideoFound: () => { return `Não foi possivel encontrar um video correspondente! ❌`; },
        },
        "mi": {
            resp: (resp) => { return `Titulo: ${resp.titulo}\nProdutora: ${resp.produtora}\nDuração: ${resp.duracao}\nLançamento: ${resp.lancamento}\nAlbum: ${resp.album}\nArtistas: ${resp.artistas}`; },
            cantIdentify: () => { return `Ops! Não foi possível identificar a música! ❌`; },
        },
        "video": {
            resp: (title, duration) => {return `*Baixando vídeo...*\n\n*Título:* ${title}\n\n*Duração:* ${duration}`; }, 
            noVideoFound: () => { return `Não foi possivel encontrar um video correspondente! ❌`; },
        },
        "upimg": {
            success: (url) => { return `Link gerado com sucesso!\n\n*Obs:* Este link tem duração de 7 dias, após isso a imagem será automaticamente deletada do servidor!\n\n${url}`; },
        },
        "giveaway": {
            resp: (duration, prize, prefix) => { return `🎉 *SORTEIO* 🎉\n\n*Duração:* ${duration}\n*Prêmio:* ${prize}\nEnvie ${prefix}participar para participar do sorteio!`; },
            noParticipants: () => { return `Não haviam pessoas o suficiente para concluir o sorteio! ❌` },
            winner: (winner) => { return `Parabéns *@${winner.id}* você é o(a) ganhador(a) do sorteio! 🥳🎉`; },
            invalidTime: () => { return `O tempo que você definiu é inválido! ❌\nUtilize: "d" para dia, "h" para hora, "m" para minuto, "s" para segundo!\nExemplo: 10m`; },
            noGiveaway: () => { return `Não existe nenhum sorteio sendo realizado no momento! ⚠️`; },
            wrongUse(cmd) { return `Uso incorreto! Digite *${cmd}* (tempo que irá durar o sorteio) (prêmio)! ❌`; },
            alreadyOnGiveaway: () => { return `Você já está participando do sorteio!`; },
            joinedList: () => { return `Você entrou na lista do sorteio!`; },
        },
        "musicidentify": {
            resp: (resp) => { return `Titulo: ${resp.titulo}\nProdutora: ${resp.produtora}\nDuração: ${resp.duracao}\nLançamento: ${resp.lancamento}\nAlbum: ${resp.album}\nArtistas: ${resp.artistas}`; },
            cantIdentify: () => { return `Ops! Não foi possível identificar a música! ❌`; },
            wrongFormatOrTime: (time, timeType) => { return `Ops! Utilize um áudio ou vídeo com menos de ${time} ${timeType}! ⚠️`; },
        },
        "cot": {
            coins: {
                default_coin: 'Dólar Americano',
                coins: [
                    { coin: 'USD-EUR', emoji: '🇪🇺', name: 'Euro' }, /* EURO */
                    { coin: 'USD-GBP', emoji: '🇬🇧', name: 'Libra Esterlina' }, /* LIBRA */
                    { coin: 'USD-BRL', emoji: '🇧🇷', name: 'Real Brasileiro' }, /* REAL */
                    { coin: 'USD-CHF', emoji: '🇨🇭', name: 'Franco Suíço' }, /* FRANCO */
                    { coin: 'USD-TRY', emoji: '🇹🇷', name: 'Nova Lira Turca' }, /* LIRA TURCA */
                    { coin: 'USD-CAD', emoji: '🇨🇦', name: 'Dólar Canadense' }, /* CANADÁ */
                    { coin: 'USD-AUD', emoji: '🇦🇺', name: 'Dólar Australiano' }, /* AUSTRÁLIA */
                    { coin: 'USD-CNY', emoji: '🇨🇳', name: 'Yuan Chinês' }, /* YUAN */
                    { coin: 'USD-RUB', emoji: '🇷🇺', name: 'Rublo Russo' }, /* RUBLO */
                    { coin: 'USD-JPY', emoji: '🇯🇵', name: 'Iene Japonês' }, /* IENE */
                    { coin: 'USD-ARS', emoji: '🇦🇷', name: 'Peso Argentino' }, /* PESO ARGENTINO */
                    { coin: 'USD-MXN', emoji: '🇲🇽', name: 'Peso Mexicano' }, /* PESO MEXICANO */
                    { coin: 'BTC-USD', emoji: '💻', name: 'Bitcoin' }, /* BTC */
                ],
            },
            resp: (coins) => {
                var _finalStr = "*Cotação atual: 💎💰🤑💹*\n";
            
                coins.forEach((val) => {
                    _finalStr += `\n\n${val}`;
                });
                _finalStr += "\n\n\n_By: Lune Bot_";
                
                return _finalStr;
            },
        },
        "weather": {
            url: (query, key) => { return `http://api.weatherapi.com/v1/current.json?key=${key}=es&q=${encodeURIComponent(query)}`; },
            resp: ({ current, location }) => {
                var { condition, temp_c, temp_f, is_day, wind_kph, wind_mph, humidity, feelslike_c, feelslike_f, last_updated, precip_mm } = current;
                var { name, region, country, localtime } = location;
                var dayornight_emoji = is_day == 1 ? '☀️' : '🌙';

                var condition = condition.text;

                var conditions = [
                    {
                      "emoji": '☁️',
                      "name": "Céu limpo"
                    },
                    {
                      "emoji": '🌤️',
                      "name": "Parcialmente nublado"
                    },
                    {
                      "emoji": '⛅',
                      "name": "Nublado"
                    },
                    {
                      "emoji": '🌥️',
                      "name": "Encoberto"
                    },
                    {
                      "emoji": '🌫️',
                      "name": "Neblina"
                    },
                    {
                      "emoji": '🌧️',
                      "name": "Possibilidade de chuva irregular"
                    },
                    {
                      "emoji": '🌨️❄️',
                      "name": "Possibilidade de neve irregular"
                    },
                    {
                      "emoji": '🌨️💧',
                      "name": "Possibilidade de neve molhada irregular"
                    },
                    {
                      "emoji": '🌧️❄️',
                      "name": "Possibilidade de chuvisco gelado irregular"
                    },
                    {
                      "emoji": '⛈️',
                      "name": "Possibilidade de trovoada"
                    },
                    {
                      "emoji": '💨🌨️',
                      "name": "Rajadas de vento com neve"
                    },
                    {
                      "emoji": '🌨️🌫️',
                      "name": "Nevasca"
                    },
                    {
                      "emoji": '🌫️',
                      "name": "Nevoeiro"
                    },
                    {
                      "emoji": '🌫️❄️',
                      "name": "Nevoeiro gelado"
                    },
                    {
                      "emoji": '🌧️💧',
                      "name": "Chuvisco irregular"
                    },
                    {
                      "emoji": '💧',
                      "name": "Chuvisco"
                    },
                    {
                      "emoji": '💧❄️',
                      "name": "Chuvisco gelado"
                    },
                    {
                      "emoji": '🌧️💧❄️',
                      "name": "Chuvisco forte gelado"
                    },
                    {
                      "emoji": '🌧️💧',
                      "name": "Chuva fraca irregular"
                    },
                    {
                      "emoji": '🌧️',
                      "name": "Chuva fraca"
                    },
                    {
                      "emoji": '🌧️',
                      "name": "Períodos de chuva moderada"
                    },
                    {
                      "emoji": '🌧️',
                      "name": "Chuva moderada"
                    },
                    {
                      "emoji": '🌧️🌧️',
                      "name": "Períodos de chuva forte"
                    },
                    {
                      "emoji": '🌧️🌧️',
                      "name": "Chuva forte"
                    },
                    {
                      "emoji": '🌧️💧❄️',
                      "name": "Chuva fraca e gelada"
                    },
                    {
                      "emoji": '⛈️❄️',
                      "name": "Chuva gelada moderada ou forte"
                    },
                    {
                      "emoji": '🌧️💧🌨️',
                      "name": "Chuva fraca com neve"
                    },
                    {
                      "emoji": '🌧️🌨️',
                      "name": "Chuva forte ou moderada com neve"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve irregular e fraca"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve fraca"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve moderada e irregular"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve moderada"
                    },
                    {
                      "emoji": '🌨️',
                      "name": "Queda de neve forte e irregular"
                    },
                    {
                      "emoji": '🌨️🌫️',
                      "name": "Neve intensa"
                    },
                    {
                      "emoji": '🧊',
                      "name": "Granizo"
                    },
                    {
                      "emoji": '💧💧',
                      "name": "Aguaceiros fracos"
                    },
                    {
                      "emoji": '💧💧💧',
                      "name": "Aguaceiros moderados ou fortes"
                    },
                    {
                      "emoji": '⛈️🌊',
                      "name": "Chuva torrencial"
                    },
                    {
                      "emoji": '🌊💧🌨️',
                      "name": "Aguaceiros fracos com neve"
                    },
                    {
                      "emoji": '🌊🌨️',
                      "name": "Aguaceiros moderados ou fortes com neve"
                    },
                    {
                      "emoji": '🌧️💧🌨️',
                      "name": "Chuva fraca com neve"
                    },
                    {
                      "emoji": '🌧️🌨️',
                      "name": "Chuva moderada ou forte com neve"
                    },
                    {
                      "emoji": '🌊💧🧊',
                      "name": "Aguaceiros fracos com granizo"
                    },
                    {
                      "emoji": '🌊🧊',
                      "name": "Aguaceiros moderados ou fortes com granizo"
                    },
                    {
                      "emoji": '🌧️💧⚡',
                      "name": "Chuva fraca irregular com trovoada"
                    },
                    {
                      "emoji": '🌧️⚡',
                      "name": "Chuva moderada ou forte com trovoada"
                    },
                    {
                      "emoji": '🌨️💧⚡',
                      "name": "Neve fraca irregular com trovoada"
                    },
                    {
                      "emoji": '🌨️⚡',
                      "name": "Neve moderada ou forte com trovoada"
                    }
                ];

                var pos = -1;
                var found = false;
                for (let i = 0; i < conditions.length; i++) {
                    if (conditions[i].name.toLowerCase() == condition.toLowerCase() && !found) {
                        pos = i;
                        found = true;
                    };
                };

                return `${name}, ${region}, ${country} ${dayornight_emoji}

🌡️ Temperatura: ${temp_c}°C | ${temp_f}°F
🍃 Sensação térmica: ${feelslike_c}°C | ${feelslike_f}°F
💧 Umidade: ${humidity}%
🌧️ Precipitação: ${precip_mm}mm
🔭 Condição: ${conditions[pos].name} ${conditions[pos].emoji}
⏱️ Data e hora: ${localtime} (AAAA/MM/DD hh:mm)

✔️ Última atualização: ${last_updated} (AAAA/MM/DD hh:mm)
_By: Lune Bot_`;
            },
        },
        "welcome": {
            resp: (pushname, name, formattedTitle) => { return `Olá ${pushname}! 🥰 \n\nSeja bem vindo(a) ao grupo: ${name || formattedTitle}\n\nPrazer, eu sou o *Lune Bot*, o assistente virtual deste grupo! 😉\n\nDesejamos que se divirta e obviamente que siga nossas regras! ✅ \n\nCaso precise, chame um administrador ou envie *#menu*! 👨🏻‍💻`; },
            alreadyOn: () => { return `As mensagens de Boas-Vindas já estão ativadas! ⚠️`; },
            alreadyOff: () => { return `As mensagens de Boas-Vindas já estão desativadas! ⚠️`; },
            enable: () => { return `As mensagens de Boas-Vindas foram ativadas! ✅`; },
            disable: () => { return `As mensagens de Boas-Vindas foram desativadas! ✅`; },
        },
        "antilink": {
            alreadyOn: () => { return `O Anti-Link já está ativado! ⚠️`; },
            alreadyOff: () => { return `O Anti-Link já está desativado! ⚠️`; },
            enable: () => { return `O Anti-Link foi ativado! ✅`; },
            disable: () => { return `O Anti-Link foi desativado! ✅`; },
        },
        "autostk": {
            alreadyOn: () => { return `O Auto-Sticker já está ativado! ⚠️`; },
            alreadyOff: () => { return `O Auto-Sticker já está desativado! ⚠️`; },
            enable: () => { return `O Auto-Sticker foi ativado! ✅`; },
            disable: () => { return `O Auto-Sticker foi desativado! ✅`; },
        },
        "comment": {
            wrongUse: (cmd) => { return `Uso incorreto! Utilize *${cmd}* marcando uma imagem e ao lado (nome) | (frase)! ❌`; },
        },
        "onlyadmins": {
            on: () => { return `Somente administradores podem interagir e conversar! 🚫`; },
            off: () => { return `Agora todos os membros podem interagir e conversar! ✅`; },
        },
        "ddd": {
            resp: (outDDD) => { return `Informações do DDD (${outDDD.ddd})\n=========\nEstado: ${outDDD.state}\n=========`; },
            cantFind: () => { return `Ops! O DDD informado é invalido! ❌`; },
        },
        "ip": {
            resp: (ip) => { return `http://www.google.com/maps/place/${ip.data.latitude},${ip.data.longitude}\n\n✪ IP: ${ip.data.ip}\n\n✪ Tipo: ${ip.data.type}\n\n✪ Região: ${ip.data.region}\n\n✪ Cidade: ${ip.data.city}\n\n✪ Latitude: ${ip.data.latitude}\n\n✪ Longitude: ${ip.data.longitude}\n\n✪ Provedor: ${ip.data.isp}\n\n✪ Continente: ${ip.data.continent}\n\n✪ Sigla do continente: ${ip.data.continent_code}\n\n✪ País: ${ip.data.country}\n\n✪ Sigla do País: ${ip.data.country_code}\n\n✪ Capital do País: ${ip.data.country_capital}\n\n✪ DDI: ${ip.data.country_phone}\n\n✪ Países Vizinhos: ${ip.data.country_neighbours}\n\n✪ Fuso Horário: ${ip.data.timezone} ${ip.data.timezone_name} ${ip.data.timezone_gmt}\n\n✪ Moeda: ${ip.data.currency}\n\n✪ Sigla da Moeda: ${ip.data.currency_code}\n\n-=Busca de IP realizada por Lune Bot=-`; },
            notfound: () => { return `No se pudo encontrar la IP especificada. ❌`; },
        },
        "translate": {
            noLang: () => { return `Me desculpe, mas não foi possivel encontrar esta linguagem! ❌\n\nVocê pode encontrar a lista de linguagens aqui:\nhttps://anotepad.com/note/read/5xqahdy8`; },
        },
        "cep": {
            resp: (cepPP) => { return `https://www.google.com/maps/place/${cepPP.location.coordinates.latitude},${cepPP.location.coordinates.longitude}\n\nCEP: ${cepPP.cep}\nRua: ${cepPP.street}\nBairro: ${cepPP.neighborhood}\nCidade: ${cepPP.city}\nEstado: ${cepPP.state}\nLatitude: "${cepPP.location.coordinates.latitude}"\nLongitude: "${cepPP.location.coordinates.longitude}"\n\n_By: Lune Bot_`; },
            invalidCep: () => { return `Ops! O CEP informado é inválido! ❌`; },
        },
        "promote": {
            promote: (user) => { return `@${user} agora é um(a) administrador(a) do grupo! ✅`; },
            alreadyAdmin: () => { return `Este usuário já é um(a) administrador(a) do grupo! ⚠️`; },
            cantPromoteBot: () => { return `Desculpe, não posso me promover! ❌`; },
        },
        "lyrics": {
            noLyrics: () => { return `Ops! Não foi possível encontrar a letra da música! ❌`; },
        },
        "demote": {
            demote: (user) => { return `@${user} não é mais um(a) administrador(a) do grupo! ✅`; },
            alreadyDemoted: () => { return `Desculpe, o usuário não é um administrador!`; },
            cantSelfDemote: () => { return `Desculpe, não posso me rebaixar! ❌`; },
        },
        "join": {
            joined: () => { return `O Bot Juntou-se ao grupo! ✅`; },
        },
        "readqr": {
            cantread: () => { return `Ops! Não foi possivel encontrar um QR code nesta imagem! ❌`; },
        },
        "scan": {
            scanning: () => { return `🔎 Escaneando...`; },
            tooBig: () => { return `Ops! Não foi possível concluir! O arquivo é maior que 32MB! ❌`; },
            returnURL: (oScanUrl, spam, malware, suspicious, unsafe, adult, risk) => { return `Dominio: ${oScanUrl.domain}\n*Endereço IP:* ${oScanUrl.ip_address}\n*Spam:* ${spam}\n*Malware:* ${malware}\n*Suspeito:* ${suspicious}\n*Não Seguro:* ${unsafe}\n*+18:* ${adult}\n\n*Nivel de risco:* ${risk}`; },
            resp: (result) => {
                var safe = result.positives;
                var estado = '✅ = Seguro';
                if (safe >= 1 && safe < 25) {
                    estado = '⚠️ = Suspeito';
                } else if (safe >= 25) {
                    estado = '⛔ = Perigoso';
                };
                return `🔎 - ARQUIVO ESCANEADO - 🔎\n🔎 - COM SUCESSO - 🔎\n---------------------------------------------------------\nINFO:\n✅ = 0 suspeitas\n⚠️ = 1 a 25 suspeitas\n⛔ = 26 a 74 suspeitas\n---------------------------------------------------------\n\nDetectados: ( ${result.positives} / 74 )\n${estado}`;
            },
        },
        "prefix": {
            tooBig: () => { return `¡Ups!¡El prefijo debe tener solo un personaje!🇧🇷`; },
            cantBeUsed: (prefix) => { return `Ops! O caractere *"${prefix}"* não pode ser usado como prefixo! ❌`; },
            actual: (prefix) => { return `O prefixo atual deste chat é: *"${prefix}"* ⚠️`; },
            changed: (prefix) => { return `O prefixo foi alterado para: *"${prefix}"* ✅`; },
        },
        "setlang": {
            unsuported: () => { return `Ops! O idioma especificado não é suportado! Escolha entre "pt_BR", "en_US" e "es_ES"! ⚠️`; },
            alreadyDefault: () => { return `Seu idioma já está definido como padrão! ⚠️`; },
            alreadyDefined: (langusr) => { return `Seu idioma atual já é "${langusr}"! ✅`; },
            resp: (old, now) => { return `Idioma alterado de "${old}" para "${now}" com sucesso! ✅`; },
            respdefault: () => { return `Seu idioma foi definido como padrão! ✅`; },
        },
        "mylang": {
            resp: (langusr) => { return `Seu idioma atual é "${langusr}"!`; },
        },
        "stop": {
            resp: () => { return `Reiniciando sistema... 💾`; },
        },
    },
};
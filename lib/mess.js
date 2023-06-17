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
    stickerMetadataVideo: (fps, end, keepScale, crop) => { return { stickerMetadata: true, author: '+55 (16) 99787-2383', pack: 'Lune Bot', fps: fps, startTime: '00:00:00.0', endTime: end, crop: crop, loop: 0, keepScale: keepScale }; },
    lang: () => { return `pt`; },
    maxText: (max) => { return `Sinto muito, mas a mensagem não pode possuir mais de ${max} caracteres! ⚠️`; },
    maxCustom: (maxT) => { return `Sinto muito, mas a mensagem não pode possuir mais de ${maxT}! ⚠️`; },
    maxDuration: (max, maxType, mediaType, titleb, formatedTimeb) => {
      var title = titleb || undefined;
      var formatedTime = formatedTimeb || undefined;
      switch (maxType) {
        case 's': ;
          maxType = "segundo(s)";
          break;
        case 'm': ;
          maxType = "minuto(s)";
          break;
        case 'h': ;
          maxType = "hora(s)";
          break;
        case 'ms': ;
          maxType = "milésimo(s)";
          break;
        case 'd': ;
          maxType = "dia(s)";
          break;
      };
      var title_duration;
      if (title == undefined || formatedTime == undefined) {
        title_duration = '';
      } else {
        title_duration = `*Título:* ${title}\n\n*Duração:* ${formatedTime}\n\n`;
      };

      mediaType = mediaType == 'aud' ? "áudio" : "vídeo";
      return `${title_duration}Ops! O ${mediaType} não pode conter mais que ${max} ${maxType} de duração! ⚠️`;
    },
    tiers: () => {
      return [
        {
          name: "Copper",
          emoji: "🪙",
          lv: 0
        },
        {
          name: "Bronze I",
          emoji: "🥉",
          lv: 5
        },
        {
          name: "Bronze II",
          emoji: "🥉",
          lv: 10
        },
        {
          name: "Bronze III",
          emoji: "🥉",
          lv: 15
        },
        {
          name: "Bronze IV",
          emoji: "🥉",
          lv: 20
        },
        {
          name: "Bronze V",
          emoji: "🥉",
          lv: 25
        },
        {
          name: "Silver I",
          emoji: "🥈",
          lv: 30
        },
        {
          name: "Silver II",
          emoji: "🥈",
          lv: 35
        },
        {
          name: "Silver III",
          emoji: "🥈",
          lv: 40
        },
        {
          name: "Silver IV",
          emoji: "🥈",
          lv: 45
        },
        {
          name: "Silver V",
          emoji: "🥈",
          lv: 50
        },
        {
          name: "Gold I",
          emoji: "🥇",
          lv: 55
        },
        {
          name: "Gold II",
          emoji: "🥇",
          lv: 60
        },
        {
          name: "Gold III",
          emoji: "🥇",
          lv: 65
        },
        {
          name: "Gold IV",
          emoji: "🥇",
          lv: 70
        },
        {
          name: "Gold V",
          emoji: "🥇",
          lv: 75
        },
        {
          name: "Platinum I",
          emoji: "🎖️",
          lv: 80
        },
        {
          name: "Platinum II",
          emoji: "🎖️",
          lv: 85
        },
        {
          name: "Platinum III",
          emoji: "🎖️",
          lv: 90
        },
        {
          name: "Platinum IV",
          emoji: "🎖️",
          lv: 95
        },
        {
          name: "Platinum V",
          emoji: "🎖️",
          lv: 100
        },
        {
          name: "Diamond I",
          emoji: "💎",
          lv: 200
        },
        {
          name: "Diamond II",
          emoji: "💎",
          lv: 300
        },
        {
          name: "Diamond III",
          emoji: "💎",
          lv: 400
        },
        {
          name: "Diamond IV",
          emoji: "💎",
          lv: 500
        },
        {
          name: "Diamond V",
          emoji: "💎",
          lv: 600
        },
        {
          name: "Sapphire",
          emoji: "🟦",
          lv: 700
        },
        {
          name: "Emerald",
          emoji: "🟩",
          lv: 800
        },
        {
          name: "Ruby",
          emoji: "🟥",
          lv: 900
        },
        {
          name: "King",
          emoji: "👑",
          lv: 1000
        }
      ];
    },
    botIsntAdmin: () => { return `Para usar este comando, é necessario eu ser um administrador do grupo! ⚠️`; },
    invalidOptions: (validOptions) => { var $ = `Escolha uma opção válida! ⚠️\nLista de opções:`; validOptions.forEach((option) => { $ += `\n${option}`; }); return $; },
    cantfind: (arg) => { return `Ops! Não foi possível encontrar ${arg}! ❌`; },
    onOrOff: () => { return `Defina entre "on" e "off"! ⚠️`; },
    isntURL: () => { return `Isto não é um URL! ❌`; },
    invalidURL: () => { return `Ops! Link inválido! ❌`; },
    minTries: (min) => { return `Coloque no mínimo de ${min} tentativas! ⚠️`; },
    maxTries: (max) => { return `Coloque um número máximo de tentativas até ${max}! ⚠️`; },
    getMounth: (mounth) => { switch (mounth) { case '01': ; return "Janeiro"; case '02': ; return "Fevereiro"; case '03': ; return "Março"; case '04': ; return "Abril"; case '05': ; return "Maio"; case '06': ; return "Junho"; case '07': ; return "Julho"; case '08': ; return "Agosto"; case '09': ; return "Setembro"; case '10': ; return "Outubro"; case '11': ; return "Novembro"; case '12': ; return "Dezembro"; }; },
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
      forceUp: (pushname, xp, requiredXp, lvl, role, amount) => { `*「 FORCEUP 」*\n\n🖊️ *NOME:* ${pushname}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Nivel:* ${lvl}\n🧙‍♂️ *Classe:* ${role}\n\n_*Você subiu "${amount}" ${(amount - 1) == 0 ? "nível" : "níveis"}!*_`; },
      tiersTop: () => { return `*PATENTES:*\n\n`; },
      tiers: (patent, emoji, lvl) => { return `${patent} ${emoji} - (Nível necessário: ${lvl})\n\n`; },
      finalMsgTiers: (usr, lvl, xp, requiredXp) => { return `*Usuário:* ${usr}\n*Seu nivel:* ${lvl}\n*Seu XP:* ${xp}/${requiredXp}`; },
      actualChance: (chance) => { return `☘️ Chance atual: ${chance}%`; },
      newLevel: (name, xp, requiredXp, lvl, role) => { return `*「 NOVO NIVEL 」*\n\n🖊️ *NOME:* ${name}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Nivel:* ${lvl}\n🧙‍♂️ *Classe:* ${role}\n\n_*Quanto mais você interage no grupo, mais alto é o seu nível!*_`; },
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
      resp: (usr, adm, estadoCivil, lvl, xp, xpRequired, role, isxp) => { return `*Dados do perfil..* ✨️ \n\n🔖️ *Nome de usuário:*\n${usr}\n\n👑️ *Administrador?*\n${adm}\n\n💕 *Estado civil*:\n${estadoCivil}\n\n📈 *Level:*\n${isxp ? lvl : "Sistema de XP desativado"}\n\n🕹️ *XP:*\n${isxp ? xp + "/" + xpRequired : "Sistema de XP desativado"}\n\n🌐 *Patente:*\n${isxp ? role : "Sistema de XP desativado"}`; },
      marriagedWith: (usr, coupleTime) => { return `Casado(a) com @${usr} há ${coupleTime == '0' ? '1' : coupleTime} dia(s).`; },
    },
    "sys": {
      time: (h, m, s) => { return `${h} horas | ${m} minutos | ${s} segundos - HH:MM:SS`; },
      mem: (gb, mb, kb, allram) => { return `${gb}GB | ${mb}MB | ${kb}KB | ${allram} Bytes`; },
      resp: (speed, loadedMsgs, groups, chatIds, uptime, pcUptime, cpu, cpuSpeed, os, osArch, osPlatform, osRelease, ram, username, hostname, zapVer, owaVer, version, defaultPrefix, botNumber, owners, antispam, only_groups, save_musics) => {
        return `🐌 - Velocidade > ${speed} segundos

📊 - ${loadedMsgs} Mensagens após inicio

📱 - ${groups.length} Conversas em grupo

👥 - ${chatIds.length - groups.length} Conversas no PV

📈 - ${chatIds.length} Total de chats

#️⃣ Prefixo Padrão - ${defaultPrefix}

📞 Número do Bot - ${botNumber}

🫵 Dono(s) do Bot - ${owners.join(", ") || "Não definido"}

🔇 Anti-spam - ${antispam ? 'Habilitado' : 'Desabilitado'}

👥 Apenas Grupos - ${only_groups ? 'Habilitado' : 'Desabilitado'}

📥 Salvar Músicas - ${save_musics ? 'Habilitado' : 'Desabilitado'}

⌛ Bot Uptime - ${uptime}

💻​ PC Uptime - ${pcUptime}

🌡️ CPU - ${cpu} (${cpuSpeed} MHz)

🖥️ S.O - ${os} - ${osArch} (${osPlatform} V. ${osRelease})

💾 RAM - ${ram}\n\n👑 Username - ${username} (${hostname})

🪀 WhatsApp - Version ${zapVer}

📡 Open-WA - Version ${owaVer}

🌐 Bot - Version ${version}`;
      },
    },
    "death": {
      resp: (name, deathAge) => { return `Pessoas com o nome "${name}" tendem a morrer aos ${deathAge} anos de idade!`; },
    },
    "ping": {
      resp: (speed, uptime) => { return `🏓 *PONG!*\n\n⏳ Ping: ${speed}ms\n\n⏳ Tempo Online: ${uptime}`; },
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
      resp: async (pk, translate) => {
        var txtPoke = {
          nm: '*Name*: ' + (pk.name.split('')[0].toUpperCase() + pk.name.slice(1)),
          desc: '*Description:*\n' + pk.description,
          typ: '*Type:* ' + pk.type,
          gr: '*Generation:* ' + pk.generation,
          egg: '*Egg group:* ' + pk.egg_groups.join(' - ').replace(/ - $/, '').replace("Undiscovered", "Não descoberto"),
          stt: '*Status:*\nHP: ' + pk.stats.hp + '\nAttack: ' + pk.stats.attack + '\nDefense: ' + pk.stats.defense + '\nSP Attack: ' + pk.stats.sp_atk + '\nSP Defense: ' + pk.stats.sp_def + '\nSpeed: ' + pk.stats.speed + '\nTotal: ' + pk.stats.total,
          fml: '*Evolution:* ' + pk.family.evolutionStage + '',
          gend: '*Gender:*\n' + (pk.gender.join(', ').replace(/, $/, '')),
          hab: '*Abilities:* ' + pk.abilities.join(' - ').replace(/ - $/, ''),
          tam: '*Height:* ' + pk.height,
          pes: '*Weight:* ' + pk.weight,
          esp: '*Category:* ' + (pk.species.join(', ').replace(/, $/, '')),
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
      alone: () => { return `Solteiro(a)`; },
      youArentMarried: () => { return `Você não está casado(a) com ninguém!`; },
      thisUserArentMarried: () => { return `Parece este usuário não está casado(a) ainda!`; },
      couple: (req, usr1, usr2, time) => { return `Olá @${req}, o usuário @${usr1} está casado(a) com @${usr2} há ${time} dias!`; },
      selfCouple: (req, usr1, time) => { return `Olá @${req}, você está casado(a) com @${usr1} há ${time} dias!`; },
      dontMarriedToDivorce: () => { return `Você não está casado(a) com ninguém para se divorciar!`; },
      marry: (usr1, usr2, day, mounth, year) => {
        return `` +
          `═════════「💍」═════════\n` +
          `          Certidão de Casamento\n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `Este documento certifica oficialmente que\n` +
          `🌹@${usr1} & 🌷@${usr2}\n` +
          `uniram-se no laço sagrado do matrimônio.\n` +
          `\n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `_Casamento é mais que subir em um altar e Proclamar amar eternamente._\n` +
          `_Casamento é mais que trocar as “escovas de dentes”, como falam, ultimamente._\n` +
          `_Casamento é a comprovação concreta que o amor é uma arte._\n` +
          `_E de alguma maneira hoje, quero sempre me casar com você..._\n` +
          `_Para mim este amor é diferente, não é de papel passado, é amor de papel presente._\n` +
          `\n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `      Casamento realizado dia ${day}\n` +
          `           de ${mounth} de ${year}\n\n` +
          `             Por: *Lune Bot*\n` +
          `\n` +
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
      info: ({ groupname, totalMem, welgrp, lzex, xpgp, autostk, prefix, desc, gpOwner, admgp }) => { return `*${groupname}*\n\n*Quantidade de Membros: ${totalMem}*\n\n*Welcome: ${welgrp}*\n\n*Anti-Link:  ${lzex}*\n\n*XP: ${xpgp}*\n\n*Autosticker: ${autostk}*\n\n*Prefixo: ${prefix}*\n\n______________________________\n*Descrição:*\n ${desc}\n______________________________\n\n*Dono:* @${gpOwner.replace("@c.us", "")}\n\n*Administradores:*\n${admgp}`; },
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
      ban: () => { return `*⚠️ AVISO ⚠️*\n\nSistema anti-spam habilitado!\n\nNas próximas 12 horas você não poderá interagir comigo!"` }
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
      resp: (title, duration) => { return `*Baixando áudio...*\n\n*Título:* ${title}\n\n*Duração:* ${duration}`; },
      noVideoFound: () => { return `Não foi possivel encontrar um video correspondente! ❌`; },
    },
    "mi": {
      resp: (resp) => { return `Titulo: ${resp.titulo}\nProdutora: ${resp.produtora}\nDuração: ${resp.duracao}\nLançamento: ${resp.lancamento}\nAlbum: ${resp.album}\nArtistas: ${resp.artistas}`; },
      cantIdentify: () => { return `Ops! Não foi possível identificar a música! ❌`; },
    },
    "video": {
      resp: (title, duration) => { return `*Baixando vídeo...*\n\n*Título:* ${title}\n\n*Duração:* ${duration}`; },
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

        var code = condition.code;
        var condition = condition.text;

        var conditions = [
          {
            code: 1000,
            emoji: "☀️",
            name_day: "Sol",
            name_night: "Céu limpo"
          },
          {
            code: 1003,
            emoji: "☁️",
            name_day: "Parcialmente nublado",
            name_night: "Parcialmente nublado"
          },
          {
            code: 1006,
            emoji: "🌤️",
            name_day: "Nublado",
            name_night: "Nublado"
          },
          {
            code: 1009,
            emoji: "⛅",
            name_day: "Encoberto",
            name_night: "Encoberto"
          },
          {
            code: 1030,
            emoji: "🌥️",
            name_day: "Neblina",
            name_night: "Neblina"
          },
          {
            code: 1063,
            emoji: "🌫️",
            name_day: "Possibilidade de chuva irregular",
            name_night: "Possibilidade de chuva irregular"
          },
          {
            code: 1066,
            emoji: "🌧️",
            name_day: "Possibilidade de neve irregular",
            name_night: "Possibilidade de neve irregular"
          },
          {
            code: 1069,
            emoji: "🌨️❄️",
            name_day: "Possibilidade de neve molhada irregular",
            name_night: "Possibilidade de neve molhada irregular"
          },
          {
            code: 1072,
            emoji: "🌨️💧",
            name_day: "Possibilidade de chuvisco gelado irregular",
            name_night: "Possibilidade de chuvisco gelado irregular"
          },
          {
            code: 1087,
            emoji: "🌧️❄️",
            name_day: "Possibilidade de trovoada",
            name_night: "Possibilidade de trovoada"
          },
          {
            code: 1114,
            emoji: "⛈️",
            name_day: "Rajadas de vento com neve",
            name_night: "Rajadas de vento com neve"
          },
          {
            code: 1117,
            emoji: "💨🌨️",
            name_day: "Nevasca",
            name_night: "Nevasca"
          },
          {
            code: 1135,
            emoji: "🌨️🌫️",
            name_day: "Nevoeiro",
            name_night: "Nevoeiro"
          },
          {
            code: 1147,
            emoji: "🌫️",
            name_day: "Nevoeiro gelado",
            name_night: "Nevoeiro gelado"
          },
          {
            code: 1150,
            emoji: "🌫️❄️",
            name_day: "Chuvisco irregular",
            name_night: "Chuvisco irregular"
          },
          {
            code: 1153,
            emoji: "🌧️💧",
            name_day: "Chuvisco",
            name_night: "Chuvisco"
          },
          {
            code: 1168,
            emoji: "💧",
            name_day: "Chuvisco gelado",
            name_night: "Chuvisco gelado"
          },
          {
            code: 1171,
            emoji: "💧❄️",
            name_day: "Chuvisco forte gelado",
            name_night: "Chuvisco forte gelado"
          },
          {
            code: 1180,
            emoji: "🌧️💧❄️",
            name_day: "Chuva fraca irregular",
            name_night: "Chuva fraca irregular"
          },
          {
            code: 1183,
            emoji: "🌧️💧",
            name_day: "Chuva fraca",
            name_night: "Chuva fraca"
          },
          {
            code: 1186,
            emoji: "🌧️",
            name_day: "Períodos de chuva moderada",
            name_night: "Períodos de chuva moderada"
          },
          {
            code: 1189,
            emoji: "🌧️",
            name_day: "Chuva moderada",
            name_night: "Chuva moderada"
          },
          {
            code: 1192,
            emoji: "🌧️",
            name_day: "Períodos de chuva forte",
            name_night: "Períodos de chuva forte"
          },
          {
            code: 1195,
            emoji: "🌧️🌧️",
            name_day: "Chuva forte",
            name_night: "Chuva forte"
          },
          {
            code: 1198,
            emoji: "🌧️🌧️",
            name_day: "Chuva fraca e gelada",
            name_night: "Chuva fraca e gelada"
          },
          {
            code: 1201,
            emoji: "🌧️💧❄️",
            name_day: "Chuva gelada moderada ou forte",
            name_night: "Chuva gelada moderada ou forte"
          },
          {
            code: 1204,
            emoji: "⛈️❄️",
            name_day: "Chuva fraca com neve",
            name_night: "Chuva fraca com neve"
          },
          {
            code: 1207,
            emoji: "🌧️💧🌨️",
            name_day: "Chuva forte ou moderada com neve",
            name_night: "Chuva forte ou moderada com neve"
          },
          {
            code: 1210,
            emoji: "🌧️🌨️",
            name_day: "Queda de neve irregular e fraca",
            name_night: "Queda de neve irregular e fraca"
          },
          {
            code: 1213,
            emoji: "🌨️",
            name_day: "Queda de neve fraca",
            name_night: "Queda de neve fraca"
          },
          {
            code: 1216,
            emoji: "🌨️",
            name_day: "Queda de neve moderada e irregular",
            name_night: "Queda de neve moderada e irregular"
          },
          {
            code: 1219,
            emoji: "🌨️",
            name_day: "Queda de neve moderada",
            name_night: "Queda de neve moderada"
          },
          {
            code: 1222,
            emoji: "🌨️",
            name_day: "Queda de neve forte e irregular",
            name_night: "Queda de neve forte e irregular"
          },
          {
            code: 1225,
            emoji: "🌨️",
            name_day: "Neve intensa",
            name_night: "Neve intensa"
          },
          {
            code: 1237,
            emoji: "🌨️🌫️",
            name_day: "Granizo",
            name_night: "Granizo"
          },
          {
            code: 1240,
            emoji: "🧊",
            name_day: "Aguaceiros fracos",
            name_night: "Aguaceiros fracos"
          },
          {
            code: 1243,
            emoji: "💧💧",
            name_day: "Aguaceiros moderados ou fortes",
            name_night: "Aguaceiros moderados ou fortes"
          },
          {
            code: 1246,
            emoji: "💧💧💧",
            name_day: "Chuva torrencial",
            name_night: "Chuva torrencial"
          },
          {
            code: 1249,
            emoji: "⛈️🌊",
            name_day: "Aguaceiros fracos com neve",
            name_night: "Aguaceiros fracos com neve"
          },
          {
            code: 1252,
            emoji: "🌊💧🌨️",
            name_day: "Aguaceiros moderados ou fortes com neve",
            name_night: "Aguaceiros moderados ou fortes com neve"
          },
          {
            code: 1255,
            emoji: "🌊🌨️",
            name_day: "Chuva fraca com neve",
            name_night: "Chuva fraca com neve"
          },
          {
            code: 1258,
            emoji: "🌧️💧🌨️",
            name_day: "Chuva moderada ou forte com neve",
            name_night: "Chuva moderada ou forte com neve"
          },
          {
            code: 1261,
            emoji: "🌧️🌨️",
            name_day: "Aguaceiros fracos com granizo",
            name_night: "Aguaceiros fracos com granizo"
          },
          {
            code: 1264,
            emoji: "🌊💧🧊",
            name_day: "Aguaceiros moderados ou fortes com granizo",
            name_night: "Aguaceiros moderados ou fortes com granizo"
          },
          {
            code: 1273,
            emoji: "🌊🧊",
            name_day: "Chuva fraca irregular com trovoada",
            name_night: "Chuva fraca irregular com trovoada"
          },
          {
            code: 1276,
            emoji: "🌧️💧⚡",
            name_day: "Chuva moderada ou forte com trovoada",
            name_night: "Chuva moderada ou forte com trovoada"
          },
          {
            code: 1279,
            emoji: "🌧️⚡",
            name_day: "Neve fraca irregular com trovoada",
            name_night: "Neve fraca irregular com trovoada"
          },
          {
            code: 1282,
            emoji: "🌨️💧⚡",
            name_day: "Neve moderada ou forte com trovoada",
            name_night: "Neve moderada ou forte com trovoada"
          }
        ];

        var pos = -1;
        var found = false;
        for (let i = 0; i < conditions.length; i++) {
          if (conditions[i].code == code && !found) {
            pos = i;
            found = true;
          };
        };


        var cond;
        if (is_day == 1) {
          cond = conditions[pos].name_night;
        } else {
          cond = conditions[pos].name_day;
        };

        return `${name}, ${region}, ${country} ${dayornight_emoji}

🌡️ Temperatura: ${temp_c}°C | ${temp_f}°F
🍃 Sensação térmica: ${feelslike_c}°C | ${feelslike_f}°F
💧 Umidade: ${humidity}%
🌧️ Precipitação: ${precip_mm}mm
🔭 Condição: ${cond} ${conditions[pos].emoji}
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
    "ip": {
      resp: (ip) => { return `http://www.google.com/maps/place/${ip.data.latitude},${ip.data.longitude}\n\n✪ IP: ${ip.data.ip}\n\n✪ Tipo: ${ip.data.type}\n\n✪ Região: ${ip.data.region}\n\n✪ Cidade: ${ip.data.city}\n\n✪ Latitude: ${ip.data.latitude}\n\n✪ Longitude: ${ip.data.longitude}\n\n✪ Provedor: ${ip.data.isp}\n\n✪ Continente: ${ip.data.continent}\n\n✪ Sigla do continente: ${ip.data.continent_code}\n\n✪ País: ${ip.data.country}\n\n✪ Sigla do País: ${ip.data.country_code}\n\n✪ Capital do País: ${ip.data.country_capital}\n\n✪ DDI: ${ip.data.country_phone}\n\n✪ Países Vizinhos: ${ip.data.country_neighbours}\n\n✪ Fuso Horário: ${ip.data.timezone} ${ip.data.timezone_name} ${ip.data.timezone_gmt}\n\n✪ Moeda: ${ip.data.currency}\n\n✪ Sigla da Moeda: ${ip.data.currency_code}\n\n-=Busca de IP realizada por Lune Bot=-`; },
      notfound: () => { return `Não foi possivel encontrar o IP especificado. ❌`; },
    },
    "translate": {
      noLang: () => { return `Me desculpe, mas não foi possivel encontrar esta linguagem! ❌\n\nVocê pode encontrar a lista de linguagens aqui:\nhttps://anotepad.com/note/read/5xqahdy8`; },
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
    stickerMetadataVideo: (fps, end, keepScale, crop) => { return { stickerMetadata: true, author: '+55 (16) 99787-2383', pack: 'Lune Bot', fps: fps, startTime: '00:00:00.0', endTime: end, crop: crop, loop: 0, keepScale: keepScale }; },
    lang: () => { return `en`; },
    maxText: (max) => { return `Sorry, but the message cannot be longer than ${max} characters! ⚠️`; },
    maxCustom: (maxT) => { return `Sorry, but the message cannot be longer than ${maxT}! ⚠️`; },
    maxDuration: (max, maxType, mediaType) => {
      switch (maxType) {
        case 's': ;
          maxType = "second(s)";
          break;
        case 'm': ;
          maxType = "minute(s)";
          break;
        case 'h': ;
          maxType = "hour(s)";
          break;
        case 'ms': ;
          maxType = "millisecond(s)";
          break;
        case 'd': ;
          maxType = "day(s)";
          break;
      };
      mediaType = mediaType == 'aud' ? "audio" : "video"; return `Ops! The ${mediaType} has limit up to ${max} ${maxType}! ⚠️`;
    },
    tiers: () => {
      return [
        {
          name: "Copper",
          emoji: "🪙",
          lv: 0
        },
        {
          name: "Bronze I",
          emoji: "🥉",
          lv: 5
        },
        {
          name: "Bronze II",
          emoji: "🥉",
          lv: 10
        },
        {
          name: "Bronze III",
          emoji: "🥉",
          lv: 15
        },
        {
          name: "Bronze IV",
          emoji: "🥉",
          lv: 20
        },
        {
          name: "Bronze V",
          emoji: "🥉",
          lv: 25
        },
        {
          name: "Silver I",
          emoji: "🥈",
          lv: 30
        },
        {
          name: "Silver II",
          emoji: "🥈",
          lv: 35
        },
        {
          name: "Silver III",
          emoji: "🥈",
          lv: 40
        },
        {
          name: "Silver IV",
          emoji: "🥈",
          lv: 45
        },
        {
          name: "Silver V",
          emoji: "🥈",
          lv: 50
        },
        {
          name: "Gold I",
          emoji: "🥇",
          lv: 55
        },
        {
          name: "Gold II",
          emoji: "🥇",
          lv: 60
        },
        {
          name: "Gold III",
          emoji: "🥇",
          lv: 65
        },
        {
          name: "Gold IV",
          emoji: "🥇",
          lv: 70
        },
        {
          name: "Gold V",
          emoji: "🥇",
          lv: 75
        },
        {
          name: "Platinum I",
          emoji: "🎖️",
          lv: 80
        },
        {
          name: "Platinum II",
          emoji: "🎖️",
          lv: 85
        },
        {
          name: "Platinum III",
          emoji: "🎖️",
          lv: 90
        },
        {
          name: "Platinum IV",
          emoji: "🎖️",
          lv: 95
        },
        {
          name: "Platinum V",
          emoji: "🎖️",
          lv: 100
        },
        {
          name: "Diamond I",
          emoji: "💎",
          lv: 200
        },
        {
          name: "Diamond II",
          emoji: "💎",
          lv: 300
        },
        {
          name: "Diamond III",
          emoji: "💎",
          lv: 400
        },
        {
          name: "Diamond IV",
          emoji: "💎",
          lv: 500
        },
        {
          name: "Diamond V",
          emoji: "💎",
          lv: 600
        },
        {
          name: "Sapphire",
          emoji: "🟦",
          lv: 700
        },
        {
          name: "Emerald",
          emoji: "🟩",
          lv: 800
        },
        {
          name: "Ruby",
          emoji: "🟥",
          lv: 900
        },
        {
          name: "King",
          emoji: "👑",
          lv: 1000
        }
      ];
    },
    botIsntAdmin: () => { return `To use this command, I need to be a group admin! ⚠️`; },
    invalidOptions: (validOptions) => { var $ = `Choose a valid option! ⚠️\nList of options:`; validOptions.forEach((option) => { $ += `\n${option}`; }); return $; },
    cantfind: (arg) => { return `Oops! could not find ${arg}! ❌`; },
    onOrOff: () => { return `Set between "on" and "off"! ⚠️`; },
    isntURL: () => { return `This is not a URL! ❌`; },
    invalidURL: () => { return `Oops! Invalid link! ❌`; },
    minTries: (min) => { return `Put a minimum of ${min} attempts! ⚠️`; },
    maxTries: (max) => { return `Put a maximum number of attempts up to ${max}! ⚠️`; },
    getMounth: (mounth) => { switch (mounth) { case '01': ; return "January"; case '02': ; return "February"; case '03': ; return "March"; case '04': ; return "April"; case '05': ; return "May"; case '06': ; return "June"; case '07': ; return "July"; case '08': ; return "August"; case '09': ; return "September"; case '10': ; return "October"; case '11': ; return "November"; case '12': ; return "December"; }; },
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
      disabled: () => { return `Disabled ❌`; },
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
      forceUp: (pushname, xp, requiredXp, lvl, role, amount) => { `*「 FORCEUP 」*\n\n🖊️ *NAME:* ${pushname}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Level:* ${lvl}\n🧙‍♂️ *Classs:* ${role}\n\n_*You leveled up "${amount}" ${(amount - 1) == 0 ? "time" : "times"}!*_`; },
      tiersTop: () => { return `*RANK:*\n\n`; },
      tiers: (patent, emoji, lvl) => { return `${patent} ${emoji} - (Required level: ${lvl})\n\n`; },
      finalMsgTiers: (usr, lvl, xp, requiredXp) => { return `*User:* ${usr}\n*Level:* ${lvl}\n*XP:* ${xp}/${requiredXp}`; },
      actualChance: (chance) => { return `☘️ Current luck: ${chance}%`; },
      newLevel: (name, xp, requiredXp, lvl, role) => { return `*「 NEW LEVEL 」*\n\n🖊️ *NAME:* ${name}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Level:* ${lvl}\n🧙‍♂️ *Class:* ${role}\n\n_*The more you interact in the group, the higher your level!*_`; },
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
      resp: (usr, adm, estadoCivil, lvl, xp, xpRequired, role, isxp) => { return `*Profile data..* ✨️ \n\n🔖️ *Username:*\n${usr}\n\n👑️ *Administrator?*\n${adm}\n\n💕 *Marital status*: \n${estadoCivil}\n\n📈 *Level:*\n${isxp ? lvl : "XP System Disabled"}\n\n🕹️ *XP:*\n${isxp ? xp + "/" + xpRequired : "XP System Disabled"}\n\n🌐 *Rank:*\n${isxp ? role : "XP System Disabled"}`; },
      marriagedWith: (usr, coupleTime) => { return `Married to @${usr} for ${coupleTime == '0' ? '1' : coupleTime} day(s).`; },
    },
    "sys": {
      time: (h, m, s) => { return `${h} hours | ${m} minutes | ${s} seconds - HH:MM:SS`; },
      mem: (gb, mb, kb, allram) => { return `${gb}GB | ${mb}MB | ${kb}KB | ${allram} Bytes`; },
      resp: (speed, loadedMsgs, groups, chatIds, uptime, pcUptime, cpu, cpuSpeed, os, osArch, osPlatform, osRelease, ram, username, hostname, zapVer, owaVer, version, defaultPrefix, botNumber, owners, antispam, only_groups, save_musics) => {
        return `🐌 - Velocidade > ${speed} segundos

📊 - ${loadedMsgs} Mensagens após inicio

📱 - ${groups.length} Conversas em grupo

👥 - ${chatIds.length - groups.length} Conversas no PV

📈 - ${chatIds.length} Total de chats

#️⃣ Prefixo Padrão - ${defaultPrefix}

📞 Número do Bot - ${botNumber}

🫵 Dono(s) do Bot - ${owners.join(", ") || "Não definido"}

🔇 Anti-spam - ${antispam ? 'Habilitado' : 'Desabilitado'}

👥 Apenas Grupos - ${only_groups ? 'Habilitado' : 'Desabilitado'}

📥 Salvar Músicas - ${save_musics ? 'Habilitado' : 'Desabilitado'}

⌛ Bot Uptime - ${uptime}

💻​ PC Uptime - ${pcUptime}

🌡️ CPU - ${cpu} (${cpuSpeed} MHz)

🖥️ S.O - ${os} - ${osArch} (${osPlatform} V. ${osRelease})

💾 RAM - ${ram}\n\n👑 Username - ${username} (${hostname})

🪀 WhatsApp - Version ${zapVer}

📡 Open-WA - Version ${owaVer}

🌐 Bot - Version ${version}`;
      },
    },
    "death": {
      resp: (name, deathAge) => { return `People with the name "${name}" tend to die at ${deathAge} years of age!`; },
    },
    "ping": {
      resp: (speed, uptime) => { return `🏓 *PONG!*\n\n⏳ Ping: ${speed}ms\n\n⏳ Online Time: ${uptime}`; },
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
      resp: async (pk, translate) => {
        var txtPoke = {
          nm: '*Name*: ' + (pk.name.split('')[0].toUpperCase() + pk.name.slice(1)),
          desc: '*Description:*\n' + pk.description,
          typ: '*Type:* ' + pk.type,
          gr: '*Generation:* ' + pk.generation,
          egg: '*Egg group:* ' + pk.egg_groups.join(' - ').replace(/ - $/, ''),
          stt: '*Status:*\nHP: ' + pk.stats.hp + '\nAttack: ' + pk.stats.attack + '\nDefense: ' + pk.stats.defense + '\nSP Attack: ' + pk.stats.sp_atk + '\nSP Defense: ' + pk.stats.sp_def + '\nSpeed: ' + pk.stats.speed + '\nTotal: ' + pk.stats.total,
          fml: '*Evolution:* ' + pk.family.evolutionStage + '',
          gend: '*Gender:*\n' + (pk.gender.join(', ').replace(/, $/, '')),
          hab: '*Abilities:* ' + pk.abilities.join(' - ').replace(/ - $/, ''),
          tam: '*Height:* ' + pk.height,
          pes: '*Weight:* ' + pk.weight,
          esp: '*Category:* ' + (pk.species.join(', ').replace(/, $/, '')),
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
      alone: () => { return `Single`; },
      youArentMarried: () => { return `You are not married to anyone!`; },
      thisUserArentMarried: () => { return `It appears this user is not married yet!`; },
      couple: (req, usr1, usr2, time) => { return `Hi @${req}, User @${usr1} has been married to @${usr2} for ${time} days!`; },
      selfCouple: (req, usr1, time) => { return `Hi @${req}, you've been married to @${usr1} for ${time} days!`; },
      dontMarriedToDivorce: () => { return `You are not married to anyone to divorce!`; },
      marry: (usr1, usr2, day, mounth, year) => {
        return `` +
          `═════════「💍」═════════\n` +
          `          Wedding certificate \n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `This document officially certifies\n` +
          `🌹@${usr1} & 🌷@${usr2}\n` +
          `are united in the sacred bond of matrimony.\n` +
          `\n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `_Marriage is more than going up on an altar and Proclaiming love forever._\n` +
          `_Marriage is more than exchanging "toothbrushes", as they say, lately._\n` +
          `_Marriage is concrete proof that love is an art._\n` +
          `_And somehow today, I always want to marry you..._\n` +
          `_For me this love is different, it's not past paper, it's present paper love._\n` +
          `\n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `        Marriage Held on ${day},\n` +
          `             ${mounth}, ${year}\n\n` +
          `               By: *Lune Bot*\n` +
          `\n` +
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
      info: ({ groupname, totalMem, welgrp, lzex, xpgp, autostk, prefix, desc, gpOwner, admgp }) => { return `*${groupname}*\n\n*Number of Members: ${totalMem}*\n\n*Welcome: ${welgrp}*\n\n*Anti-Link: ${lzex}*\n\n*XP: ${xpgp}*\n\n*Autosticker: ${autostk}*\n\n*Prefix: ${prefix}*\n\n______________________________\n*Description:*\n ${desc}\n______________________________\n\n*Owner:* @${gpOwner.replace("@c.us", "")}\n\n*Administrators:*\n${admgp}`; },
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
      ban: () => { return `*⚠️ WARNING ⚠️*\n\nAnti-spam system enabled!\n\nFor the next 12 hours you will not be able to interact with me!"` }
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
      resp: (title, duration) => { return `*Downloading audio...*\n\n*Title:* ${title}\n\n*Duration:* ${duration}`; },
      noVideoFound: () => { return `Could not find a matching video! ❌`; },
    },
    "mi": {
      resp: (resp) => { return `Title: ${resp.titulo}\nProducer: ${resp.produtora}\nDuration: ${resp.duracao}\nRelease: ${resp.lancamento}\nAlbum: ${resp.album}\nArtists: ${resp.artistas}`; },
      cantIdentify: () => { return `Oops! Could not identify the song! ❌`; },
    },
    "video": {
      resp: (title, duration) => { return `*Downloading video...*\n\n*Title:* ${title}\n\n*Duration:* ${duration}`; },
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
      resp: (resp) => { return `Title: ${resp.title}\nProducer: ${resp.producer}\nDuration: ${resp.duration}\nRelease: ${resp.lancamento}\nAlbum: ${resp.album}\nArtists: ${resp.artists}`; },
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

        var code = condition.code;
        var condition = condition.text;

        var conditions = [
          {
            code: 1000,
            emoji: "☀️",
            name_day: "Sunny",
            name_night: "Clear"
          },
          {
            code: 1003,
            emoji: "☁️",
            name_day: "Partly Cloudy",
            name_night: "Partly Cloudy"
          },
          {
            code: 1006,
            emoji: "🌤️",
            name_day: "Cloudy",
            name_night: "Cloudy"
          },
          {
            code: 1009,
            emoji: "⛅",
            name_day: "Overcast",
            name_night: "Overcast"
          },
          {
            code: 1030,
            emoji: "🌥️",
            name_day: "Mist",
            name_night: "Mist"
          },
          {
            code: 1063,
            emoji: "🌫️",
            name_day: "Patchy rain nearby",
            name_night: "Patchy rain nearby"
          },
          {
            code: 1066,
            emoji: "🌧️",
            name_day: "Patchy snow nearby",
            name_night: "Patchy snow nearby"
          },
          {
            code: 1069,
            emoji: "🌨️❄️",
            name_day: "Patchy sleet nearby",
            name_night: "Patchy sleet nearby"
          },
          {
            code: 1072,
            emoji: "🌨️💧",
            name_day: "Patchy freezing drizzle nearby",
            name_night: "Patchy freezing drizzle nearby"
          },
          {
            code: 1087,
            emoji: "🌧️❄️",
            name_day: "Thundery outbreaks in nearby",
            name_night: "Thundery outbreaks in nearby"
          },
          {
            code: 1114,
            emoji: "⛈️",
            name_day: "Blowing snow",
            name_night: "Blowing snow"
          },
          {
            code: 1117,
            emoji: "💨🌨️",
            name_day: "Blizzard",
            name_night: "Blizzard"
          },
          {
            code: 1135,
            emoji: "🌨️🌫️",
            name_day: "Fog",
            name_night: "Fog"
          },
          {
            code: 1147,
            emoji: "🌫️",
            name_day: "Freezing fog",
            name_night: "Freezing fog"
          },
          {
            code: 1150,
            emoji: "🌫️❄️",
            name_day: "Patchy light drizzle",
            name_night: "Patchy light drizzle"
          },
          {
            code: 1153,
            emoji: "🌧️💧",
            name_day: "Light drizzle",
            name_night: "Light drizzle"
          },
          {
            code: 1168,
            emoji: "💧",
            name_day: "Freezing drizzle",
            name_night: "Freezing drizzle"
          },
          {
            code: 1171,
            emoji: "💧❄️",
            name_day: "Heavy freezing drizzle",
            name_night: "Heavy freezing drizzle"
          },
          {
            code: 1180,
            emoji: "🌧️💧❄️",
            name_day: "Patchy light rain",
            name_night: "Patchy light rain"
          },
          {
            code: 1183,
            emoji: "🌧️💧",
            name_day: "Light rain",
            name_night: "Light rain"
          },
          {
            code: 1186,
            emoji: "🌧️",
            name_day: "Moderate rain at times",
            name_night: "Moderate rain at times"
          },
          {
            code: 1189,
            emoji: "🌧️",
            name_day: "Moderate rain",
            name_night: "Moderate rain"
          },
          {
            code: 1192,
            emoji: "🌧️",
            name_day: "Heavy rain at times",
            name_night: "Heavy rain at times"
          },
          {
            code: 1195,
            emoji: "🌧️🌧️",
            name_day: "Heavy rain",
            name_night: "Heavy rain"
          },
          {
            code: 1198,
            emoji: "🌧️🌧️",
            name_day: "Light freezing rain",
            name_night: "Light freezing rain"
          },
          {
            code: 1201,
            emoji: "🌧️💧❄️",
            name_day: "Moderate or heavy freezing rain",
            name_night: "Moderate or heavy freezing rain"
          },
          {
            code: 1204,
            emoji: "⛈️❄️",
            name_day: "Light sleet",
            name_night: "Light sleet"
          },
          {
            code: 1207,
            emoji: "🌧️💧🌨️",
            name_day: "Moderate or heavy sleet",
            name_night: "Moderate or heavy sleet"
          },
          {
            code: 1210,
            emoji: "🌧️🌨️",
            name_day: "Patchy light snow",
            name_night: "Patchy light snow"
          },
          {
            code: 1213,
            emoji: "🌨️",
            name_day: "Light snow",
            name_night: "Light snow"
          },
          {
            code: 1216,
            emoji: "🌨️",
            name_day: "Patchy moderate snow",
            name_night: "Patchy moderate snow"
          },
          {
            code: 1219,
            emoji: "🌨️",
            name_day: "Moderate snow",
            name_night: "Moderate snow"
          },
          {
            code: 1222,
            emoji: "🌨️",
            name_day: "Patchy heavy snow",
            name_night: "Patchy heavy snow"
          },
          {
            code: 1225,
            emoji: "🌨️",
            name_day: "Heavy snow",
            name_night: "Heavy snow"
          },
          {
            code: 1237,
            emoji: "🌨️🌫️",
            name_day: "Ice pellets",
            name_night: "Ice pellets"
          },
          {
            code: 1240,
            emoji: "🧊",
            name_day: "Light rain shower",
            name_night: "Light rain shower"
          },
          {
            code: 1243,
            emoji: "💧💧",
            name_day: "Moderate or heavy rain shower",
            name_night: "Moderate or heavy rain shower"
          },
          {
            code: 1246,
            emoji: "💧💧💧",
            name_day: "Torrential rain shower",
            name_night: "Torrential rain shower"
          },
          {
            code: 1249,
            emoji: "⛈️🌊",
            name_day: "Light sleet showers",
            name_night: "Light sleet showers"
          },
          {
            code: 1252,
            emoji: "🌊💧🌨️",
            name_day: "Moderate or heavy sleet showers",
            name_night: "Moderate or heavy sleet showers"
          },
          {
            code: 1255,
            emoji: "🌊🌨️",
            name_day: "Light snow showers",
            name_night: "Light snow showers"
          },
          {
            code: 1258,
            emoji: "🌧️💧🌨️",
            name_day: "Moderate or heavy snow showers",
            name_night: "Moderate or heavy snow showers"
          },
          {
            code: 1261,
            emoji: "🌧️🌨️",
            name_day: "Light showers of ice pellets",
            name_night: "Light showers of ice pellets"
          },
          {
            code: 1264,
            emoji: "🌊💧🧊",
            name_day: "Moderate or heavy showers of ice pellets",
            name_night: "Moderate or heavy showers of ice pellets"
          },
          {
            code: 1273,
            emoji: "🌊🧊",
            name_day: "Patchy light rain in area with thunder",
            name_night: "Patchy light rain in area with thunder"
          },
          {
            code: 1276,
            emoji: "🌧️💧⚡",
            name_day: "Moderate or heavy rain in area with thunder",
            name_night: "Moderate or heavy rain in area with thunder"
          },
          {
            code: 1279,
            emoji: "🌧️⚡",
            name_day: "Patchy light snow in area with thunder",
            name_night: "Patchy light snow in area with thunder"
          },
          {
            code: 1282,
            emoji: "🌨️💧⚡",
            name_day: "Moderate or heavy snow in area with thunder",
            name_night: "Moderate or heavy snow in area with thunder"
          }
        ];

        var pos = -1;
        var found = false;
        for (let i = 0; i < conditions.length; i++) {
          if (conditions[i].code == code && !found) {
            pos = i;
            found = true;
          };
        };

        var cond;
        if (is_day == 1) {
          cond = conditions[pos].name_night;
        } else {
          cond = conditions[pos].name_day;
        };

        return `*${name}, ${region}, ${country} ${dayornight_emoji}*

🌡️ Temperature: ${temp_c}°C | ${temp_f}°F
🍃 Thermal sensation: ${feelslike_c}°C | ${feelslike_f}°F
💧 Humidity: ${humidity}%
🌧️ Precipitation: ${precip_mm}mm
🔭 Condition: ${cond} ${conditions[pos].emoji}
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
    "ip": {
      resp: (ip) => { return `http://www.google.com/maps/place/${ip.data.latitude},${ip.data.longitude}\n\n✪ IP: ${ip.data.ip}\n\n✪ Type: ${ip.data.type}\n\n✪ Region: ${ip.data.region}\n\n✪ City: ${ip.data.city}\n\n✪ Latitude: ${ip.data.latitude}\n\n✪ Longitude: ${ip.data.longitude}\n\n✪ Provider: ${ip.data.isp}\n\n✪ Continent: ${ip.data.continent} \n\n✪ Continent Acronym: ${ip.data.continent_code}\n\n✪ Country: ${ip.data.country}\n\n✪ Country Acronym: ${ip.data.country_code}\n\n✪ Country Capital: ${ip.data.country_capital}\n\n✪ DDI: ${ip.data.country_phone}\n\n✪ Neighboring Countries: ${ip.data.country_neighbours}\n\n✪ Timezone: ${ip.data.timezone} ${ip.data.timezone_name} ${ip.data.timezone_gmt}\n\n✪ Currency: ${ip.data.currency}\n\n✪ Acronym from Currency: ${ip.data.currency_code}\n\n-=IP lookup performed by Lune Bot=-`; },
      notfound: () => { return `The specified IP could not be found. ❌`; },
    },
    "translate": {
      noLang: () => { return `I'm sorry, but this language could not be found! ❌\n\nYou can find the list of languages here:\nhttps://anotepad.com/note/read/5xqahdy8`; },
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
      returnURL: (oScanUrl, spam, malware, suspicious, unsafe, adult, risk) => { return `Domain: ${oScanUrl.domain}\n*IP Address:* ${oScanUrl.ip_address}\n*Spam:* ${spam}\n*Malware:* ${malware}\n*Suspicious:* ${suspicious}\n*Not Safe:* ${unsafe}\n*+18:* ${adult}\n\n*Risk level:* ${risk}`; },
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
    stickerMetadataVideo: (fps, end, keepScale, crop) => { return { stickerMetadata: true, author: '+55 (16) 99787-2383', pack: 'Lune Bot', fps: fps, startTime: '00:00:00.0', endTime: end, crop: crop, loop: 0, keepScale: keepScale }; },
    lang: () => { return `es`; },
    maxText: (max) => { return `Lo siento, ¡pero el mensaje no puede tener más de ${max} personajes! ⚠️`; },
    maxCustom: (maxT) => { return `Lo siento, ¡pero el mensaje no puede tener más que ${maxT}! ⚠️`; },
    maxDuration: (max, maxType, mediaType) => {
      switch (maxType) {
        case 's': ;
          maxType = "segundo(s)";
          break;
        case 'm': ;
          maxType = "minuto(s)";
          break;
        case 'h': ;
          maxType = "hora(s)";
          break;
        case 'ms': ;
          maxType = "milésimo(s)";
          break;
        case 'd': ;
          maxType = "día(s)";
          break;
      };
      mediaType = mediaType == 'aud' ? "audio" : "video"; return `¡Ops! ¡El ${mediaType} No puede contener más de ${max} ${maxType} deduración! ⚠️`;
    },
    tiers: () => {
      return [
        {
          name: "Copper",
          emoji: "🪙",
          lv: 0
        },
        {
          name: "Bronze I",
          emoji: "🥉",
          lv: 5
        },
        {
          name: "Bronze II",
          emoji: "🥉",
          lv: 10
        },
        {
          name: "Bronze III",
          emoji: "🥉",
          lv: 15
        },
        {
          name: "Bronze IV",
          emoji: "🥉",
          lv: 20
        },
        {
          name: "Bronze V",
          emoji: "🥉",
          lv: 25
        },
        {
          name: "Silver I",
          emoji: "🥈",
          lv: 30
        },
        {
          name: "Silver II",
          emoji: "🥈",
          lv: 35
        },
        {
          name: "Silver III",
          emoji: "🥈",
          lv: 40
        },
        {
          name: "Silver IV",
          emoji: "🥈",
          lv: 45
        },
        {
          name: "Silver V",
          emoji: "🥈",
          lv: 50
        },
        {
          name: "Gold I",
          emoji: "🥇",
          lv: 55
        },
        {
          name: "Gold II",
          emoji: "🥇",
          lv: 60
        },
        {
          name: "Gold III",
          emoji: "🥇",
          lv: 65
        },
        {
          name: "Gold IV",
          emoji: "🥇",
          lv: 70
        },
        {
          name: "Gold V",
          emoji: "🥇",
          lv: 75
        },
        {
          name: "Platinum I",
          emoji: "🎖️",
          lv: 80
        },
        {
          name: "Platinum II",
          emoji: "🎖️",
          lv: 85
        },
        {
          name: "Platinum III",
          emoji: "🎖️",
          lv: 90
        },
        {
          name: "Platinum IV",
          emoji: "🎖️",
          lv: 95
        },
        {
          name: "Platinum V",
          emoji: "🎖️",
          lv: 100
        },
        {
          name: "Diamond I",
          emoji: "💎",
          lv: 200
        },
        {
          name: "Diamond II",
          emoji: "💎",
          lv: 300
        },
        {
          name: "Diamond III",
          emoji: "💎",
          lv: 400
        },
        {
          name: "Diamond IV",
          emoji: "💎",
          lv: 500
        },
        {
          name: "Diamond V",
          emoji: "💎",
          lv: 600
        },
        {
          name: "Sapphire",
          emoji: "🟦",
          lv: 700
        },
        {
          name: "Emerald",
          emoji: "🟩",
          lv: 800
        },
        {
          name: "Ruby",
          emoji: "🟥",
          lv: 900
        },
        {
          name: "King",
          emoji: "👑",
          lv: 1000
        }
      ];
    },
    botIsntAdmin: () => { return `Para usar este comando, ¡necesito ser un administrador grupal! ⚠️`; },
    invalidOptions: (validOptions) => { var $ = `¡Elija una opción válida! ⚠️\nLista de opciones:`; validOptions.forEach((option) => { $ += `\n${option}`; }); return $; },
    cantfind: (arg) => { return `¡Ups! ¡No fue posible encontrar ${arg}! ❌`; },
    onOrOff: () => { return `¡Defina entre "On" y "Off"! ⚠️`; },
    isntURL: () => { return `¡Esta no es una URL! ❌`; },
    invalidURL: () => { return `¡Ups!Link no válido! ❌`; },
    minTries: (min) => { return `coloqueNoMínimoDe ${min}Tentativas! ⚠️`; },
    maxTries: (max) => { return `Poner un número máximo de intentos hasta ${max}! ⚠️`; },
    getMounth: (mounth) => { switch (mounth) { case '01': ; return "Enero"; case '02': ; return "Febrero"; case '03': ; return "Marzo"; case '04': ; return "Abril"; case '05': ; return "Mayo"; case '06': ; return "Junio"; case '07': ; return "Julio"; case '08': ; return "Agosto"; case '09': ; return "Septiembre"; case '10': ; return "Octubre"; case '11': ; return "Noviembre"; case '12': ; return "Diciembre"; }; },
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
      forceUp: (pushname, xp, requiredXp, lvl, role, amount) => { `*「 FORCEUP 」*\n\n🖊️ *NOME:* ${pushname}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Nivel:* ${lvl}\n🧙‍♂️ *Classe:* ${role}\n\n_*Você subiu "${amount}" ${(amount - 1) == 0 ? "nível" : "níveis"}!*_`; },
      tiersTop: () => { return `*PATENTES:*\n\n`; },
      tiers: (patent, emoji, lvl) => { return `${patent} ${emoji} - (Nível necessário: ${lvl})\n\n`; },
      finalMsgTiers: (usr, lvl, xp, requiredXp) => { return `*Usuário:* ${usr}\n*Seu nivel:* ${lvl}\n*Seu XP:* ${xp}/${requiredXp}`; },
      actualChance: (chance) => { return `☘️ Chance atual: ${chance}%`; },
      newLevel: (name, xp, requiredXp, lvl, role) => { return `*「 NOVO NIVEL 」*\n\n🖊️ *NOME:* ${name}\n💠 *XP:* ${xp} / ${requiredXp}\n📊 *Nivel:* ${lvl}\n🧙‍♂️ *Classe:* ${role}\n\n_*Quanto mais você interage no grupo, mais alto é o seu nível!*_`; },
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
      resp: (usr, adm, estadoCivil, lvl, xp, xpRequired, role, isxp) => { return `*Dados do perfil..* ✨️ \n\n🔖️ *Nome de usuário:*\n${usr}\n\n👑️ *Administrador?*\n${adm}\n\n💕 *Estado civil*:\n${estadoCivil}\n\n📈 *Level:*\n${isxp ? lvl : "Sistema de XP desativado"}\n\n🕹️ *XP:*\n${isxp ? xp + "/" + xpRequired : "Sistema de XP desativado"}\n\n🌐 *Patente:*\n${isxp ? role : "Sistema de XP desativado"}`; },
      marriagedWith: (usr, coupleTime) => { return `Casado(a) com @${usr} há ${coupleTime == '0' ? '1' : coupleTime} dia(s).`; },
    },
    "sys": {
      time: (h, m, s) => { return `${h} horas | ${m} minutos | ${s} segundos - HH:MM:SS`; },
      mem: (gb, mb, kb, allram) => { return `${gb}GB | ${mb}MB | ${kb}KB | ${allram} Bytes`; },
      resp: (speed, loadedMsgs, groups, chatIds, uptime, pcUptime, cpu, cpuSpeed, os, osArch, osPlatform, osRelease, ram, username, hostname, zapVer, owaVer, version, defaultPrefix, botNumber, owners, antispam, only_groups, save_musics) => {
        return `🐌 - Velocidade > ${speed} segundos

📊 - ${loadedMsgs} Mensagens após inicio

📱 - ${groups.length} Conversas em grupo

👥 - ${chatIds.length - groups.length} Conversas no PV

📈 - ${chatIds.length} Total de chats

#️⃣ Prefixo Padrão - ${defaultPrefix}

📞 Número do Bot - ${botNumber}

🫵 Dono(s) do Bot - ${owners.join(", ") || "Não definido"}

🔇 Anti-spam - ${antispam ? 'Habilitado' : 'Desabilitado'}

👥 Apenas Grupos - ${only_groups ? 'Habilitado' : 'Desabilitado'}

📥 Salvar Músicas - ${save_musics ? 'Habilitado' : 'Desabilitado'}

⌛ Bot Uptime - ${uptime}

💻​ PC Uptime - ${pcUptime}

🌡️ CPU - ${cpu} (${cpuSpeed} MHz)

🖥️ S.O - ${os} - ${osArch} (${osPlatform} V. ${osRelease})

💾 RAM - ${ram}\n\n👑 Username - ${username} (${hostname})

🪀 WhatsApp - Version ${zapVer}

📡 Open-WA - Version ${owaVer}

🌐 Bot - Version ${version}`;
      },
    },
    "death": {
      resp: (name, deathAge) => { return `Pessoas com o nome "${name}" tendem a morrer aos ${deathAge} anos de idade!`; },
    },
    "ping": {
      resp: (speed, uptime) => { return `🏓 *PONG!*\n\n⏳ Ping: ${speed}ms\n\n⏳ Tempo Online: ${uptime}`; },
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
      resp: async (pk, translate) => {
        var txtPoke = {
          nm: '*Name*: ' + (pk.name.split('')[0].toUpperCase() + pk.name.slice(1)),
          desc: '*Description:*\n' + pk.description,
          typ: '*Type:* ' + pk.type,
          gr: '*Generation:* ' + pk.generation,
          egg: '*Egg group:* ' + pk.egg_groups.join(' - ').replace(/ - $/, '').replace("Undiscovered", "Não descoberto"),
          stt: '*Status:*\nHP: ' + pk.stats.hp + '\nAttack: ' + pk.stats.attack + '\nDefense: ' + pk.stats.defense + '\nSP Attack: ' + pk.stats.sp_atk + '\nSP Defense: ' + pk.stats.sp_def + '\nSpeed: ' + pk.stats.speed + '\nTotal: ' + pk.stats.total,
          fml: '*Evolution:* ' + pk.family.evolutionStage + '',
          gend: '*Gender:*\n' + (pk.gender.join(', ').replace(/, $/, '')),
          hab: '*Abilities:* ' + pk.abilities.join(' - ').replace(/ - $/, ''),
          tam: '*Height:* ' + pk.height,
          pes: '*Weight:* ' + pk.weight,
          esp: '*Category:* ' + (pk.species.join(', ').replace(/, $/, '')),
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
      alone: () => { return `Solteiro(a)`; },
      youArentMarried: () => { return `Você não está casado(a) com ninguém!`; },
      thisUserArentMarried: () => { return `Parece este usuário não está casado(a) ainda!`; },
      couple: (req, usr1, usr2, time) => { return `Olá @${req}, o usuário @${usr1} está casado(a) com @${usr2} há ${time} dias!`; },
      selfCouple: (req, usr1, time) => { return `Olá @${req}, você está casado(a) com @${usr1} há ${time} dias!`; },
      dontMarriedToDivorce: () => { return `Você não está casado(a) com ninguém para se divorciar!`; },
      marry: (usr1, usr2, day, mounth, year) => {
        return `` +
          `═════════「💍」═════════\n` +
          `          Certidão de Casamento\n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `Este documento certifica oficialmente que\n` +
          `🌹@${usr1} & 🌷@${usr2}\n` +
          `uniram-se no laço sagrado do matrimônio.\n` +
          `\n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `_Casamento é mais que subir em um altar e Proclamar amar eternamente._\n` +
          `_Casamento é mais que trocar as “escovas de dentes”, como falam, ultimamente._\n` +
          `_Casamento é a comprovação concreta que o amor é uma arte._\n` +
          `_E de alguma maneira hoje, quero sempre me casar com você..._\n` +
          `_Para mim este amor é diferente, não é de papel passado, é amor de papel presente._\n` +
          `\n` +
          `═════════「💍」═════════\n` +
          `\n` +
          `      Casamento realizado dia ${day}\n` +
          `           de ${mounth} de ${year}\n\n` +
          `             Por: *Lune Bot*\n` +
          `\n` +
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
      info: ({ groupname, totalMem, welgrp, lzex, xpgp, autostk, prefix, desc, gpOwner, admgp }) => { return `*${groupname}*\n\n*Quantidade de Membros: ${totalMem}*\n\n*Welcome: ${welgrp}*\n\n*Anti-Link:  ${lzex}*\n\n*XP: ${xpgp}*\n\n*Autosticker: ${autostk}*\n\n*Prefixo: ${prefix}*\n\n______________________________\n*Descrição:*\n ${desc}\n______________________________\n\n*Dono:* @${gpOwner.replace("@c.us", "")}\n\n*Administradores:*\n${admgp}`; },
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
      onlyOneEmoji: () => { return `Lo siento, ¡envía solo un emoji a la vez!`; },
    },
    "antispam": {
      ban: () => { return `*⚠️ AVISO ⚠️*\n\n¡Sistema Anti-Spam habilitado!\n\n¡En las próximas 12 horas no podrás interactuar conmigo!"` }
    },
    "slap": {
      resp: (usr1, usr2) => { return `@${usr1} golpeó ${usr2}!`; },
      noUser: () => { return `¡Uso incorrecto! ¡Use *slap @usuário*! ❌`; },
      self: (user) => { return `@${user} golpeó a ti mismo!`; },
    },
    "sleep": {
      resp: (user) => { return `@${user} esta durmiendo!`; },
    },
    "gift": {
      doYouWin: (usr, gift) => { return `${usr}, recibirás ${gift} por tu cumpleaños!\n\n¡Felicidades!`; },
    },
    "wakeup": {
      resp: (user) => { return `@${user} desperto!`; },
    },
    "hug": {
      resp: (usr1, usr2) => { return `@${usr1} abrazó @${usr2}!`; },
      self: (user) => { return `@${user} abrazó a ti mismo`; },
    },
    "kiss": {
      resp: (usr1, usr2) => { return `@${usr1} besó ${usr2}!`; },
      self: (user) => { return `@${user} bésate a ti mismo`; },
    },
    "kill": {
      resp: (usr1, usr2) => { return `@${usr1} nosotros ${usr2}!`; },
      self: (user) => { return `@${user} se suicidó!`; },
    },
    "gender": {
      resp: (gender, name) => { return `¡El nombre "${name}"es más utilizado por ${gender}!`; },
      female: () => { return `mujer`; },
      male: () => { return `hombres`; },
    },
    "ship": {
      resp: (usr1, usr2, percent) => {
        if (percent == 100) {
          return `💞 ${usr1} & ${usr2} 💞\nY el resultado es:\n${percent}%\n¡Los dos fueron hechos el uno para el otro!💖`;
        } else if (percent == 50) {
          return `💞 ${usr1} & ${usr2} 💞\nY el resultado es:\n${percent}%\nMitad a mitad... 🥀`;
        } else if (percent == 0) {
          return `💞 ${usr1} & ${usr2} 💞\nY el resultado es:\n${percent}%\nEstos dos no se sirven entre sí!💔`;
        } else {
          return `💞 ${usr1} & ${usr2} 💞\nY el resultado es:\n${percent}%`;
        };
      },
    },
    "revoke": {
      resp: () => { return `Enlace grupal revocado con éxito! ✅`; },
    },
    "tts": {
      wrongUse: (cmd) => { return `¡Uso incorrecto! ¡Use *${cmd}* <es> marcando un mensaje! ❌\n\nPuedes encontrar la lista de idiomas aquí:\nhttps://anotepad.com/note/read/5xqahdy8`; },
      unknownLang: () => { return `¡Ups! Lenguaje no reconocido! ❌\n\nPuedes encontrar la lista de idiomas aquí:\nAfrikaans: "af"\nAlbanian: "sq"\nAmharic: "am"\nArabic: "ar"\nArmenian: "hy"\nAzerbaijani: "az"\nBasque: "eu"\nBelarusian: "be"\nBengali: "bn"\nBosnian: "bs"\nBulgarian: "bg"\nCatalan: "ca"\nCebuano: "ceb"\nChichewa: "ny"\n"Chinese Simplified": "zh-cn"\n"Chinese Traditional": "zh-tw"\nCorsican: "co"\nCroatian: "hr"\nCzech: "cs"\nDanish: "da"\nDutch: "nl"\nEnglish: "en"\nEsperanto: "eo"\nEstonian: "et"\nFilipino: "tl"\nFinnish: "fi"\nFrench: "fr"\nFrisian: "fy"\nGalician: "gl"\nGeorgian: "ka"\nGerman: "de"\nGreek: "el"\nGujarati: "gu"\n"Haitian Creole": "ht"\nHausa: "ha"\nHawaiian: "haw"\nHebrew: "iw"\nHindi: "hi"\nHmong: "hmn"\nHungarian: "hu"\nIcelandic: "is"\nIgbo: "ig"\nIndonesian: "id"\nIrish: "ga"\nItalian: "it"\nJapanese: "ja"\nJavanese: "jw"\nKannada: "kn"\nKazakh: "kk"\nKhmer: "km"\nKorean: "ko"\n"Kurdish (Kurmanji)": "ku"\nKyrgyz: "ky"\nLao: "lo"\nLatin: "la"\nLatvian: "lv"\nLithuanian: "lt"\nLuxembourgish: "lb"\nMacedonian: "mk"\nMalagasy: "mg"\nMalay: "ms"\nMalayalam: "ml"\nMaltese: "mt"\nMaori: "mi"\nMarathi: "mr"\nMongolian: "mn"\n"Myanmar (Burmese)": "my"\nNepali: "ne"\nNorwegian: "no"\nPashto: "ps"\nPersian: "fa"\nPolish: "pl"\nPortuguese: "pt"\nPunjabi: "ma"\nRomanian: "ro"\nRussian: "ru"\nSamoan: "sm"\n"Scots Gaelic": "gd"\nSerbian: "sr"\nSesotho: "st"\nShona: "sn"\nSindhi: "sd"\nSinhala: "si"\nSlovak: "sk"\nSlovenian: "sl"\nSomali: "so"\nSpanish: "es"\nSundanese: "su"\nSwahili: "sw"\nSwedish: "sv"\nTajik: "tg"\nTamil: "ta"\nTelugu: "te"\nThai: "th"\nTurkish: "tr"\nUkrainian: "uk"\nUrdu: "ur"\nUyghur: "ug"\nUzbek: "uz"\nVietnamese: "vi"\nWelsh: "cy"\nXhosa: "xh"\nYiddish: "yi"\nYoruba: "yo"\nZulu: "zu"`; },
    },
    "play": {
      resp: (title, duration) => { return `*Descargando audio...*\n\n*Título:* ${title}\n\n*Duración:* ${duration}`; },
      noVideoFound: () => { return `¡No fue posible encontrar un video correspondiente! ❌`; },
    },
    "mi": {
      resp: (resp) => { return `Titulo: ${resp.titulo}\nProductor: ${resp.produtora}\nDuración: ${resp.duracao}\nLanzamiento: ${resp.lancamento}\nÁlbum: ${resp.album}\nArtistas: ${resp.artistas}`; },
      cantIdentify: () => { return `¡Ups! ¡No fue posible identificar la canción! ❌`; },
    },
    "video": {
      resp: (title, duration) => { return `*Descargando video...*\n\n*Título:* ${title}\n\n*Duración:* ${duration}`; },
      noVideoFound: () => { return `¡No fue posible encontrar un video correspondiente! ❌`; },
    },
    "upimg": {
      success: (url) => { return `¡Enlace generado con éxito!\n\n*Nota:* ¡Este enlace dura 7 días, después de eso, la imagen se eliminará automáticamente del servidor!\n\n${url}`; },
    },
    "giveaway": {
      resp: (duration, prize, prefix) => { return `🎉 *SORTEO* 🎉\n\n*Duración:* ${duration}\n*Premio:* ${prize}\n¡Envie ${prefix}participar para participar en el sorteo!`; },
      noParticipants: () => { return `¡No había suficientes personas para completar el sorteo! ❌` },
      winner: (winner) => { return `¡Felicidades *@${winner.id}* ¡Eres el ganador del sorteo! 🥳🎉`; },
      invalidTime: () => { return `¡El tiempo que definiste no es válido! ❌\nUtilizar: "d" para día, "h" para hora, "m" para minutos, "s" para segundo!\nEjemplo: 10m`; },
      noGiveaway: () => { return `¡No se celebra un atractivo en este momento! ⚠️`; },
      wrongUse(cmd) { return `¡Uso incorrecto! ¡Enviar *${cmd}* (hora que dure el sorteo) (premio)! ❌`; },
      alreadyOnGiveaway: () => { return `¡Ya estás participando en el sorteo!`; },
      joinedList: () => { return `¡Ingresaste a la lista de dibujos!`; },
    },
    "musicidentify": {
      resp: (resp) => { return `Título: ${resp.titulo}\nProductor: ${resp.produtora}\nDuración: ${resp.duracao}\nLanzamiento: ${resp.lancamento}\nÁlbum: ${resp.album}\nArtistas: ${resp.artistas}`; },
      cantIdentify: () => { return `¡Ups! ¡No fue posible identificar la canción! ❌`; },
      wrongFormatOrTime: (time, timeType) => { return `¡Ups! ¡Use un audio o video con menos de ${time} ${timeType}! ⚠️`; },
    },
    "cot": {
      coins: {
        default_coin: 'Dólar Americano',
        coins: [
          { coin: 'USD-EUR', emoji: '🇪🇺', name: 'Euro' },
          { coin: 'USD-GBP', emoji: '🇬🇧', name: 'Libra Esterlina' },
          { coin: 'USD-BRL', emoji: '🇧🇷', name: 'Real Brasileño' },
          { coin: 'USD-CHF', emoji: '🇨🇭', name: 'Franco Suizo' },
          { coin: 'USD-TRY', emoji: '🇹🇷', name: 'Nueva Lira Turca' },
          { coin: 'USD-CAD', emoji: '🇨🇦', name: 'Dólar Canadiense' },
          { coin: 'USD-AUD', emoji: '🇦🇺', name: 'Dólar Australiano' },
          { coin: 'USD-CNY', emoji: '🇨🇳', name: 'Yuan Chino' },
          { coin: 'USD-RUB', emoji: '🇷🇺', name: 'Rublo Ruso' },
          { coin: 'USD-JPY', emoji: '🇯🇵', name: 'Yen Japonés' },
          { coin: 'USD-ARS', emoji: '🇦🇷', name: 'Peso Argentino' },
          { coin: 'USD-MXN', emoji: '🇲🇽', name: 'Peso Mexicano' },
          { coin: 'BTC-USD', emoji: '💻', name: 'Bitcoin' },
        ],
      },
      resp: (coins) => {
        var _finalStr = "*Cotización actual: 💎💰🤑💹*\n";

        coins.forEach((val) => {
          _finalStr += `\n\n${val}`;
        });
        _finalStr += "\n\n\n_By: Lune Bot_";

        return _finalStr;
      },
    },
    "weather": {
      url: (query, key) => { return `http://api.weatherapi.com/v1/current.json?key=${key}&lang=es&q=${encodeURIComponent(query)}`; },
      resp: ({ current, location }) => {
        var { condition, temp_c, temp_f, is_day, wind_kph, wind_mph, humidity, feelslike_c, feelslike_f, last_updated, precip_mm } = current;
        var { name, region, country, localtime } = location;
        var dayornight_emoji = is_day == 1 ? '☀️' : '🌙';

        var code = condition.code;
        var condition = condition.text;

        var conditions = [
          {
            code: 1000,
            emoji: "☀️",
            name_day: "Soleado",
            name_night: "Despejado"
          },
          {
            code: 1003,
            emoji: "☁️",
            name_day: "Parcialmente nublado",
            name_night: "Parcialmente nublado"
          },
          {
            code: 1006,
            emoji: "🌤️",
            name_day: "Nublado",
            name_night: "Nublado"
          },
          {
            code: 1009,
            emoji: "⛅",
            name_day: "Cielo cubierto",
            name_night: "Cielo cubierto"
          },
          {
            code: 1030,
            emoji: "🌥️",
            name_day: "Neblina",
            name_night: "Neblina"
          },
          {
            code: 1063,
            emoji: "🌫️",
            name_day: "Lluvia  moderada a intervalos",
            name_night: "Lluvia  moderada a intervalos"
          },
          {
            code: 1066,
            emoji: "🌧️",
            name_day: "Nieve moderada a intervalos en las aproximaciones",
            name_night: "Nieve moderada a intervalos en las aproximaciones"
          },
          {
            code: 1069,
            emoji: "🌨️❄️",
            name_day: "Aguanieve moderada a intervalos en las aproximaciones",
            name_night: "Aguanieve moderada a intervalos en las aproximaciones"
          },
          {
            code: 1072,
            emoji: "🌨️💧",
            name_day: "Llovizna helada a intervalos en las aproximaciones",
            name_night: "Llovizna helada a intervalos en las aproximaciones"
          },
          {
            code: 1087,
            emoji: "🌧️❄️",
            name_day: "Cielos tormentosos en las aproximaciones",
            name_night: "Cielos tormentosos en las aproximaciones"
          },
          {
            code: 1114,
            emoji: "⛈️",
            name_day: "Chubascos de nieve",
            name_night: "Chubascos de nieve"
          },
          {
            code: 1117,
            emoji: "💨🌨️",
            name_day: "Ventisca",
            name_night: "Ventisca"
          },
          {
            code: 1135,
            emoji: "🌨️🌫️",
            name_day: "Niebla moderada",
            name_night: "Niebla moderada"
          },
          {
            code: 1147,
            emoji: "🌫️",
            name_day: "Niebla helada",
            name_night: "Niebla helada"
          },
          {
            code: 1150,
            emoji: "🌫️❄️",
            name_day: "Llovizna a intervalos",
            name_night: "Llovizna a intervalos"
          },
          {
            code: 1153,
            emoji: "🌧️💧",
            name_day: "Llovizna",
            name_night: "Llovizna"
          },
          {
            code: 1168,
            emoji: "💧",
            name_day: "Llovizna helada",
            name_night: "Llovizna helada"
          },
          {
            code: 1171,
            emoji: "💧❄️",
            name_day: "Fuerte llovizna helada",
            name_night: "Fuerte llovizna helada"
          },
          {
            code: 1180,
            emoji: "🌧️💧❄️",
            name_day: "Lluvias ligeras a intervalos",
            name_night: "Lluvias ligeras a intervalos"
          },
          {
            code: 1183,
            emoji: "🌧️💧",
            name_day: "Ligeras lluvias",
            name_night: "Ligeras lluvias"
          },
          {
            code: 1186,
            emoji: "🌧️",
            name_day: "Periodos de lluvia moderada",
            name_night: "Periodos de lluvia moderada"
          },
          {
            code: 1189,
            emoji: "🌧️",
            name_day: "Lluvia moderada",
            name_night: "Lluvia moderada"
          },
          {
            code: 1192,
            emoji: "🌧️",
            name_day: "Periodos de fuertes lluvias",
            name_night: "Periodos de fuertes lluvias"
          },
          {
            code: 1195,
            emoji: "🌧️🌧️",
            name_day: "Fuertes lluvias",
            name_night: "Fuertes lluvias"
          },
          {
            code: 1198,
            emoji: "🌧️🌧️",
            name_day: "Ligeras lluvias heladas",
            name_night: "Ligeras lluvias heladas"
          },
          {
            code: 1201,
            emoji: "🌧️💧❄️",
            name_day: "Lluvias heladas fuertes o moderadas",
            name_night: "Lluvias heladas fuertes o moderadas"
          },
          {
            code: 1204,
            emoji: "⛈️❄️",
            name_day: "Ligeras precipitaciones de aguanieve",
            name_night: "Ligeras precipitaciones de aguanieve"
          },
          {
            code: 1207,
            emoji: "🌧️💧🌨️",
            name_day: "Aguanieve fuerte o moderada",
            name_night: "Aguanieve fuerte o moderada"
          },
          {
            code: 1210,
            emoji: "🌧️🌨️",
            name_day: "Nevadas ligeras a intervalos",
            name_night: "Nevadas ligeras a intervalos"
          },
          {
            code: 1213,
            emoji: "🌨️",
            name_day: "Nevadas ligeras",
            name_night: "Nevadas ligeras"
          },
          {
            code: 1216,
            emoji: "🌨️",
            name_day: "Nieve moderada a intervalos",
            name_night: "Nieve moderada a intervalos"
          },
          {
            code: 1219,
            emoji: "🌨️",
            name_day: "Nieve moderada",
            name_night: "Nieve moderada"
          },
          {
            code: 1222,
            emoji: "🌨️",
            name_day: "Nevadas intensas",
            name_night: "Nevadas intensas"
          },
          {
            code: 1225,
            emoji: "🌨️",
            name_day: "Fuertes nevadas",
            name_night: "Fuertes nevadas"
          },
          {
            code: 1237,
            emoji: "🌨️🌫️",
            name_day: "Granizo",
            name_night: "Granizo"
          },
          {
            code: 1240,
            emoji: "🧊",
            name_day: "Ligeras precipitaciones",
            name_night: "Ligeras precipitaciones"
          },
          {
            code: 1243,
            emoji: "💧💧",
            name_day: "Lluvias fuertes o moderadas",
            name_night: "Lluvias fuertes o moderadas"
          },
          {
            code: 1246,
            emoji: "💧💧💧",
            name_day: "Lluvias torrenciales",
            name_night: "Lluvias torrenciales"
          },
          {
            code: 1249,
            emoji: "⛈️🌊",
            name_day: "Ligeros chubascos de aguanieve",
            name_night: "Ligeros chubascos de aguanieve"
          },
          {
            code: 1252,
            emoji: "🌊💧🌨️",
            name_day: "Chubascos de aguanieve fuertes o moderados",
            name_night: "Chubascos de aguanieve fuertes o moderados"
          },
          {
            code: 1255,
            emoji: "🌊🌨️",
            name_day: "Ligeras precipitaciones de nieve",
            name_night: "Ligeras precipitaciones de nieve"
          },
          {
            code: 1258,
            emoji: "🌧️💧🌨️",
            name_day: "Chubascos de nieve fuertes o moderados",
            name_night: "Chubascos de nieve fuertes o moderados"
          },
          {
            code: 1261,
            emoji: "🌧️🌨️",
            name_day: "Ligeros chubascos acompañados de granizo",
            name_night: "Ligeros chubascos acompañados de granizo"
          },
          {
            code: 1264,
            emoji: "🌊💧🧊",
            name_day: "Chubascos fuertes o moderados acompañados de granizo",
            name_night: "Chubascos fuertes o moderados acompañados de granizo"
          },
          {
            code: 1273,
            emoji: "🌊🧊",
            name_day: "Intervalos de lluvias ligeras con tomenta en la región",
            name_night: "Intervalos de lluvias ligeras con tomenta en la región"
          },
          {
            code: 1276,
            emoji: "🌧️💧⚡",
            name_day: "Lluvias con tormenta fuertes o moderadas en la región",
            name_night: "Lluvias con tormenta fuertes o moderadas en la región"
          },
          {
            code: 1279,
            emoji: "🌧️⚡",
            name_day: "Nieve moderada con tormenta en la región",
            name_night: "Nieve moderada con tormenta en la región"
          },
          {
            code: 1282,
            emoji: "🌨️💧⚡",
            name_day: "Nieve moderada o fuertes nevadas con tormenta en la región",
            name_night: "Nieve moderada o fuertes nevadas con tormenta en la región"
          }
        ];

        var pos = -1;
        var found = false;
        for (let i = 0; i < conditions.length; i++) {
          if (conditions[i].code == code && !found) {
            pos = i;
            found = true;
          };
        };

        var cond;
        if (is_day == 1) {
          cond = conditions[pos].name_night;
        } else {
          cond = conditions[pos].name_day;
        };

        return `${name}, ${region}, ${country} ${dayornight_emoji}

🌡️ Temperatura: ${temp_c}°C | ${temp_f}°F
🍃 Sensación térmica: ${feelslike_c}°C | ${feelslike_f}°F
💧 Humedad: ${humidity}%
🌧️ Precipitación: ${precip_mm}mm
🔭 Condición: ${cond} ${conditions[pos].emoji}
⏱️ Fecha y hora: ${localtime} (AAAA/MM/DD hh:mm)

✔️ Última actualización: ${last_updated} (AAAA/MM/DD hh:mm)
_By: Lune Bot_`;
      },
    },
    "welcome": {
      resp: (pushname, name, formattedTitle) => { return `Olá ${pushname}! 🥰 \n\nBienvenido al grupo: ${name || formattedTitle}\n\nEncantado de conocerte, soy *Lune Bot*, la asistente virtual de este grupo! 😉\n\n¡Queremos que te diviertas y obviamente sigas nuestras reglas! ✅ \n\nSi es necesario, llame a un administrador o envíe *#menu*! 👨🏻‍💻`; },
      alreadyOn: () => { return `¡Los mensajes de bienvenida ya están activados! ⚠️`; },
      alreadyOff: () => { return `¡Los mensajes de bienvenida ya están deshabilitados! ⚠️`; },
      enable: () => { return `¡Se han activado los mensajes de bienvenida! ✅`; },
      disable: () => { return `¡Los mensajes de bienvenida han sido deshabilitados! ✅`; },
    },
    "antilink": {
      alreadyOn: () => { return `¡Anti-Link ya está activado! ⚠️`; },
      alreadyOff: () => { return `¡Anti-Link ya está deshabilitado! ⚠️`; },
      enable: () => { return `¡Anti-Link fue activado! ✅`; },
      disable: () => { return `¡Anti-Link ha sido deshabilitado! ✅`; },
    },
    "autostk": {
      alreadyOn: () => { return `¡Auto-Sticker ya está activado! ⚠️`; },
      alreadyOff: () => { return `¡Auto-Sticker ya está deshabilitado! ⚠️`; },
      enable: () => { return `¡Auto-Sticker fue activado! ✅`; },
      disable: () => { return `¡Auto-Sticker ha sido deshabilitado! ✅`; },
    },
    "comment": {
      wrongUse: (cmd) => { return `Uso incorrecto! Use *${cmd}* que marca una imagen y al lado de (nombre) | (frase)! ❌`; },
    },
    "onlyadmins": {
      on: () => { return `¡Solo los administradores pueden interactuar y hablar! 🚫`; },
      off: () => { return `¡Ahora todos los miembros pueden interactuar y hablar! ✅`; },
    },
    "ip": {
      resp: (ip) => { return `http://www.google.com/maps/place/${ip.data.latitude},${ip.data.longitude}\n\n✪ IP: ${ip.data.ip}\n\n✪ ipo: ${ip.data.type}\n\n✪ Región: ${ip.data.region}\n\n✪ Ciudad: ${ip.data.city}\n\n✪ Latitud: ${ip.data.latitude}\n\n✪ Longitud: ${ip.data.longitude}\n\n✪ Proveedor: ${ip.data.isp}\n\n✪ Continente: ${ip.data.continent}\n\n✪ Acrónimo Continente: ${ip.data.continent_code}\n\n✪ País: ${ip.data.country}\n\n✪ Acrónimo del país: ${ip.data.country_code}\n\n✪ Capital del País: ${ip.data.country_capital}\n\n✪ DDI: ${ip.data.country_phone}\n\n✪ Países Vecinos: ${ip.data.country_neighbours}\n\n✪ Huso Horario: ${ip.data.timezone} ${ip.data.timezone_name} ${ip.data.timezone_gmt}\n\n✪ Moneda: ${ip.data.currency}\n\n✪ Acrónimo de moneda: ${ip.data.currency_code}\n\n-=Búsqueda de IP realizada por Lune Bot=-`; },
      notfound: () => { return `No se pudo encontrar la IP especificada. ❌`; },
    },
    "translate": {
      noLang: () => { return `Lo siento, pero no fue posible encontrar este idioma! ❌\n\nPuede encontrar la lista de idiomas aquí:\nhttps://anotepad.com/note/read/5xqahdy8`; },
    },
    "promote": {
      promote: (user) => { return `@${user} Ahora es un administrador grupal! ✅`; },
      alreadyAdmin: () => { return `¡Este usuario ya es un administrador grupal! ⚠️`; },
      cantPromoteBot: () => { return `Lo siento, no puedo promocionarme! ❌`; },
    },
    "lyrics": {
      noLyrics: () => { return `¡Ups! ¡No fue posible encontrar la letra! ❌`; },
    },
    "demote": {
      demote: (user) => { return `@${user} ¡Ya no es un administrador grupal! ✅`; },
      alreadyDemoted: () => { return `Lo siento, el usuario no es un administrador!`; },
      cantSelfDemote: () => { return `Lo siento, no puedo bajarme! ❌`; },
    },
    "join": {
      joined: () => { return `¡El Bot se ha unido al grupo! ✅`; },
    },
    "readqr": {
      cantread: () => { return `¡Ups! ¡No fue posible encontrar un código QR en esta imagen! ❌`; },
    },
    "scan": {
      scanning: () => { return `🔎 Escaneando...`; },
      tooBig: () => { return `¡Ups! ¡No fue posible concluir! ¡El archivo es mayor de 32 MB! ❌`; },
      returnURL: (oScanUrl, spam, malware, suspicious, unsafe, adult, risk) => { return `Dominio: ${oScanUrl.domain}\n*Dirección IP:* ${oScanUrl.ip_address}\n*Spam:* ${spam}\n*Malware:* ${malware}\n*Suspecho:* ${suspicious}\n*Inseguro:* ${unsafe}\n*+18:* ${adult}\n\n*Nivel de riesgo:* ${risk}`; },
      resp: (result) => {
        var safe = result.positives;
        var estado = '✅ = Seguro';
        if (safe >= 1 && safe < 25) {
          estado = '⚠️ = Sospecho';
        } else if (safe >= 25) {
          estado = '⛔ = Peligroso';
        };
        return `🔎 - ARCHIVO ESCANEADO - 🔎\n🔎 - CON ÉXITO - 🔎\n---------------------------------------------------------\nINFO:\n✅ = 0 sospecha\n⚠️ = 1 a 25 sospechas\n⛔ = 26 a 74 sospechas\n---------------------------------------------------------\n\nDetectados: ( ${result.positives} / 74 )\n${estado}`;
      },
    },
    "prefix": {
      tooBig: () => { return `¡Ups! ¡El prefijo debe tener solo un carácter! ⚠️`; },
      cantBeUsed: (prefix) => { return `¡Ups! O carácter *"${prefix}"* no se puede usar como prefijo! ❌`; },
      actual: (prefix) => { return `O prefixo atual deste chat é: *"${prefix}"* ⚠️`; },
      changed: (prefix) => { return `O prefixo foi alterado para: *"${prefix}"* ✅`; },
    },
    "setlang": {
      unsuported: () => { return `¡Ups! ¡El idioma especificado no es compatible! ¡Elija entre "pt_BR", "en_US" y "es_ES"! ⚠️`; },
      alreadyDefault: () => { return `¡Tu idioma ya está definido como estándar! ⚠️`; },
      alreadyDefined: (langusr) => { return `¡Tu idioma actual ya es "${langusr}"! ✅`; },
      resp: (old, now) => { return `¡Lenguaje alterado de "${old}" para "${now}" con éxito! ✅`; },
      respdefault: () => { return `¡Tu idioma se ha definido como estándar! ✅`; },
    },
    "mylang": {
      resp: (langusr) => { return `¡Tu idioma actual es "${langusr}"!`; },
    },
    "stop": {
      resp: () => { return `Reiniciando el sistema... 💾`; },
    },
  },
};

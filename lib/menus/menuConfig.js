exports.pt_BR = (pushname, prefix) => {
	return `⚙️ [ *MENU CONFIG* ] ⚙️

*${prefix}setprefix* <Prefixo>
Altera o prefixo do Lune Bot no privado.

*${prefix}autostk* <On> ou <Off>
Ativa ou desativa a criação automática de sticker no privado.

*${prefix}setlang* <pt_BR> ou <en_US> ou <es_ES>
Altera o idioma do Lune Bot.

*_Envie ${prefix}menu para ver a lista completa de menus!_*`
}



exports.en_US = (pushname, prefix) => {
	return `⚙️ [ *MENU CONFIG* ] ⚙️

*${prefix}setprefix* <Prefix>
Change Lune's prefix in private.

*${prefix}autostk* <On> or <Off>
Enables or disables automatic sticker creation in private.

*${prefix}setlang* <en_US> or <es_ES> or <pt_BR>
Changes Lune Bot's language.

*_Send ${prefix}menu to see full list of menus!_*`
}



exports.es_ES = (pushname, prefix) => {
	return `⚙️ [ *MENU CONFIG* ] ⚙️

*${prefix}setprefix* <Prefijo>
Cambia el prefijo de Lune Bot en privado.

*${prefix}autostk* <On> o <Off>
Habilita o deshabilita la creación automática de stickers en privado.

*${prefix}setlang* <es_ES> o <en_US> o <pt_BR>
Cambia el idioma de Lune Bot.

*_Enviar ${prefix}menú para ver la lista completa de menús!_*`
}
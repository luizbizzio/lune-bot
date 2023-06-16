const chalk = require('chalk');
const moment = require('moment-timezone');
const updateJson = require('update-json-file');
const db = require('quick.db');
const config = require('../settings/config.json');
moment.tz.setDefault('Asia/Jakarta').locale('id');

// Color
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text);
}

const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

// is Url?
const Url = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const Giphy = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
}

const MediaGiphy = (url) => {
    return url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
}

// Message Filter / Message Cooldowns
const usedCommandRecently = new Set()

// Antispam
const isFiltered = (id, client, { mess, lang }, isCmd) => {
    if (!isCmd) return false;
    if (!db.get(`spam.${id.replace("@c.us", "")}`) && db.get(`spam.${id.replace("@c.us", "")}`) !== 0) {
        db.set(`spam.${id.replace("@c.us", "")}`, 0);
    } else {
        if (!db.get("spam_blacklist")) {
            db.set("spam_blacklist", []);
        };
        if (db.get(`spam_blacklist`) && db.get(`spam_blacklist`).length > 0 && db.get(`spam_blacklist`).find(x => x.id === id)) return true;
        if (db.get(`spam.${id.replace("@c.us", "")}`) >= config.spam_limit) {
            var _dir = db.get(`spam_blacklist`) || [];
            if (_dir.find(x => x.id === id.replace("@c.us", "")) === undefined) {
                if (!((db.get(`spam_blacklist`) && db.get(`spam_blacklist`).length > 0 && db.get(`spam_blacklist`).find(x => x.id === id.replace("@c.us", "")) !== undefined) || (db.get(`spam_blacklist`).time < Date.now() - 43200000))) {
                    client.sendText(id, mess[lang].antispam.ban());
                };
                _dir[_dir.length] = ({ time: Date.now(), id: id.replace("@c.us", "") });
                db.set(`spam_blacklist`, _dir);
            };
        };
    };

    if (((db.get(`spam_blacklist`) && db.get(`spam_blacklist`).length > 0 && db.get(`spam_blacklist`).find(x => x.id === id.replace("@c.us", "")) !== undefined) || (db.get(`spam_blacklist`).find(x => x.id === id.replace("@c.us", "")) !== undefined && db.get(`spam_blacklist`).find(x => x.id === id.replace("@c.us", "")).time < Date.now() - 43200000))) {
        return true;
    } else {
        if (usedCommandRecently.has(id)) {
            db.add(`spam.${id.replace("@c.us", "")}`, 1);
        };
        return usedCommandRecently.has(id);
    };
};

var dbLock = false;
var filterLock = false;
// Antispam add list
const addFilter = async (id, delayspam, delayblock) => { 
    usedCommandRecently.add(id);

    if (!filterLock) {
        filterLock = true;
        setTimeout(async () => {
            await usedCommandRecently.delete(id);
            filterLock = false;
        }, delayspam);
    };

    if (!dbLock) {
        dbLock = true;
        setTimeout(async () => {
            await db.delete(`spam.${id.replace("@c.us", "")}`);
            dbLock = false;
        }, delayblock);
    };
};

// Message type Log
const messageLog = (fromMe, type) => updateJson('data/stat.json', (data) => {
    (fromMe) ? (data.sent[type]) ? data.sent[type] += 1 : data.sent[type] = 1 : (data.receive[type]) ? data.receive[type] += 1 : data.receive[type] = 1
    return data
})

module.exports = {
    msgFilter: {
        isFiltered,
        addFilter
    },
    processTime,
    is: {
        Url,
        Giphy,
        MediaGiphy
    },
    color,
    messageLog
}

setInterval(() => {
    spamblockl = (!db.get(`spam_blacklist`)) ? -1 : db.get(`spam_blacklist`).length || -1;
    
    if (spamblockl > 0) {
        time = 43200000; // 43200000ms (12 hours) ()
        //time = 30000; // 30000ms (30 seconds)
        db.get(`spam_blacklist`).forEach(x => {
            if (x.time + time < Date.now()) {
                db.set(`spam_blacklist`, db.get(`spam_blacklist`).filter(y => y.id !== x.id));
                db.delete(`spam.${x.id.replace("@c.us", "")}`);
            };
        });
    };

    //db.set(`spam`, {});
}, 30000);
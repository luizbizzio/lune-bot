const db = require('quick.db');

const marry = async (user, couple) => {
    var idru = `${user}|${couple}`;
    var idrc = `${couple}|${user}`;
    try {
        await db.set(`marriage.${user.replace('.us', '')}`, idru);
        await db.set(`marriage.${couple.replace('.us', '')}`, idrc);
        return couple;
    } catch (e) {
        return e;
    }
};

const getCouple = async (user) => {
    try {
        var coup = await db.get(`marriage.${user.replace('.us', '')}`);
        var coup = coup.split('|');
        return coup[1];
    } catch (e) {
        return;
    }
};

const getTimer = (userId) => {
    var _dir = db.get(`marryDate`) || [];

    let pos = null;
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id == userId || _dir[i].id2 == userId) {
            pos = i;
        };
    });

    if (pos !== null) {
        return _dir[pos].time;
    };

    return undefined;
}

const startTimer = async (userId, userId2) => {
    console.log(getTimer(userId));
    if (getTimer(userId) == undefined) {
        const obj = { id: userId, id2: userId2, time: Date.now() }
        var arrO = await db.get(`marryDate`) || [];
        arrO.push(obj)
        console.log(arrO);
        await db.set(`marryDate`, arrO);
        return db.get(`marryDate`);
    } else {
        var _dir = await db.get(`marryDate`) || [];

        let pos = null;
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].id == userId || _dir[i].id2 == userId) {
                pos = i;
            };
        });

        _dir[pos] = { id: userId, id2: userId2, time: Date.now() };
        await db.set(`marryDate`, _dir);
        return db.get(`marryDate`);
    }
}

const killTimer = async (userId) => {
    var _dir = await db.get(`marryDate`) || [];

    let pos = null;
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id == userId || _dir[i].id2 == userId) {
            pos = i;
        }
    })

    if (pos !== null) {
        db.delete(`marryDate[${pos}]`);
    }
}

module.exports = {
    getCouple,
    marry,
    startTimer,
    getTimer,
    killTimer
};
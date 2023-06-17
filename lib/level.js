const db = require('quick.db');

// Get user ID
const getId = (userId, _dir, pushname) => {
    let pos = null
    let found = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
            found = true
        }
    })
    if (found === false && pos === null) {
        const obj = { id: userId, xp: 0, level: 1, nick: pushname }
        _dir.push(obj)
        db.set('level', _dir);
        return userId
    } else {
        return _dir[pos].id
    }
}

// Get level
const getLevel = (userId, _dir, pushname) => {
    let pos = null
    let found = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
            found = true
        }
    })
    if (found === false && pos === null) {
        const obj = { id: userId, xp: 0, level: 1, nick: pushname }
        _dir.push(obj)
        db.set('level', _dir);
        return 1
    } else {
        return _dir[pos].level
    }
}

// Get user info
const getInfo = (userId, _dir) => {
    let pos = null
    let found = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
            found = true
        }
    })
    if (found === false && pos === null) {
        const obj = { id: userId, xp: 0, level: 1, nick: pushname }
        _dir.push(obj)
        db.set('level', _dir);
        return 1
    } else {
        return _dir[pos]
    }
}


// Get XP
const getXp = (userId, _dir, pushname) => {
    let pos = null
    let found = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
            found = true
        }
    })
    if (found === false && pos === null) {
        const obj = { id: userId, xp: 0, level: 1, nick: pushname }
        _dir.push(obj)
        db.set('level', _dir);
        return 0
    } else {
        return _dir[pos].xp
    }
}

// Adds level
const addLevel = (userId, amount, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _dir[position].level += amount
        db.set('level', _dir);
    }
}

// Adds XP
const addXp = (userId, amount, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _dir[position].xp += amount
        db.set('level', _dir);
    }
}

// Get Rank
const getRank = (userId, _dir, pushname) => {
    let position = null
    let found = false
    _dir.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
            found = true
        }
    })
    if (found === false && position === null) {
        const obj = { id: userId, xp: 0, level: 1, nick: pushname }
        _dir.push(obj)
        db.set('level', _dir);
        return 99
    } else {
        return position + 1
    }
}

// Add XP generator
const xpGain = new Set()

// Check if already got XP
const isWin = (userId) => {
    return !!xpGain.has(userId)
}

const wait = (userId) => {
    xpGain.add(userId)
    setTimeout(() => {
        return xpGain.delete(userId)
    }, 60000) // 1 minute
}

module.exports = {
    getId,
    getLevel,
    getXp,
    addLevel,
    addXp,
    getRank,
    isWin,
    wait,
    getInfo
}

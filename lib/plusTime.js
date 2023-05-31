const fs = require('fs-extra')

const startTimer = (userId, _dir) => {
	const obj = { id: userId, time: Date.now() }
	_dir.push(obj)
	fs.writeFileSync('./lib/config/ptime.json', JSON.stringify(_dir))
}

const getTimer = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	if (position !== null) {
		return _dir[position].time
	}
}

module.exports = {
	startTimer,
	getTimer
}
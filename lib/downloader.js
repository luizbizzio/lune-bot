/* eslint-disable prefer-promise-reject-errors */
const fs = require("fs-extra");
const https = require("https");

const download = (url, extension, dir, callback) => new Promise((resolve, reject) => {
	const filename = Math.floor(Math.random() * (9999 + 1111)).toString()+"."+extension;
	
	const req = https.get(url, function(res) {
		const fileStream = fs.createWriteStream(`${dir}${filename}`);
		res.pipe(fileStream);
		
		fileStream.on("error", function(err) {
			console.log(err);
		});
		
		fileStream.on("close", function() {
			callback(filename);
		});
		
		fileStream.on("finish", function() {
			fileStream.close();
		});
	});
	
	req.on("error", function(err) {
		console.log(err);
	});
});

module.exports.download = download;

const fetch = require('node-fetch')
const fs = require('fs')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')
const resizeImage = require('./imageProcessing')

exports.getBase64 = getBase64 = async (url) => {
    const response = await fetch(url, { headers: { 'User-Agent': 'okhttp/4.5.0' } });
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const buffer = await response.buffer();
    const videoBase64 = `data:${response.headers.get('content-type')};base64,` + buffer.toString('base64');
    if (buffer)
        return videoBase64;
};

exports.fetchBase64 = fetchBase64 = (url, mimetype) => {
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then((res) => {
                const _mimetype = mimetype || res.headers.get('content-type')
                res.buffer()
                    .then((result) => resolve(`data:${_mimetype};base64,` + result.toString('base64')))
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })
}

exports.getBuffer = getBuffer = async (url) => {
	const res = await fetch(url, {headers: { 'User-Agent': 'okhttp/4.5.0'}, method: 'GET' })
	const anu = fs.readFileSync('./src/emror.jpg')
	if (!res.ok) return { type: 'image/jpeg', result: anu }
	const buff = await res.buffer()
	if (buff)
		return { type: res.headers.get('content-type'), result: buff }
}

exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})


exports.fetchText = fetchText = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.text())
        .then(text => {
            resolve(text);
        })
        .catch((err) => {
            reject(err);
        });
});

exports.uploadImages = uploadImages = (buffData, type) => {
    return new Promise(async (resolve, reject) => {
        const { ext } = await fromBuffer(buffData);
        var fileName = Math.random().toString(36).substring(7) + '.' + ext;
        createDir('./media/tmp');
        const filePath = 'media/tmp/'+fileName;
        const _buffData = type ? await resizeImage(buffData, false) : buffData;
        fs.writeFile(filePath, _buffData, { encoding: 'base64' }, (err) => {
            if (err) return reject(err);
            const fileData = fs.readFileSync(filePath);
            const form = new FormData();
            form.append('file', fileData, fileName);
            fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: form
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) return reject(res.error);
                    resolve('https://telegra.ph' + res[0].src);
                })
                .then(() => fs.unlinkSync(filePath))
                .catch(err => reject(err));
        });
    });
};

const fetch = require('node-fetch')
const fs = require('fs')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')
const resizeImage = require('./imageProcessing')
const { createDir } = require('./functions')

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

exports.uploadImages = uploadImages = (buffData, type) => {
    return new Promise(async (resolve, reject) => {
        const { ext } = await fromBuffer(buffData);
        var fileName = Math.random().toString(36).substring(7) + '.' + ext;
        createDir('./tmp');
        const filePath = 'tmp/' + fileName;
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

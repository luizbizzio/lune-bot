const fetch = require('node-fetch');
const fs = require('fs-extra');
const FormData = require('form-data');
const fileType = require('file-type');

const upload = async(buffData, type) => {
    return new Promise(async (resolve, reject) => {
        const { ext } = await fileType.fromBuffer(buffData)
        const filePath = './media/tmp/tmp.' + ext
        await fs.writeFile(filePath, buffData, { encoding: 'base64' }, async (err) => {
            if (err) return `err`;
            const fileData = fs.readFileSync(filePath)
            const form = new FormData()
            form.append('file', fileData, 'tmp.' + ext)
            await fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: form
            }).then(res => res.json()).then(res => {
                if (res.error) return reject(res.error)
                resolve('https://telegra.ph' + res[0].src)
            }).then(() => fs.unlinkSync(filePath)).catch(err => reject(err))
        })
    })
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    sleep,
    upload
};
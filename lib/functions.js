const fetch = require('node-fetch');
const fs = require('fs-extra');
const FormData = require('form-data');
const fileType = require('file-type');

const createDir = async (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        return true;
    } else {
        return false;
    }
};

const deleteDir = async (dir) => {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        return true;
    } else {
        return false;
    };
};

const upload = async (buffData) => {
    return new Promise(async (resolve, reject) => {
        const { ext } = await fileType.fromBuffer(buffData)
        createDir('./tmp');
        var fileName = `${Math.floor(Math.random() * 10000)}.${ext}`
        const filePath = './tmp/' + fileName
        await fs.writeFile(filePath, buffData, { encoding: 'base64' }, async (err) => {
            if (err) return `err`;
            const fileData = fs.readFileSync(filePath)
            const form = new FormData()
            form.append('file', fileData, fileName)
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
    upload,
    createDir,
    deleteDir
};
const { translate } = require('@vitalets/google-translate-api')

module.exports = doing = (text, lang) => new Promise((resolve, reject) => {
    translate(text, { client: 'gtx', to: lang })
        .then((res) => resolve(res.text))
        .catch((err) => reject(err))
})

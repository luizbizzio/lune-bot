const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath)
const path = require('path')

module.exports ={
    converterMp4ParaMp3 : (caminhoVideo) => {
        return new Promise((resolve, reject)=>{
        	var obterNomeAleatorio = `${Math.floor(Math.random() * 10000)}.mp3`
            let saidaAudio = path.resolve(`media/audios/${obterNomeAleatorio}`)
            ffmpeg(caminhoVideo)
            .on('end', () => {
                resolve(saidaAudio)
            })
            .on("error", (err)=>{
                reject(err.message)
            })
            .save(saidaAudio)
        })
    },
    converterMp4ParaMp3Cs : (caminhoVideo, caminhoAudio) => {
        return new Promise((resolve,reject)=>{
            let saidaAudio = path.resolve(caminhoAudio);
            ffmpeg(caminhoVideo)
            .on('end', () => {
                resolve(saidaAudio)
            })
            .on("error", (err)=>{
                reject(err.message)
            })
            .save(saidaAudio);
        })
    }
}
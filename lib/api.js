const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs-extra')
const path = require('path')
const acrcloud = require("acrcloud")
const duration = require("format-duration-time").default
const config = require("../settings/config.json")

module.exports = {
    obterReconhecimentoMusica : async caminhoAudio =>{
        try{
            const acr = new acrcloud({
                host: config.api_keys.acrcloud.host,
                access_key: config.api_keys.acrcloud.api_key,
                access_secret: config.api_keys.acrcloud.api_secret
             })
             let resp = await acr.identify(fs.readFileSync(caminhoAudio))
             if (resp.status.code == 1001) throw new Error(`A compatible song was not found.`)
             if (resp.status.code == 3003 || resp.status.code == 3015) throw new Error(`You have exceeded the Acrcloud limit, create a new key on the site.`)
             if (resp.status.code == 3000) throw new Error(`There was an error on the acrcloud server, try again later.`)
             let arrayDataLancamento = resp.metadata.music[0].release_date.split("-")
             let artistas = []
             for (let artista of resp.metadata.music[0].artists) {
                 artistas.push(artista.name)
             }
             return {
                produtora : resp.metadata.music[0].label || "-----",
                duracao: duration(resp.metadata.music[0].duration_ms).format("m:ss"),
                lancamento: `${arrayDataLancamento[2]}/${arrayDataLancamento[1]}/${arrayDataLancamento[0]}`,
                album: resp.metadata.music[0].album.name,
                titulo: resp.metadata.music[0].title,
                artistas: artistas.toString()
             }
        } catch(err) {
        	console.log(err)
            var errors = [`A compatible song was not found.`, `You have exceeded the Acrcloud limit, create a new key on the site.`, `There was an error on the acrcloud server, try again later.`]
            if (!errors.includes(err.message)) {
                console.log(err.message, "API obterReconhecimentoMusica")
                throw new Error(`There was an error on the acrcloud server, try again later`)
            } else {
                throw err
            }
        }
    },

    obterAudioModificado: (caminhoAudio, tipoEdicao) =>{
        return new Promise((resolve,reject)=>{
			const randomNameAudio = `${Math.floor(Math.random() * 10000)}.mp3`
            let saidaAudio = path.resolve(`media/audios/${randomNameAudio}`)
            let ffmpegOpcoes = []
            switch(tipoEdicao){
                case "estourar":
                case "burst":
                case "explode":
                case "explodir":
                    ffmpegOpcoes = ["-y", "-filter_complex", "acrusher=level_in=3:level_out=5:bits=10:mode=log:aa=1"] 
                break
                
                case "reverso":
                case "reverse":
                    ffmpegOpcoes = ["-y", "-filter_complex", "areverse"]
                break
                
                case "grave":
                case "bass":
                    ffmpegOpcoes = ["-y", "-af", "asetrate=44100*0.8"]
                break
                
                case "agudo":
                case "acute":
                    ffmpegOpcoes = ["-y", "-af", "asetrate=44100*1.4"]
                break
                
                case "2x":
                case "x2":
                    ffmpegOpcoes = ["-y", "-filter:a", "atempo=2.0", "-vn"]
                break
                
                case "volume":
                    ffmpegOpcoes = ["-y", "-filter:a", "volume=4.0"]
                break
                
                case "nightcore":
                	ffmpegOpcoes = ["-y", "-filter:a", "atempo=1.06,asetrate=44100*1.25"]
                break
                
                case "lofi":
                case "lo-fi":
                    ffmpegOpcoes = ["-y", "-filter:a", "atempo=1.4,asetrate=44100*0.77"]
                break

                case 'banheiro':
                case 'bathroom':
                case 'toilet':
                case 'baño':
                    ffmpegOpcoes = ["-y", "-filter:a", "atempo=1.12,asetrate=44100*0.97,lowpass=600"]
                break

                case 'slow':
                    ffmpegOpcoes = ["-y", "-filter:a", "atempo=0.85"]
                break

                default:
                    reject()
            }
           
            ffmpeg(caminhoAudio)
            .outputOptions(ffmpegOpcoes)
            .save(saidaAudio)
            .on('end', async () => {
                resolve(saidaAudio)
            })
            .on("error", ()=>{
                reject()
            });
        }).catch(err =>{
            console.log(err+"\nAPI obterAudioModificado")
            //throw new Error("There was an error in audio conversion")
        })
        
    }
}

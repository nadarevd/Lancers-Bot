const commando = require('discord.js-commando');
const Discord = require('discord.js')
const fetch = require("node-fetch");
const mergeImg = require('merge-img')
const championlist = require('./championList.json')
const fs = require('fs')
class opggCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'lol',
            group: 'random',
            memberName: 'lol',
            description: 'Displays League of Legends info for a user'
        });
    }

    async run(message, args) {
        let topChamps = []
        const API_KEY = "RGAPI-44e5bb4e-7ce8-4b13-8560-be5c53d6fac0"
        const request = require("request")
        let summonerName = args.replace(" ", "")
        let summonerNameHandled = summonerName.toLowerCase().trim()
        const path = `./profileChamps/${summonerName}.png`

        const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
        const json = await response.json()
            // console.log(json)

        const responseTwo = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${json.id}?api_key=${API_KEY}`)
        const jsonTwo = await responseTwo.json()
            // console.log(jsonTwo)

        const responseThree = await fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${json.id}?api_key=${API_KEY}`)
        const jsonThree = await responseThree.json()


        jsonThree.map(champ => {
            if (topChamps.length < 5) {
                championlist.map(champion => {
                    if (champion.key == champ.championId) {
                        let tempName = champion.id
                        tempName = tempName.charAt(0).toUpperCase() + tempName.substring(1)
                        topChamps.push(champion.icon)
                    }
                })
            }
        })

        let embed = new Discord.RichEmbed()
            .setTitle(`${json.name}`)
            .setURL("https://lancersgaming.ca/")
            .setColor(`#3cfc03`)
            .setFooter("League of Legends 2020")
            .setTimestamp()
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/${json.profileIconId}.png`)
            .addField("Level", `${json.summonerLevel}`, true)
        if (jsonTwo.length != 0) {
            if (jsonTwo.length == 2) {
                embed.addField("Rank", `${jsonTwo[1].tier} ${jsonTwo[1].rank}`, true)
                embed.addField("Wins/Losses", `${jsonTwo[1].wins}/${jsonTwo[1].losses}`, true)
                if (jsonTwo[1].hotStreak == true) {
                    embed.addField("HOT!!", `${jsonTwo[1].summonerName} is on a streak!`)
                }
            } else {
                embed.addField("Rank", `${jsonTwo[0].tier} ${jsonTwo[0].rank}`, true)
                embed.addField("Wins/Losses", `${jsonTwo[0].wins}/${jsonTwo[0].losses}`, true)
                if (jsonTwo[0].hotStreak == true) {
                    embed.addField("HOT!!", `${jsonTwo[0].summonerName} is on a streak!`)
                }
            }
            if (!fs.existsSync(path)) {
                try {
                    mergeImg(topChamps)
                        .then((img) => {
                            img.write(`profileChamps/${summonerName}.png`, () => console.log('done'))
                        })
                } catch (err) {

                }
                embed.addField(`Profile added to database!`, `Type ?lol ${summonerName} to see your top champions!`, true)
                message.channel.send({ embed })
            } else {
                const attachment = await new Discord.Attachment(`profileChamps/${summonerName}.png`, 'out.png');
                embed.attachFile(attachment)
                embed.setImage('attachment://out.png')
                message.channel.send({ embed })
            }
        } else {
            message.channel.send({ embed })
        }



    }
}

module.exports = opggCommand;
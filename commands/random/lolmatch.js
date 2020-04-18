const commando = require('discord.js-commando');
const Discord = require('discord.js')
const fetch = require("node-fetch")
const fs = require('fs')
const client = new Discord.Client();
const championList = require("./championList.json")

class linksCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'lolmatch',
            group: 'general',
            memberName: 'lolmatch',
            description: `Loads the player's last 5 League of Legends matches.`
        });
    }

    async run(message, args) {
        let summonersByName //summoner's name
        let activeGame //spectator view of game



        const API_KEY = "RGAPI-44e5bb4e-7ce8-4b13-8560-be5c53d6fac0"
        let summonerName = args.replace(" ", " ")

        try {
            const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
            summonersByName = await response.json()
                // console.log(summonersByName)

            try {
                const responseTwo = await fetch(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonersByName.id}?api_key=${API_KEY}`)
                activeGame = await responseTwo.json()
                    // console.log(activeGame)
                try {
                    let gameType = (activeGame.gameType.includes("_")) ? activeGame.gameType.replace("_", " ").toLowerCase() : activeGame.gameType.toLowerCase()
                } catch (err) {
                    let embed = new Discord.RichEmbed()
                        .setTitle("Error")
                        .setColor("#ff0000")
                        .setAuthor("Lancers Bot")
                        .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
                        .setDescription(`${summonerName} is not in a summoner's rift game at the moment. Maybe they're playing another game from Riot Games?`)
                    message.channel.send({ embed })
                }
            } catch (err) {
                console.log(err)
            }
        } catch (err) {
            let embed = new Discord.RichEmbed()
                .setTitle("Error")
                .setColor("#ff0000")
                .setAuthor("Lancers Bot")
                .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
                .setDescription(`No results come up for ${summonerName}. Did you spell the name correctly?`)
            message.channel.send({ embed })
        }
        let redTeam = []
        let redTeamMatchInfo = []
        let blueTeam = []
        let blueTeamMatchInfo = []
        let memberInfoRed = ``
        let memberInfoBlue = ``

        let ranksWinRed = ``
        let ranksWinBlue = ``

        let winRateRed = ``
        let winRateBlue = ``
        try {
            activeGame.participants.map(player => {
                if (player.teamId == 200) redTeam.push(player)
                else blueTeam.push(player)
            })
        } catch (err) {

        }

        const embed = new Discord.RichEmbed()
            .setTitle(`Live Match Info for ${summonerName}`)
            .setDescription("Players ")
            .setThumbnail(`https://i.imgur.com/v5Fq4kh.png`)

        var promises = redTeam.map(redMember => fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${redMember.summonerId}?api_key=${API_KEY}`).then(y => {
            return y.json()
        }).then(z => {
            try {
                if (z.length == 0) {
                    let temp = [{
                        "newSummonerName": `${redMember.summonerName}`,
                        "hasRank": false
                    }]
                    return temp
                } else {
                    return z
                }
            } catch (err) {}
        }))
        Promise.all(promises).then(results => {
            results.map(player => {
                if (player.length !== 0 && !player[0].hasOwnProperty("hasRank")) {
                    // console.log("Red: " + player[0].summonerName)
                    memberInfoRed += `**${player[0].summonerName}**\n`
                    ranksWinRed += `**${player[0].tier.charAt(0)} ${player[0].rank}**\n`
                    winRateRed += `${((player[0].wins/(player[0].losses + player[0].wins))* 100).toFixed(2)}%\n`
                } else {
                    // console.log("~Red: " + player[0].newSummonerName)
                    memberInfoRed += `**${player[0].newSummonerName}**\n`
                    ranksWinRed += `UR\n`
                    winRateRed += "--\n"

                }
            })
        }).then((info) => {
            if (memberInfoRed !== "" && ranksWinRed != "" && winRateRed != "") {
                embed.addField(`**Red Team**`, `${memberInfoRed}`, true)
                embed.addField(`Rank`, `${ranksWinRed}`, true)
                embed.addField(`Win Rate`, `${winRateRed}`, true)
            }
        }).then(() => {
            var promises = blueTeam.map(blueMember => fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${blueMember.summonerId}?api_key=${API_KEY}`).then(y => {

                return y.json()
            }).then(z => {
                try {
                    if (z.length == 0) {
                        let temp = [{
                            "newSummonerName": `${blueMember.summonerName}`,
                            "hasRank": false
                        }]
                        return temp
                    } else {
                        return z
                    }
                } catch (err) {}
            }))
            Promise.all(promises).then(results => {
                results.map(player => {
                    try {
                        if (player.length !== 0 && !player[0].hasOwnProperty("hasRank")) {
                            // console.log("Blue: " + player[0].summonerName)
                            memberInfoBlue += `**${player[0].summonerName}**\n`
                            ranksWinBlue += `**${player[0].tier.charAt(0)} ${player[0].rank}**\n`
                            winRateBlue += `${((player[0].wins/(player[0].losses + player[0].wins))* 100).toFixed(2)}%\n`

                        } else {
                            // console.log("~Blue: " + player[0].newSummonerName)
                            memberInfoBlue += `**${player[0].newSummonerName}**\n`
                            ranksWinBlue += `UR\n`
                            winRateBlue += "--\n"
                        }
                    } catch (err) {}
                })
            }).then((info) => {
                if (memberInfoBlue !== "" && ranksWinBlue != "" && winRateBlue != "") {
                    embed.addField(`**Blue Team**`, `${memberInfoBlue}`, true)
                    embed.addField(`Rank`, `${ranksWinBlue}`, true)
                    embed.addField(`Win Rate`, `${winRateBlue}`, true)
                    message.channel.send({ embed })
                }
            })
        })
    }
}

module.exports = linksCommand;
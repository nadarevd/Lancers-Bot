const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs')

let consoleUserList

class addGamesCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'addgame',
            group: 'random',
            memberName: 'addgame',
            description: 'Adds a game to the user\'s list of games'
        });
    }

    async run(message, args) {
        const gameName = args
        let username = message.author.tag
        userHandler(message, username, gameName)
    }
}

function userHandler(message, username, gameName) {
    let flag = false
    let userList = require("./userList.json")

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].username == username) {
            //push game to their game list and flag = true
            //write their info into file
            userList[i].games.push(gameName)
            flag = true
            consoleUserList = userList
            userList = JSON.stringify(userList)
            fs.writeFile('./commands/random/userList.json', userList, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file')
                    }
                })
                // console.log(consoleUserList)
            const embed = new Discord.RichEmbed()
                .setTitle("Success!")
                .setURL("https://lancersgaming.ca/")
                .setAuthor("Lancers Bot", "https://i.imgur.com/0ldatUV.jpg", "https://yagami.xyz")
                .setColor(`#3cfc03`)
                .setDescription(`${gameName} was added to your profile!`)
                .setFooter("Lancers Bot, ")
                .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
                .setTimestamp()
            message.channel.send({ embed })
        }
    }
    if (!flag) {
        let template = {
            "username": username,
            "games": [gameName]
        }
        userList.push(template)
        consoleUserList = userList
        userList = JSON.stringify(userList)
        fs.writeFile('./commands/random/userList.json', userList, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
            // console.log(consoleUserList)
        const embed = new Discord.RichEmbed()
            .setTitle("Success!")
            .setURL("https://lancersgaming.ca/")
            .setAuthor("Lancers Bot", "https://i.imgur.com/0ldatUV.jpg", "https://yagami.xyz")
            .setColor(`#3cfc03`)
            .setDescription(`New Profile! ${username}'s account was created and ${gameName} was added to ${username}'s profile!`)
            .setFooter("Lancers Bot, ")
            .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
            .setTimestamp()
        message.channel.send({ embed })

    }

}



module.exports = addGamesCommand;
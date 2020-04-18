const commando = require('discord.js-commando');
const Discord = require('discord.js');

class listGamesCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'listgames',
            group: 'random',
            memberName: 'listgames',
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
    let listOfGames = ""
    let j = 0
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].username == username) {
            userList[i].games.map(game => {
                listOfGames += "--> " + game + " \n"
                j++
            })
        }
    }
    // console.log(listOfGames)
    const embed = new Discord.RichEmbed()
        .setTitle(`${username}'s List of Games`)
        .setURL("https://lancersgaming.ca/")
        .setAuthor("Lancers Bot", "https://i.imgur.com/0ldatUV.jpg", "https://yagami.xyz")
        .setColor(`#3cfc03`)
        .setDescription(`${(listOfGames.length > 0)? listOfGames : "You have nothing listed!"}`)
        .setFooter("Lancers Bot, ")
        .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
        .setTimestamp()
    message.channel.send({ embed })
}


module.exports = listGamesCommand;
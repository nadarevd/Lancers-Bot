// const commando = require('discord.js-commando');
// const Discord = require('discord.js');
// const fs = require('fs')

// class deleteEventCommand extends commando.Command {
//     constructor(client) { //when command is loaded
//         super(client, {
//             name: 'deleteevent',
//             group: 'admin',
//             memberName: 'deleteevent',
//             description: 'Deletes events.'
//         });
//     }

//     async run(message, args) {
//         if (message.member.roles.find("name", "Admin")) {
//             let eventString = ``
//             let index = 0
//             let eventList = require("./eventList.json")
//             console.log(eventList)
//             eventList.map(event => {
//                 index++
//                 eventString += `${index}: ${event.title} @ ${event.date}\n`
//             })
//             eventString += `\nPlease specify an event number: ?deleteevent [number]`
//             let embed = new Discord.RichEmbed()
//                 .setTitle("Lancers Gaming Event List")
//                 .setColor("#3cfc03")
//                 .setAuthor("Lancers Bot")
//                 .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
//                 .setDescription(`${eventString}`)
//             message.channel.send({ embed })

//         } else {
//             let embed = new Discord.RichEmbed()
//                 .setTitle("Error")
//                 .setColor("#ff0000")
//                 .setAuthor("Lancers Bot")
//                 .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
//                 .setDescription(`You do not have the permissions to perform this task.`)
//             message.channel.send({ embed })
//         }
//     }
// }



// module.exports = deleteEventCommand;
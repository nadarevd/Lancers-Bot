// const commando = require('discord.js-commando');
// const Discord = require('discord.js');
// const fs = require('fs')
// const client = new Discord.Client();

// class updateEventsCommand extends commando.Command {
//     constructor(client) { //when command is loaded
//         super(client, {
//             name: 'updateevents',
//             group: 'admin',
//             memberName: 'updateevents',
//             description: 'Removes events that have passed.'
//         });
//     }

//     async run(message, args) {
//         if (message.member.roles.find("name", "Admin")) {
//             let eventList = require("./eventList.json")
//             let today = new Date()
//             let EVENT_COUNT = eventList.length
//             let newEventList = []
//             for (let i = 0; i < EVENT_COUNT; i++) {
//                 let date = new Date(eventList[i].date)
//                 if (date > today) {
//                     newEventList.push(eventList[i])
//                 }
//             }
//             console.log(newEventList)
//             newEventList = JSON.stringify(newEventList)
//             fs.writeFile('./commands/random/eventList.json', newEventList, err => {
//                 if (err) console.log('Error writing file', err)
//                 else console.log('Successfully wrote file.')
//             })
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

// module.exports = updateEventsCommand;
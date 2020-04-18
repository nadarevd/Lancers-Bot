const commando = require('discord.js-commando')
const Discord = require('discord.js')
const fs = require('fs')

class addEventCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'event',
            group: 'admin',
            memberName: 'event',
            description: 'Manage events by adding, removing, and updating'
        });
    }

    async run(message, args) {
        let path = './commands/random/eventList.json'
        let option = args.split(" ")[0]
        switch (option) {
            case "add":
                eventAdder(path, message, args)
                break
            case "delete":
                eventDeleter(path, message, args)
                break
            case "update":
                eventUpdater(path, message)
                break
            case "list":
                eventReader(path, message)
                break
            case "info":
                eventMoreInfo(path, message, index)
            case "":
                let embed = new Discord.RichEmbed()
                    .setTitle("Error")
                    .setColor("#ff0000")
                    .setAuthor("Lancers Bot")
                    .setDescription(`Missing parameters. If you are an admin, you can add, delete, and update events. If you are not an admin, you can list all events!`)
                message.channel.send({ embed })
                break
            default:
                let embedt = new Discord.RichEmbed()
                    .setTitle("Error")
                    .setColor("#ff0000")
                    .setAuthor("Lancers Bot")
                    .setDescription(`You can't use that command with ?event.`)
                message.channel.send({ embedt })
        }
    }
}

function eventListFileHandler(eventList) {
    let writeStream = fs.createWriteStream('./commands/random/eventList.json')
    const path = writeStream.path

    writeStream.write(`${eventList}`)
    writeStream.on('finish', () => {
        console.log(`Successfully wrote data to file ${path}`)
    })
    writeStream.off('error', () => {
        console.error(`There is an error writing to file ${path} => ${err}`)
    })
    writeStream.end()
}

function eventReader(PATH, message) {
    fs.readFile(PATH, 'utf8', function(err, contents) {
        let eventString = ``
        let index = 0
        let eventList = JSON.parse(contents)
        eventList.map(event => {
            index++
            eventString += `**${index}:** ${event.title} @ ${event.date}\n`
        })
        let embed = new Discord.RichEmbed()
            .setTitle("Lancers Gaming Event List")
            .setColor("#ffff00")
            .setAuthor("Lancers Bot")
            .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
            .setDescription(`${eventString}`)
        message.channel.send({ embed })
    })
}

function eventAdder(PATH, message, args) {
    fs.readFile(PATH, 'utf8', function(err, contents) {
        if (message.member.roles.find("name", "Admin")) {
            let eventList = JSON.parse(contents)
            let MAX_ARGS = 4
            let arguList = args.split("--")
            if (arguList.length == MAX_ARGS) {
                let ARG_TITLE = arguList[0].split(' ').slice(1).join(' ')
                let ARG_DATE = arguList[1]
                let ARG_DESCRIPTION = arguList[2]
                let ARG_GAME = arguList[3]
                const event_obj = {
                    "title": ARG_TITLE,
                    "date": ARG_DATE,
                    "description": ARG_DESCRIPTION,
                    "game": ARG_GAME
                }
                eventList.push(event_obj)
                eventList = JSON.stringify(eventList)
                let embed = new Discord.RichEmbed()
                    .setTitle("Success!")
                    .setColor("#ffff00")
                    .setAuthor("Lancers Bot")
                    .setThumbnail("https://i.imgur.com/0ldatUV.jpg")
                    .setDescription(`${ARG_TITLE} was added to the list.`)
                message.channel.send({ embed })
                console.log('Successfully wrote file')
                eventListFileHandler(eventList) //--------

            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle("Error")
                    .setColor("#ff0000")
                    .setAuthor("Lancers Bot")
                    .setDescription(`You didn't enter the command properly! Make sure you seperate the event's title, date, and description with "--".
                    
                    **Here's an example:**
                    
                    ?addevent Cool Event--3/31/2020--This is a simple description about my event that happens at 4:30PM EST!--League of Legends`)
                message.channel.send({ embed })
            }
        } else {
            permErrorMsg()
        }
    })
}

function eventDeleter(PATH, message, args) {
    fs.readFile(PATH, 'utf8', function(err, contents) {
        if (message.member.roles.find("name", "Admin")) {
            let eventList = JSON.parse(contents)
            let newEventList = []
            let wholeArg = args.split(" ")
            let option = args.split(" ")[1]
            option = Number.parseInt(option)
            if (wholeArg.length == 2) {
                if (Number.isInteger(option)) {
                    if (option <= eventList.length) {
                        for (let i = 0; i < eventList.length; i++) {
                            if (i != option - 1) {
                                newEventList.push(eventList[i])
                            }
                        }
                        eventList = JSON.stringify(newEventList)
                        eventListFileHandler(eventList)
                        let embed = new Discord.RichEmbed()
                            .setTitle("Success!")
                            .setColor("#ffff00")
                            .setAuthor("Lancers Bot")
                            .setDescription(`The event was deleted!`)
                        message.channel.send({ embed })
                    } else {
                        let embed = new Discord.RichEmbed()
                            .setTitle("Error")
                            .setColor("#ff0000")
                            .setAuthor("Lancers Bot")
                            .setDescription(`The number you entered is too big!`)
                        message.channel.send({ embed })
                    }
                } else {
                    let embed = new Discord.RichEmbed()
                        .setTitle("Error")
                        .setColor("#ff0000")
                        .setAuthor("Lancers Bot")
                        .setDescription(`That is not a valid number!`)
                    message.channel.send({ embed })
                }
            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle("Error")
                    .setColor("#ff0000")
                    .setAuthor("Lancers Bot")
                    .setDescription(`Hmm... It looks like you didnt write the command properly.
                        
                        **Here's an example!**
                        
                        If you want to list the events, type **?event list**
                        To delete an event type **?event delete 2**`)
                message.channel.send({ embed })
            }
        } else {
            permErrorMsg()
        }
    })
}

function eventUpdater(PATH, message) {
    fs.readFile(PATH, 'utf8', function(err, contents) {
        if (message.member.roles.find("name", "Admin")) {
            let eventList = JSON.parse(contents)
            let today = new Date()
            let EVENT_COUNT = eventList.length
            let newEventList = []
            for (let i = 0; i < EVENT_COUNT; i++) {
                let date = new Date(eventList[i].date)
                if (date > today) {
                    newEventList.push(eventList[i])
                }
            }
            eventList = newEventList
            newEventList = JSON.stringify(newEventList)
            eventListFileHandler(newEventList)
            let embed = new Discord.RichEmbed()
                .setTitle("Success!")
                .setColor("#ffff00")
                .setAuthor("Lancers Bot")
                .setDescription(`All the events that have passed have been deleted!`)
            message.channel.send({ embed })
        } else {
            permErrorMsg()
        }
    })
}


function permErrorMsg() {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setColor("#ff0000")
        .setAuthor("Lancers Bot")
        .setDescription(`You do not have the permissions to perform this task.`)
    message.channel.send({ embed })

}

module.exports = addEventCommand;
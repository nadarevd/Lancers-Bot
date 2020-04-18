const commando = require('discord.js-commando');
const Discord = require('discord.js');

class aboutCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'about',
            group: 'random',
            memberName: 'about',
            description: 'Find out what we are all about'
        });
    }

    async run(message, args) {
        const embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome to the Lancers Gaming Discord!')
            .setURL('https://lancersgaming.ca/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://lancersgaming.ca/')
            .setDescription('Lancers Gaming represents the University of Windsor in Windsor, Ontario, Canada. Our teams strive to compete against the best while upholding strong values of honesty, integrity and sportsmanship.')
            .setThumbnail('https://i.imgur.com/0ldatUV.jpg')
            .addField('Our Mission', 'We’re committed to offering a place for high performing Esports athletes to showcase their skills, as well as an opportunity for students to unwind and relieve stress. We’re committed to helping students achieve excellence in all aspects of their lives.')
            .addField('Website Link', 'https://lancersgaming.ca/', true)
            .setImage('https://i.imgur.com/nwZMP8N.jpg')
            .setTimestamp()
            .setFooter('Lancers Bot', 'https://i.imgur.com/0ldatUV.jpg');

        message.channel.send({ embed })
    }
}

module.exports = aboutCommand;
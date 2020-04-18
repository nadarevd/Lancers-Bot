const commando = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();

class linksCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'links',
            group: 'general',
            memberName: 'links',
            description: 'Links all the social media links for Lancers Gaming.'
        });
    }

    async run(message, args) {
        const embed = new Discord.RichEmbed()
            .setColor('#eee911')
            .setTitle('Social Media')
            .setURL('https://lancersgaming.ca/')
            .setAuthor('Lancers Bot', 'https://i.imgur.com/0ldatUV.jpg', 'https://lancersgaming.ca/')
            .setDescription('Get involved by following us on social media! We post important information about events!')
            .setThumbnail('https://i.imgur.com/0ldatUV.jpg')
            .addField('Twitter', 'https://bit.ly/3dT05Rh', true)
            .addField('Twitch', 'https://bit.ly/2X7S4Sp', true)
            .addField('Discord', 'https://bit.ly/2UGc0Kz', true)
            .setTimestamp()
            .setFooter('Lancers Bot', 'https://i.imgur.com/0ldatUV.jpg');
        message.channel.send({ embed });
    }
}

module.exports = linksCommand;
const commando = require('discord.js-commando');
const bot = new commando.Client({
    commandPrefix: '?'
});

bot.registry.registerGroup('general', 'General');
bot.registry.registerGroup('support', 'Support');
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerDefaults(); //shows all commands the bot has
bot.registry.registerCommandsIn(__dirname + "/commands");




//dont forget login code
bot.login('Njk1ODYyOTk5NzMwMDk0MTIw.XogXfQ.18LQ7v6F6Pd66Y5xF9XU5HQsavg');
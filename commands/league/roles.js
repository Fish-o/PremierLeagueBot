const Discord = require('discord.js')
exports.run = (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
    .setColor('#66FFB2')
    .setImage('https://media.discordapp.net/attachments/754926925771964447/763683717557518396/Add_a_heading_2.png');
    const embed2 = new Discord.MessageEmbed()
    .setTitle('**__Roles__**')
    .setDescription(`These Are The List Of Team Roles And Also The Commands You Use To Get Them.          
             **${client.config.prefix}Arsenal** - Joins Arsenal
             **${client.config.prefix}AstonVilla** - Joins Aston Villa
             **${client.config.prefix}Brighton** - Joins Brighton & Hove Albion
             **${client.config.prefix}Burnley** - Joins Burnley
             **${client.config.prefix}Chelsea** - Joins Chelsea
             **${client.config.prefix}CrystalPalace** - Joins Crystal Palace
             **${client.config.prefix}Everton** - Joins Everton
             **${client.config.prefix}Fulham** -Joins Fulham 
             **${client.config.prefix}Leeds** - Joins Leeds United
             **${client.config.prefix}Leicester** - Joins Leicester City
             **${client.config.prefix}ManchesterCity** - Joins Manchester City
             **${client.config.prefix}ManchesterUnited** - Joins Manchester United
             **${client.config.prefix}Newcastle** - Joins Newcastle United
             **${client.config.prefix}Sheffield** - Joins Sheffield United
             **${client.config.prefix}Southampton** - Joins Southampton
             **${client.config.prefix}Spurs** - Joins Tottenham Hotspur
             **${client.config.prefix}WestBromwich** - Joins WestBromwich Albion
             **${client.config.prefix}WestHam** - Joins West Ham United
             **${client.config.prefix}Wolves** - Joins Wolverhampton Wanderers             
    These commands sould strictly be used in <#763390052688199692> !`)
    .setColor('#66FFB2');
    message.channel.send(embed1);
    message.channel.send(embed2);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['role'],
    perms: [
        
    ]
  };
  
const path = require("path")
exports.help = {
    category: __dirname.split(path.sep).pop(),
    name:"roles",
    description: "Shows a list of all roles you are able to assign yourself",
    usage: "roles"
};

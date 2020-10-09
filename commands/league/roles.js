const Discord = require('discord.js')
exports.run = (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
    .setColor('#66FFB2')
    .setImage('https://media.discordapp.net/attachments/754926925771964447/763683717557518396/Add_a_heading_2.png');
    const embed2 = new Discord.MessageEmbed()
    .setTitle('**__Roles__**')
    .setDescription(`These Are The List Of Team Roles And Also The Commands You Use To Get Them.          
             **^Arsenal** - Joins Arsenal
             **^AstonVilla** - Joins Aston Villa
             **^Brighton** - Joins Brighton & Hove Albion
             **^Burnley** - Joins Burnley
             **^Chelsea** - Joins Chelsea
             **^CrystalPalace** - Joins Crystal Palace
             **^Everton** - Joins Everton
             **^Fulham** -Joins Fulham 
             **^Leeds** - Joins Leeds United
             **^Leicester** - Joins Leicester City
             **^ManchesterCity** - Joins Manchester City
             **^ManchesterUnited** - Joins Manchester United
             **^Newcastle** - Joins Newcastle United
             **^Sheffield** - Joins Sheffield United
             **^Southampton** - Joins Southampton
             **^Spurs** - Joins Tottenham Hotspur
             **^WestBromwich** - Joins WestBromwich Albion
             **^WestHam** - Joins West Ham United
             **^Wolves** - Joins Wolverhampton Wanderers             
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
    usage: "-roles"
};

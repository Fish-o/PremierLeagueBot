const Discord = require('discord.js')

exports.run = (client, message, args) => {

    const embed1 = new Discord.MessageEmbed()

    .setColor('#66FFB2')

    .setImage('https://cdn.discordapp.com/attachments/763043055338389524/764135774873845760/Add_a_heading_4.png')

    const embed2 = new Discord.MessageEmbed()

    .setTitle('Colour Roles')

    .setDescription(`To Get Yourself A Colour Role, Using The Below Command Will Give You An Option Of Choosing The Colour Of Your Club's Home/Away Kit..          

             

    **${client.config.prefix}color** 



        Remember That This Command Should Be Used In <#763390052688199692> Only.`)



    .setColor('#66ffb2')

    message.channel.send(embed1)

    message.channel.send(embed2)

}



exports.conf = {

    enabled: true,

    guildOnly: false,

    aliases: ['colourroles', 'colorroles', 'colorrole'],

    perms: [

    ]

};

const path = require("path")

exports.help = {

    category: __dirname.split(path.sep).pop(),

    name:"colourrole",

    description: "Shows the command you can use to get a colour ",

    usage: "colourrole"

};
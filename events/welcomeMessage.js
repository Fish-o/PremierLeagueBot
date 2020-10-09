const Discord = require('discord.js');


const channelId = '763298409570369537'; // dont forget to change it after joining sherwood
const targetChannelId = '763038087303397396'; //^
const InfoChannelId = '763298310890323988';


exports.event = async (client, member) =>{

    console.log(member.user.name)
    const embed = new Discord.MessageEmbed()
    .setTitle(':soccer: **Welcome to Premier League Cluster** :soccer:')
    .setColor('#66FFB2')
    .setImage('https://media.discordapp.net/attachments/754926925771964447/763687372587401256/WElcome.gif')
    .setDescription(`Welcome <@${member.id}> to the server ! Please read the ${member.guild.channels.cache.get(targetChannelId).toString()} and check out ${member.guild.channels.cache.get(InfoChannelId).toString()} !! Enjoy your time here !`)

    const channel = member.guild.channels.cache.get(channelId)
    channel.send(embed)
    
}

exports.conf = {
    event: "guildMemberAdd"
};
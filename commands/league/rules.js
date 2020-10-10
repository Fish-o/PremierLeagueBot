const Discord = require('discord.js')
exports.run = (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
      .setImage('https://media.discordapp.net/attachments/754926925771964447/763278901123219486/Add_a_heading_1.png')
      .setColor('#66FFB2');
      const embed2 = new Discord.MessageEmbed()
      .setTitle('**__General Rules__**')
      .setDescription(`These Are The Main Rules To Be Followed. Lets Keep This Server A Nice Place To Be In  :soccer: 
                         
 **Number 1** - Be Respectful To Other Members Of The Server                         
 
 **Number 2** - Make Sure To Credit The Artist/Source Of The Media Posted, If Not The Message Will Be Deleted
 
 **Number 3** - Strictly No NSFW Content In The Server
 
 **Number 4** - No Advertising Other Servers. If Found Advertising, Will Result In A Ban                      
 
 **Number 5** - Use The Proper Channel And Voice Channels For Discussions Or Debates
 
 **Number 6** - Keep all Bot Commands in their Respectful Channel
 
 **Number 7** - No Arguing With Mods, Decisions Taken By The Moderators Will Not Be Questioned By The Server Members
 
 **Number 8** - No Offensive Or Triggering Nicknames
 
 **Number 9** - Using Racial Slurs Will Result In An Instant Ban
 
 **Number 10** - Cursing Is Allowed, But Directed Cursing Will Not Be Encouraged`)
       .setColor('#66FFB2');
       message.channel.send(embed1);

     message.channel.send(embed2);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rule'],
    perms: [
        
    ]
  };
  
const path = require("path")
exports.help = {
    category: __dirname.split(path.sep).pop(),
    name:"rules",
    description: "Shows the rules of this server",
    usage: "rules"
};

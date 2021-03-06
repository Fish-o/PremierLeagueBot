exports.run = (client, message, args) =>{
    //Pay attention in order to assign a role of a user, the bot needs to be above that role, that means you can't assign an equal or highest role than bot's role
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    
   

    if(!rMember) 
        return message.channel.send("Couldn't find that user.");

    let role = message.mentions.roles.first();
    if(!role) 
        return message.channel.send("Specify a role!");

    let gRole = role;
    if(!gRole) 
        return message.channel.send("Couldn't find that role.");

    if(rMember.roles.cache.has(gRole.id)) 
        return message.channel.send("They already have that role.");

    else{
        rMember.roles.add(gRole.id).catch(console.error);
        
        try{
            rMember.send(`Congrats, you have been given the role ${gRole.name}`);
            message.channel.send(`The user ${rMember} has a new role ${gRole.name}`);
        }
        catch(e){
            console.log(e.stack);
            message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}.`)
        }
    }
    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    perms: [
        'MANAGE_ROLES'
    ]
  };
  
const path = require("path")
exports.help = {
    category: __dirname.split(path.sep).pop(),
    name:"addrole",
    description: "Adds a role to a specific user",
    usage: "addrole [user] [role]"
};
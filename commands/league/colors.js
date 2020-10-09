exports.run = (client, message, args) => {
    console.log('Color command called')
    
    const member = message.member;
    const guild = message.guild;

    const all_teams = client.config.all_teams;
    const member_roles = member.roles.cache;
    const member_team_roles = member_roles.filter(member_role =>all_teams.includes(member_role.name.toLowerCase()))


    //const team_role = message.guild.roles.cache.find(guild_role => guild_role.name.toLowerCase().replace(' ', '') == team_name.toLowerCase().replace(' ', ''))
    if(!member_team_roles){
        return message.channel.send('You are not in any teams')
    } 
    

    else if(member_team_roles.size > 1){
        member_team_roles.forEach(async member_team_role => {
            console.log('Removed team role from member')
            member.roles.remove(member_team_role, 'Member had multiple team roles, removing all.')
        })
        return message.author.send('Looks like you were in multiple teams, all teams have been removed of you, please try joining a team again')
    } 


    else if(member_team_roles.size < 1){
        console.log('not in a team');
        return message.channel.send('You are not in any teams')
    } 
    

    else if(member_team_roles.size == 1){
        console.log('Team role good')
        const member_team_role = member_team_roles.first();
        const guild_roles = guild.roles.cache;

        const team_home_away_roles = guild_roles.filter(guild_role => guild_role.name.toLowerCase().startsWith(member_team_role.name.toLowerCase()) && member_team_role.name.toLowerCase() != guild_role.name.toLowerCase());
        if(!team_home_away_roles){
            message.channel.send('Did not find color roles for your team')
        } 
        
        else if(team_home_away_roles.size == 2){
            
            message.channel.send(`Do you want \n - 1️⃣  \`${team_home_away_roles.get(Array.from(team_home_away_roles.keys())[0]).name}\` \n - 2️⃣  \`${team_home_away_roles.get(Array.from(team_home_away_roles.keys())[1]).name}\``).then(chose_msg =>{
                chose_msg.react('1️⃣');
                chose_msg.react('2️⃣');

                chose_msg.awaitReactions((reaction, user)=>user.id === message.author.id, { max: 1, time: 60000, errors: ['time'] }).then(collected =>{
                    var emojiName = collected.first().emoji.name
                    if(emojiName == '1️⃣'){
                        const home_away_roles = member_roles.filter(guild_role => all_teams.includes(guild_role.name.split(' ')[0].toLowerCase()) && ['home', 'away'].includes(guild_role.name.split(' ')[guild_role.name.split(' ').length - 1].toLowerCase()))
                        home_away_roles.forEach(home_away_role =>{
                            member.roles.remove(home_away_role, 'Removed a members Home Away role, because they got a new one')
                        });

                        message.member.roles.add(team_home_away_roles.get(Array.from(team_home_away_roles.keys())[0]), 'Adding team color role to member')
                        message.channel.send('Role added')

                    } 
                    
                    else if(emojiName == '2️⃣'){
                        const home_away_roles = member_roles.filter(guild_role => all_teams.includes(guild_role.name.split(' ')[0].toLowerCase()) && ['home', 'away'].includes(guild_role.name.split(' ')[guild_role.name.split(' ').length - 1].toLowerCase()))
                        home_away_roles.forEach(home_away_role =>{
                            member.roles.remove(home_away_role, 'Removed a members Home Away role, because they got a new one')
                        });

                        message.member.roles.add(team_home_away_roles.get(Array.from(team_home_away_roles.keys())[1]), 'Adding team color role to member')
                        message.channel.send('Role added')

                    }
                    
                    else{
                        message.channel.send('😑')
                    }
                })

            })
            
        }

    }
    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['colour', 'colours','colors'],
    perms: [
        
    ]
  };
  
const path = require("path")
exports.help = {
    category: __dirname.split(path.sep).pop(),
    name:"color",
    description: "Assign yourself a team color",
    usage: "-color"
};


const Discord = require('discord.js');


exports.event = async (client, message) => {
    const all_teams = client.config.all_teams
    const { content } = message;
    let args;
    let command;

    if (message.content.indexOf(client.config.prefix) == 0 ){
        args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        command = args.shift().toLowerCase();
    }

    if(command){
        const member = message.member;
        const guild = message.guild;

        

        all_teams.forEach((team_name) => {
            command = `${client.config.prefix}${team_name}`
            if (content.toLowerCase().replace(' ', '').startsWith(`${command}`) || content === command || content.toLowerCase().replace(' ', '') === command) {
                const team_role = message.guild.roles.cache.find(guild_role => guild_role.name.toLowerCase().replace(' ', '') == team_name.toLowerCase().replace(' ', ''))
                if(!team_role){
                    return message.channel.send(`Could not find team: ${team_name} (${team_name.toLowerCase().replace(' ', '')})`)
                }
                const member_roles = message.member.roles.cache;
                const member_team_roles = member_roles.filter(member_role =>all_teams.includes(member_role.name.toLowerCase()))

                if(member_team_roles){
                    console.log(member_team_roles.length)
                    member_team_roles.forEach(async member_team_role => {
                        console.log('Removed team role from member')
                        message.member.roles.remove(member_team_role, 'Removed a members second team')
                    })
                }


                const home_away_roles = member_roles.filter(guild_role => all_teams.includes(guild_role.name.split(' ')[0].toLowerCase()) && ['home', 'away'].includes(guild_role.name.split(' ')[guild_role.name.split(' ').length - 1].toLowerCase()))
                home_away_roles.forEach(home_away_role =>{
                    member.roles.remove(home_away_role, 'Removed a members Home Away role, because they left their team a new one')
                });

                message.member.roles.add(team_role, 'Joined a team the team')
                message.channel.send({
                    embed: {
                      description: `You succesfully joined team: **${team_role.name}**`,
                      color:'#66FFb2',
                      image: {
                        url: "attachment://teamJoin.png"
                      }
                    },
                    files: [{
                      attachment: './data/images/teamJoin.png',
                      name: 'teamJoin.png'
                    }]
                  });
                //message.channel.send(, {files: ["./data/images/teamJoin.png"] });
            }
        })
    }




};

exports.conf = {
    event: "message"
};

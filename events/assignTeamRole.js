
const Discord = require('discord.js');
const cooldown = new Map();
const cooldown_seconds = 600;
const ms = require('ms');


//https://changaco.oy.lc/unicode-progress-bars/
var bar_styles = [
    '▁▂▃▄▅▆▇█',
    '⣀⣄⣤⣦⣶⣷⣿',
    '⣀⣄⣆⣇⣧⣷⣿',
    '○◔◐◕⬤',
    '□◱◧▣■',
    '□◱▨▩■',
    '□◱▥▦■',
    '░▒▓█',
    '░█',
    '⬜⬛',
    '▱▰',
    '▭◼',
    '▯▮',
    '◯⬤',
    '⚪⚫',
];
function repeat(s, i) {
    var r = '';
    for(var j=0; j<i; j++) r += s;
    return r;
}
function make_bar(p, bar_style, min_size, max_size) {
    var d, full, m, middle, r, rest, x,
        min_delta = Number.POSITIVE_INFINITY,
        full_symbol = bar_style[bar_style.length-1],
        n = bar_style.length - 1;
    if(p == 100) return {str: repeat(full_symbol, 10), delta: 0};
    p = p / 100;
    for(var i=max_size; i>=min_size; i--) {
        x = p * i;
        full = Math.floor(x);
        rest = x - full;
        middle = Math.floor(rest * n);
        if(p != 0 && full == 0 && middle == 0) middle = 1;
        d = Math.abs(p - (full+middle/n)/i) * 100;
        if(d < min_delta) {
            min_delta = d;
            m = bar_style[middle];
            if(full == i) m = '';
            r = repeat(full_symbol, full) + m + repeat(bar_style[0], i-full-1);
        }
    }
    return {str: r, delta: min_delta};
}

function generate() {
    var r1 = document.getElementById('sans-serif-body'),
        r2 = document.getElementById('serif-body'),
        p = new Number(document.getElementById('percentage').value),
        min_size = new Number(document.getElementById('min-size').value),
        max_size = new Number(document.getElementById('max-size').value);
    document.getElementById('sans-serif').style.display = 'table';
    document.getElementById('serif').style.display = 'table';
    r1.innerHTML = '';
    r2.innerHTML = '';
    var bars = [];
    for(var i=0; i<bar_styles.length; i++) {
        bars.push(make_bar(p, bar_styles[i], min_size, max_size));
    }
    bars.sort(function (a, b) { return a.delta - b.delta; });
    for(var i=0; i<bars.length; i++) {
        bar = '<td>'+bars[i].str+' '+p+'%</td>';
        delta = '<td>'+bars[i].delta.toPrecision(2)+'%</td>';
        row = '<tr>'+repeat(bar, 3)+delta+'</tr>'
        r1.innerHTML += row;
        r2.innerHTML += row;
    }
}

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

                if (cooldown.has(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {

                    const timeSince_ms = cooldown.get(message.author.id) - Date.now();
                    const timeRemaining_ms = timeSince_ms - cooldown_seconds*1000;
                    const percentage_remaining = Math.floor(100 - (cooldown_seconds*1000 / timeRemaining_ms) * 100);

                    
                    return message.channel.send(`Please wait ${ms(timeRemaining_ms, { long: true })}, progress: ${make_bar(percentage_remaining, '⣀⣄⣤⣦⣶⣷⣿', 1, 10).str} ${percentage_remaining}%`);
                }

                const team_role = guild.roles.cache.find(guild_role => guild_role.name.toLowerCase().replace(' ', '') == team_name.toLowerCase().replace(' ', ''))
                if(!team_role){
                    return message.channel.send(`Could not find team: ${team_name} (${team_name.toLowerCase().replace(' ', '')})`)
                }
                const member_roles = member.roles.cache;
                const member_team_roles = member_roles.filter(member_role =>all_teams.includes(member_role.name.toLowerCase()))

                if(member_team_roles){
                    console.log(member_team_roles.length)
                    member_team_roles.forEach(async member_team_role => {
                        console.log('Removed team role from member')
                        member.roles.remove(member_team_role, 'Removed a members second team')
                    })
                }


                const home_away_roles = member_roles.filter(guild_role => all_teams.includes(guild_role.name.split(' ')[0].toLowerCase()) && ['home', 'away'].includes(guild_role.name.split(' ')[guild_role.name.split(' ').length - 1].toLowerCase()))
                home_away_roles.forEach(home_away_role =>{
                    member.roles.remove(home_away_role, 'Removed a members Home Away role, because they left their team a new one')
                });

                member.roles.add(team_role, 'Joined a team the team')

                if(!message.member.hasPermission('ADMINISTRATOR')){
                    cooldown.set(message.author.id, Date.now());
                    
                    setTimeout(() => {
                        // Removes the user from the set after a minute
                        cooldown.delete(message.author.id);
                    }, cooldown_seconds*1000);
                }

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

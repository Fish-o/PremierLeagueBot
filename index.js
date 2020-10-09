const Discord = require('discord.js');
const fs = require('fs');


const client = new Discord.Client();



require('dotenv').config(/*{ path: './.env' }*/);

let config = require("./config.json");

config.token = process.env.TOKEN

client.config = config;


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        //let eventName = file.split(".")[0];
        client.on(event.conf.event, event.event.bind(null, client));
    });
});

//client.commands = new Enmap();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.bypass = false;
client.master = client.config.master

fs.readdir("./commands/", (direrr, dirs) =>{
    if (direrr) {
        return console.log('Unable to scan directory: ' + err);
    }
    console.log(dirs)
    
    dirs.forEach(dir => {
        const path = "./commands/"+dir+"/";
        fs.readdir(path, (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
            
                let props = require(path+file);
                console.log(`Loading Command: ${props.help.name}`);
                client.commands.set(props.help.name, props);

                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            });
        });

    })
})
















client.sendinfo = function (info){
    client.channels.cache.get('764105545241329725').send(info);
}

client.login(config.token);
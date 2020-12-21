import Discord from 'discord.js';
const client = new Discord.Client();
import { generateEmbed } from "./embedgen.mjs";
import fs from 'fs'; 
const config = JSON.parse(fs.readFileSync('./config.json', { encoding: 'utf-8' }))
const users=JSON.parse(fs.readFileSync('./users.json', { encoding: 'utf-8' }))
let newuser={
        credits:0
};
var embedAuthor = "CryptoVoop";
var embedImg = "";
var embedLink = "";
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot){return;}

    const args = message.content.slice(config.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const name=message.author.username;
    const user=users[name];
    if(command=="create"){
        fs.readFile("users.json", function(err, data) { 
                if (err) throw err; 
                const datas=JSON.parse(data);
                const user=data[name];
                if(user==null){
                    users[name]=newuser;
                    fs.writeFile("./users.json", JSON.stringify(users), err => { 
                        if (err) throw err;  
                        message.channel.send("Your account has been created")
                    });
                }else{
                    message.channel.send("You allready have an account")
                }
        });
    }
    if(command=="account"){
        if(user!=null){
            var embed=generateEmbed()
            message.channel.send(embed);
            message.channel.send("Your Account")
        }else{
            message.channel.send("You need to make an acount")
        }
        generateEmbed("#000000", `${name}'s Account`, null, null, null, `Credits: ${user.credits}`, "Your Account", null)
        
    }
});
client.login(config.token);
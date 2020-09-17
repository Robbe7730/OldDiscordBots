const Discord = require('discord.js');
const fetch = require('node-fetch');

function sendQuote(channel) {
        fetch("http://inspirobot.me/api?generate=true")
        .then(result => result.text())
        .then(body => channel.send("", {
                file: body
        }));
}

let lastMessage = 0;
const timeout = 10 * 1000;

const client = new Discord.Client();

const token = 'TOKEN_HERE';

client.on('ready', () => {
        console.log('Ready!');
});

client.on('message', message => {
        if (message.author.username !== "Quotes Bot") {
                if (Date.now() > lastMessage + timeout) {

                        message.delete()
                        .then(msg => {
                                sendQuote(message.channel);
                                return msg;
                        })
                        .then(msg => console.log(`${msg.author.username}: ${msg.content}`))
                        .catch(console.error);
                        lastMessage = Date.now();
                } else {
                        message.delete()
                        .then(msg => console.log(`REJECTED ${msg.author.username}: ${msg.content}`));
                }
        }
});

client.login(token);

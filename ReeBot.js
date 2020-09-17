const Discord = require('discord.js');

ree = /re+/gi
feelsreeman = /<?:feelsreeman:[0-9]*>?/g

function reevaluate(text) {
        text = text.replace(/ */g, "")
        return 1 - (text.replace(feelsreeman, "").replace(ree, "") .length/text.length);
}

function processMessage(message) {
        if (message.attachments.array().length > 0) {
                message.delete().then(() => console.log("deleted because of attachment")).catch(console.error);
        }
        reeValue = reevaluate(message.content);
        console.log(message.author.username + ":" + message.content + " got a reeValue of " + reeValue);
        // message.channel.send(reeValue);
        if (isNaN(reeValue)) {
                message.delete().then(() => console.log("deleted NaN")).catch(console.error);
        }
        if (reeValue < deleteThreshold) {
                message.delete()
                        .then(() => console.log("deleted"))
                        .catch(console.error);
        } else if (reeValue < warningThreshold) {
                message.react('🤔')
                        .then(() => console.log("Hmmmmmmmmmmm"))
                        .catch(console.error);
        }
}


deleteThreshold = 0.95
warningThreshold = 1

const client = new Discord.Client();
const token = 'TOKEN_HERE';

client.on('ready', () => {
        console.log('Ready!');
});

client.on('message', message => {
        let channel = message.channel;
        if (message.content === "!setup") {
                channel.setTopic(`Channel for raging on anything and anyone. \n\nYour reevalue is calculated by how much of your message matches ${ree} or /:feelsreeman:/g, a message with a reeValue lower than ${deleteThreshold} will be deleted.`)
                        .then(() => message.delete())
                        .catch((err) => {console.error(err); message.delete()});
                return
        }
        if (message.content === "!cleanup") {
                message.channel.fetchMessages()
		.then(messages => messages.forEach(processMessage))
		.catch(console.error);
        }
        if (message.author.username === "ReeBot") {
                return;
        }
        processMessage(message);
});

client.on('messageUpdate', (_, message) => processMessage(message));

client.login(token);

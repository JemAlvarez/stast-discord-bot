const Discord = require('discord.js')
const client = new Discord.Client()

const fOff = (message) => {
    if (message.isMentioned(client.user)) {
        message.channel.send('FK OFF!')
    }
}

module.exports = fOff
const Discord = require('discord.js')

// hidden features
const dedGame = require('./hidden/dedGame')
const pog = require('./hidden/pog')
const noU = require('./hidden/noU')
const fOff = require('./hidden/fOff')
const silvSuccs = require('./hidden/silvSuccs')
const bruv = require('./hidden/bruv')
const cya = require('./hidden/cya')

// stats
const ow = require('./stats/ow')
const apex = require('./stats/apex')
const league = require('./stats/league')

// misc
const advice = require('./misc/advice')
const animal = require('./misc/animal')
const help = require('./misc/help')
const tod = require('./misc/tod')

// config
const client = new Discord.Client()

// ready
client.once('ready', () => {
    client.user.setActivity('YOU', { type: 'WATCHING' });
    console.log('Ready!!')
})

// greeting
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'introductions')
    if (!channel) return
    channel.send(`Welcome to the server, ${member} || LEAVE B4 ITS 2 L8 ||`)
})

// msg
client.on('message', message => {
    // Hidden features
    dedGame(message)
    pog(message)
    noU(message)
    fOff(message, client)
    silvSuccs(message)
    bruv(message)
    cya(message)

    // Stats
    ow(message, client)
    apex(message, client)
    league(message, client, Discord)

    // Misc
    advice(message, client)
    animal(message, client)
    help(message, client)
    tod(message)
})

// login
client.login(process.env.TOKEN)
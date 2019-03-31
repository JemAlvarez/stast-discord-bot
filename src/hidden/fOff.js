const fOff = (message, client) => {
    if (message.isMentioned(client.user)) {
        message.channel.send('FK OFF!')
    }
}

module.exports = fOff
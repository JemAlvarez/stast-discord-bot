const noU = (message) => {
    const msg = message.content.toLowerCase()
    if (msg.includes('fuck u')) {
        message.channel.send('NO U!')
    }
}

module.exports = noU
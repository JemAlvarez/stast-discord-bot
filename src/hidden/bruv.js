const bruv = (message) => {
    const msg = message.content.toLowerCase()
    if (msg.includes(`bruv`)) {
        if (message.author.bot) return;
        message.channel.send('Bruv!')
    }
}

module.exports = bruv
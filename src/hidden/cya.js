const cya = (message) => {
    const msg = message.content.toLowerCase()
    if (msg.includes(`cya`)) {
        if (message.author.bot) return;
        message.channel.send('CYA!')
    }
}

module.exports = cya
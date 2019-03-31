const pog = (message) => {
    const msg = message.content.toLowerCase()
    if (msg.includes('pog')) {
        const msgArr = msg.split(' ')
        if (msgArr.includes('pog')) {
            message.channel.send('', {
                files: ["https://discordemoji.com/assets/emoji/PogChamp.png"]
            })
        }
    }
}

module.exports = pog
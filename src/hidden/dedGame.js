const dedGame = (message) => {
    const msg = message.content.toLowerCase()
    if (msg.includes('overwatch') || msg.includes('ow')) {
        const msgArr = msg.split(' ')
        if (msgArr.includes('overwatch') || msgArr.includes('ow')) {
            message.channel.send('DED GAME OMEGALUL')
        }
    }
}

module.exports = dedGame
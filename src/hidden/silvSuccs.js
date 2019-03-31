const silvSuccs = (message) => {
    const msg = message.content.toLowerCase()
    if (msg.includes('silv')) {
        const msgArr = msg.split(' ')
        if (msgArr.includes('silv')) {
            if (message.author.bot) return;
            message.channel.send('Silv succs! || <3 ||')
        }
    }
}

module.exports = silvSuccs
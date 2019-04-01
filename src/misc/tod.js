const truth = require('../data/truth')
const dare = require('../data/dare')
const { prefix } = require('../../config.json')

const tod = (message) => {
    const msg = message.content.toLowerCase()
    if (msg.startsWith(`${prefix}tod`)) {
        message.channel.send('Truth or Dare?')
        const collector = message.channel.createMessageCollector(m => {
            return m.author.id === message.author.id
        }, {
                time: 10000
            })

        collector.on('collect', m => {
            const res = m.content.toLowerCase()
            let number = {
                truth: Math.floor(Math.random() * truth.length),
                dare: Math.floor(Math.random() * dare.length)
            }

            if (res === 'truth') {
                message.channel.send(truth[number.truth])
                collector.stop()
            } else if (res === 'dare') {
                message.channel.send(dare[number.dare])
                collector.stop()
            }
        })
    }
}

module.exports = tod
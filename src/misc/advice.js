const msgEmbed = require('../embeds/msg')
const { prefix, flex } = require('../../config.json')
const fetch = require('node-fetch')

const advice = (message, client) => {
    const msg = message.content.toLowerCase()
    if (msg.startsWith(`${prefix}advice`)) {
        fetch('https://api.adviceslip.com/advice')
            .then(res => res.json())
            .then(data => {
                const advice = data.slip.advice

                message.channel.send({
                    embed: msgEmbed({
                        color: 9164998,
                        flex,
                        client,
                        title: ':)',
                        fields: [{
                            name: 'Advice',
                            value: advice
                        }]
                    })
                })
            })
    }
}

module.exports = advice
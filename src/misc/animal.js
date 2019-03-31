const fetch = require('node-fetch')
const { prefix, flex } = require('../../config.json')
const msgEmbed = require('../embeds/msg')

const animal = (message, client) => {
    const msg = message.content.toLowerCase()
    if (msg.startsWith(`${prefix}fact`)) {
        const msgArr = message.content.split(' ')

        let animal = ''

        if (msgArr[1]) {
            animal = `?animal_type=${msgArr[1]}`
        }

        fetch(`https://cat-fact.herokuapp.com/facts/random${animal}`)
            .then(res => res.json())
            .then(fact => {
                message.channel.send({
                    embed: msgEmbed({
                        client,
                        flex,
                        color: 16735776,
                        title: fact.type.toUpperCase(),
                        fields: [{
                            name: 'Fun fact',
                            value: fact.text
                        }]
                    })
                })
            }).catch(e => {
                message.channel.send('Animal not found.')
            })
    }
}

module.exports = animal
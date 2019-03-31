const fetch = require('node-fetch')
const { prefix, flex } = require('../../config.json')
const msgEmbed = require('../embeds/msg')

const owUrl = 'https://ow-api.com/v1/stats'

const ow = (message, client) => {
    const msg = message.content.toLowerCase()
    if (msg.startsWith(`${prefix}ow`)) {
        const msgArr = message.content.split(' ')

        const args = {
            platform: msgArr[1],
            region: msgArr[2],
            name: msgArr[3]
        }

        if (args.name) {
            args.name = args.name.replace('#', '-')
        }

        fetch(`${owUrl}/${args.platform}/${args.region}/${args.name}/profile`)
            .then(res => res.json())
            .then(data => {
                if (data.private) {
                    return message.channel.send({
                        embed: msgEmbed({
                            client,
                            flex,
                            color: 16423965,
                            title: data.name,
                            fields: [{
                                name: 'Private',
                                value: 'Account is private'
                            }]
                        })
                    })
                }

                message.channel.send({
                    embed: msgEmbed({
                        client,
                        flex,
                        color: 16423965,
                        title: data.name,
                        fields: [{
                            name: 'Rating',
                            value: data.rating
                        },
                        {
                            name: 'Level',
                            value: `${data.prestige}${data.level}`
                        }, {
                            name: 'Game Won',
                            value: data.gamesWon
                        }]
                    })
                })
            })
    }
}

module.exports = ow
const fetch = require('node-fetch')
const { prefix, flex } = require('../../config.json')
const msgEmbed = require('../embeds/msg')

const apexUrl = 'https://public-api.tracker.gg/apex/v1/standard/profile'

const apex = (message, client) => {
    const msg = message.content.toLowerCase()
    if (msg.startsWith(`${prefix}apex`)) {
        const msgArr = message.content.split(' ')

        const args = {
            platform: msgArr[1],
            name: msgArr[2]
        }

        switch (args.platform) {
            case 'pc':
                args.platform = 5
                break;
            case 'psn':
                args.platform = 2
                break;
            case 'xbox':
                args.platform = 1
                break;
            default:
                break;
        }

        fetch(`${apexUrl}/${args.platform}/${args.name}`, {
            method: 'GET',
            headers: {
                'TRN-Api-Key': process.env.APEX
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.errors) {
                    return message.channel.send({
                        embed: msgEmbed({
                            client,
                            flex,
                            color: 11674146,
                            title: 'Error',
                            fields: [{
                                name: 'Not found',
                                value: 'Account not found. Please try again.'
                            }]
                        })
                    })
                }

                const stats = data.data.stats

                message.channel.send({
                    embed: msgEmbed({
                        client,
                        flex,
                        color: 11674146,
                        title: data.data.metadata.platformUserHandle,
                        fields: [{
                            name: stats[0].metadata.name,
                            value: stats[0].value
                        },
                        {
                            name: stats[1].metadata.name,
                            value: stats[1].value
                        }, {
                            name: stats[2].metadata.name,
                            value: stats[2].value
                        }],
                    })
                })
            })
    }
}


module.exports = apex
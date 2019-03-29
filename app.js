const Discord = require('discord.js')
const fetch = require('node-fetch')
const { prefix } = require('./config.json')

const client = new Discord.Client()
const owUrl = 'https://ow-api.com/v1/stats'
const apexUrl = 'https://public-api.tracker.gg/apex/v1/standard/profile'
const flex = 'Blue still better than u XD'

client.once('ready', () => {
    console.log('Ready!!')
})

client.on('message', message => {
    // OW STATS
    if (message.content.startsWith(`${prefix}ow`) || message.content.startsWith(`${prefix}OW`)) {
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
                        embed: {
                            color: 16423965,
                            author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL
                            },
                            title: data.name,
                            fields: [{
                                name: 'Private',
                                value: 'Account is private'
                            }],
                            footer: {
                                icon_url: client.user.avatarURL,
                                text: flex
                            }
                        }
                    })
                }

                message.channel.send({
                    embed: {
                        color: 16423965,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
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
                        }],
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: flex
                        }
                    }
                })
            })
    }

    // APEX
    if (message.content.startsWith(`${prefix}apex`) || message.content.startsWith(`${prefix}APEX`)) {
        const msgArr = message.content.split(' ')

        const args = {
            platform: msgArr[1],
            name: msgArr[2]
        }

        if (args.platform && args.platform === 'pc') {
            args.platform = 5
        } else if (args.platform && args.platform === 'psn') {
            args.platform = 2
        } else if (args.platform && args.platform === 'xbox') {
            args.platform = 1
        }

        fetch(`${apexUrl}/${args.platform}/${args.name}`, {
            method: 'GET',
            headers: {
                'TRN-Api-Key': process.env.APEX
            }
        }).then(res => res.json())
            .then(data => {
                const stats = data.data.stats

                message.channel.send({
                    embed: {
                        color: 11674146,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
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
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: flex
                        }
                    }
                })
            })
    }

    // ADVICE
    if (message.content.startsWith(`${prefix}advice`) || message.content.startsWith(`${prefix}ADVICE`)) {
        fetch('https://api.adviceslip.com/advice')
            .then(res => res.json())
            .then(data => {
                const advice = data.slip.advice

                message.channel.send({
                    embed: {
                        color: 9164998,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        title: ':)',
                        fields: [{
                            name: 'Advice',
                            value: advice
                        }],
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: flex
                        }
                    }
                })
            })
    }

    // ANIMAL FACTS
    if (message.content.startsWith(`${prefix}fact`) || message.content.startsWith(`${prefix}FACT`)) {
        const msgArr = message.content.split(' ')

        let animal = ''

        if (msgArr[1]) {
            animal = `?animal_type=${msgArr[1]}`
        }

        fetch(`https://cat-fact.herokuapp.com/facts/random${animal}`)
            .then(res => res.json())
            .then(fact => {
                message.channel.send({
                    embed: {
                        color: 9164998,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        title: fact.type.toUpperCase(),
                        fields: [{
                            name: 'Fun fact',
                            value: fact.text
                        }],
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: flex
                        }
                    }
                })
            })
    }

    // BRUV
    if (message.content.startsWith(`bruv`) || message.content.startsWith(`BRUV`)) {
        message.channel.send('Bruv!')
    }

    // CYA
    if (message.content.startsWith(`cya`)) {
        message.channel.send('CYA!')
    }

    // HELP
    if (message.content.startsWith(`${prefix}help`) || message.content.startsWith(`${prefix}HELP`)) {
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Commands",
                description: "Commands you can use",
                fields: [{
                    name: "Overwatch",
                    value: "**!ow :platform :region :name#number** \n Regions: us, eu, asia \n (name is case sensitive)"
                },
                {
                    name: "Apex",
                    value: "**!apex :platform :name**"
                }, {
                    name: "Advice",
                    value: "**!advice**"
                }, {
                    name: "Animal Facts",
                    value: "**!fact :animal** \n (if no animal is provided the default is cat)"
                }],
                footer: {
                    icon_url: client.user.avatarURL,
                    text: flex
                }
            }
        })
    }
})

client.login(process.env.TOKEN)
const msgEmbed = require('../embeds/msg')
const { prefix, flex } = require('../../config.json')

const help = (message, client) => {
    const msg = message.content.toLowerCase()
    if (msg.startsWith(`${prefix}help`)) {
        message.channel.send({
            embed: msgEmbed({
                color: 3447003,
                flex,
                client,
                title: 'Commands',
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
                }, {
                    name: "Truth or Dare",
                    value: "**!tod** \n (wait for response and say 'truth' or 'dare')"
                }]
            })
        })
    }
}

module.exports = help
const fetch = require('node-fetch')
const { prefix, flex } = require('../../config.json')
const msgEmbed = require('../embeds/msg')

const summonerUrl = 'api.riotgames.com/lol/summoner/v4/summoners/by-name'
const rankUrl = 'api.riotgames.com/lol/league/v4/positions/by-summoner'
const iconUrl = 'http://avatar.leagueoflegends.com/na'

const league = (message, client, discord) => {
    const msg = message.content.toLowerCase()
    if (msg.startsWith(`${prefix}lol`)) {
        const msgArr = message.content.split(' ')

        const args = {
            region: 'na1',
            name: msgArr[1]
        }

        // if (args.region) {
        //     switch (args.region) {
        //         case 'na':
        //             args.region = 'na1'
        //             break;

        //         default:
        //             break;
        //     }
        // }

        // fetch league data async
        const leagueFetch = async () => {
            const opts = {
                method: 'GET',
                headers: {
                    'X-Riot-Token': process.env.LEAGUE
                }
            }
            let res = await fetch(`https://${args.region}.${summonerUrl}/${args.name}`, opts)
            res = await res.json()

            let summoner = {}

            if (res.status) {
                return summoner
            }

            summoner = {
                id: res.id,
                name: res.name,
                icon: res.profileIconId,
                lvl: res.summonerLevel
            }

            let rank = await fetch(`https://${args.region}.${rankUrl}/${summoner.id}`, opts)
            rank = await rank.json()
            if (!rank[0]) {
                return summoner = {
                    ...summoner,
                    unranked: true
                }
            }

            summoner = {
                ...summoner,
                leagueName: rank[0].leagueName,
                tier: rank[0].tier,
                rank: rank[0].rank,
                points: rank[0].leaguePoints,
                wins: rank[0].wins,
                losses: rank[0].losses,
            }

            return summoner
        }

        // fetchin data
        leagueFetch()
            .then(data => {
                if (!data.name) {
                    return message.channel.send('Summoner not found.')
                }

                if (data.unranked) {
                    return message.channel.send({
                        embed: msgEmbed({
                            client,
                            flex,
                            color: 16115283,
                            title: data.name,
                            fields: [
                                {
                                    name: 'Level',
                                    value: data.lvl
                                }, {
                                    name: 'Unranked',
                                    value: 'Play at least 10 matches in ranked mode.'
                                }
                            ]
                        }, {
                                thumbnail: {
                                    url: `${iconUrl}/${data.name}.png`
                                }
                            })
                    })
                }

                message.channel.send({
                    embed: msgEmbed({
                        client,
                        flex,
                        color: 16115283,
                        title: data.name,
                        fields: [
                            {
                                name: 'Level',
                                value: data.lvl
                            }, {
                                name: 'League Name',
                                value: data.leagueName
                            }, {
                                name: 'Rank',
                                value: `${data.tier} ${data.rank}`
                            }, {
                                name: 'League Points',
                                value: data.points
                            }, {
                                name: 'Ranked Wins',
                                value: data.wins
                            }, {
                                name: 'Ranked Losses',
                                value: data.losses
                            }
                        ]
                    }, {
                            thumbnail: {
                                url: `${iconUrl}/${data.name}.png`
                            }
                        })
                })
                console.log(data)
            })
    }
}

module.exports = league
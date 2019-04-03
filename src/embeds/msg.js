const msgEmbed = ({ client, color, title, fields, flex }, other) => {
    return {
        color: color,
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title,
        fields,
        ...other,
        footer: {
            icon_url: client.user.avatarURL,
            text: flex
        }
    }
}

module.exports = msgEmbed
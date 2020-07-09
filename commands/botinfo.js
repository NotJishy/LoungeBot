exports.run = async (msg, package, client, Discord) => {
    const infoEmbed = new Discord.MessageEmbed()
        .setTitle('LoungeBot Information')
        .setDescription('LoungeBot is the official bot of The Lounge Discord server. Here, you can see some information about its current status.')
        .setThumbnail(client.user.avatarURL())
        .addField(`🖥️ Version`, `v${package.version}`, true)
        .addField(`🌐 Ping`, `${Math.round(client.ws.ping)}ms`, true)
        .addField(`🟢 Uptime`, `${getUptime(client)}`)
        .setColor('BLUE')
    msg.channel.send(infoEmbed)
}

function getUptime(client) {
    let totalSeconds = (client.uptime / 1000)
    let days = Math.floor(totalSeconds / 86400)
    let hours = Math.floor(totalSeconds / 3600)
    
    totalSeconds %= 3600

    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds % 60)

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
}
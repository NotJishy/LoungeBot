exports.msgDelete = async (bot, messageDelete, config, Discord) => {

    var date = new Date()

    var body = ""
    if (!messageDelete.content) {

        body = "`null`"

    } else {

        body = `${messageDelete.content}`

    }

    const embed = new Discord.RichEmbed()
            .setColor('DARKBLUE')
            .setAuthor(`${messageDelete.author.username}`, `${messageDelete.author.avatarURL}`)
            .setTitle("Message Deleted:")
            .setDescription(`Message sent by ${messageDelete.author} has been deleted.`)
            .addField("Message content: ", (body))
            .addField("Channel:", `#${messageDelete.channel.name}`)
            .addField("Date & Time:", `${date}`)
    bot.channels.get(config.logsChannel).send(embed)
}
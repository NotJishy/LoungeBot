exports.hug = function (msg, args, Discord) {
    const hugs = require('../assets/hugs/hugs.json')

    if (!args[0]) {
        msg.reply('Please specify who you want to hug')
    } else {
        let gif = hugs[Math.floor(Math.random() * hugs.length)]

        const attachment = new Discord.Attachment(`./assets/hugs/${gif}.gif`, 'hug.gif')

        const embed = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setDescription(`${msg.author} hugged ${msg.mentions.members.first()}`)
            .setColor('#FF00FF')
            .attachFile(attachment)
            .setImage('attachment://hug.gif')
        msg.channel.send(embed)
    }
}
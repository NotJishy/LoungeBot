exports.history = function (msg, Discord) {
    let facts = require('../assets/history/facts.json')

    let selectFact = facts[Math.floor(Math.random() * facts.length)]

    const attachment = new Discord.Attachment(`./assets/history/${selectFact.name}.jpg`, 'history.jpg')

    const embed = new Discord.RichEmbed()
        .setDescription(selectFact.desc)
        .attachFile(attachment)
        .setImage('attachment://history.jpg')
    msg.channel.send(embed)
}
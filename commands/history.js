exports.history = function (msg, Discord) {

    var fs = require('fs')

    let facts = require('../assets/history/facts.json')

    let selectFact = facts[Math.floor(Math.random() * facts.length)]

    selectFact.count += 1;

    const attachment = new Discord.Attachment(`./assets/history/${selectFact.name}.jpg`, 'history.jpg')

    const embed = new Discord.RichEmbed()
        .setDescription(selectFact.desc)
        .attachFile(attachment)
        .setImage('attachment://history.jpg')
        .setFooter(`This historical fact has been chosen ${selectFact.count} times.`)
    msg.channel.send(embed)

    fs.writeFile('./assets/history/facts.json', JSON.stringify(facts), (err) => {
        if (err) {
            console.log(err)
        }
    })
}
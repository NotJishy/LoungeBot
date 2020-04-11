exports.president = function (msg, Discord, red, blue, grey) {

    let presList = require('../assets/presidents/presidents.json')

    let selectPres = presList[Math.floor(Math.random() * presList.length)];

    selectPres.count += 1

    var color = ""
    var party = ""
    if (selectPres.party == "R") {
        color = red
        party = "Republican"
    } else if (selectPres.party == "D") {
        color = blue
        party = "Democrat"
    } else if (selectPres.party == "DR") {
        color = '#ffffff'
        party = "Democratic Republican"
    } else if (selectPres.party == "W") {
        color = '#F0C862'
        party = "Whig"
    } else if (selectPres == "F") {
        color = '#000000'
        party = "Federalist"
    } else if (selectPres == "null") {
        color = grey
        party = "none"
    }

    const attachment = new Discord.Attachment(`./assets/presidents/${selectPres.name}.png`, 'president.png')

    const embed = new Discord.RichEmbed()
        .setTitle(selectPres.name)
        .setColor(color)
        .attachFile(attachment)
        .setImage('attachment://president.png')
        .setFooter(`${party} \nThis president has been chosen ${selectPres.count} times.`)
    msg.channel.send(embed)
}
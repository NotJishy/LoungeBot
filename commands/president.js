exports.president = function (msg, Discord) {

    var fs = require('fs')

    let presList = require('../assets/presidents/presidents.json')

    let selectPres = presList[Math.floor(Math.random() * presList.length)];

    selectPres.count += 1

    var color = ""
    var party = ""
    if (selectPres.party == "R") {
        color = 'RED'
        party = "Republican"
    } else if (selectPres.party == "D") {
        color = 'BLUE'
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
        color = 'GREY'
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

    fs.writeFile('./assets/presidents/presidents.json', JSON.stringify(presList), (err) => {
        if (err) {
            console.log(err)
        }
    })
}
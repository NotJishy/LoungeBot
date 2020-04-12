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

exports.edit = async (msg, args, Discord, bot) => {

    var fs = require('fs')

    let facts = require('../assets/history/facts.json')

    if (msg.author.id == "371825847440769024" || msg.author.id == "377989938680954902") {
        // lb!edithistory add <name> <description>
        // lb!edithistory editname <name> <new name>
        // lb!edithistory editdesc <name> <new description>
        // lb!edithistory check <name>
        // lb!edithistory remove <name>

        const loading = new Discord.RichEmbed()
        .setDescription(`${bot.emojis.get("698700264877850684")} Please wait...`)

        switch (args[0]) {
            case 'add':
                let m = await msg.channel.send(loading)

                var i;
                var check = 0;
                for (i = facts.length - 1; i > -1; i--) {
                    if (args[1] == facts[i].name) {
                        const exists = new Discord.RichEmbed()
                            .setDescription(`${args[1]} already exists.`)
                        m.edit(exists)
                        check++;
                    }
                }
                
                if (check == 0) {
                    newFact = {
                        name: (args[1]),
                        desc: args.slice(2).join(' '),
                        count: 0
                    };
    
                    facts.push(newFact)
    
                    if (msg.attachments.first()) {

                        const https = require('https')

                        const file = fs.createWriteStream(`./assets/history/${newFact.name}.jpg`)
                        https.get(msg.attachments.first().url, function (response) {
                            response.pipe(file)
                        })

                        fs.writeFile("./assets/history/facts.json", JSON.stringify(facts), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
        
                        const embed = new Discord.RichEmbed()
                            .setTitle(`New Historical Fact Added!`)
                            .setDescription(args.slice(2).join(' '))
                        m.edit(embed)
                    } else {
                        const noimage = new Discord.RichEmbed()
                            .setDescription('You need an image!')
                        m.edit(noimage)
                    }
                }
                break;
            case 'check':
                if (args[1]) {
                    var i;
                    var check = 0;
                    for (i = facts.length - 1; i > -1; i--) {
                        if (args[1] == facts[i].name) {
                            const attachment = new Discord.Attachment(`./assets/history/${facts[i].name}.jpg`, 'history.jpg')
                            
                            const found = new Discord.RichEmbed()
                                .setDescription(facts[i].desc)
                                .attachFile(attachment)
                                .setImage('attachment://history.jpg')
                                .setFooter(`This historical fact has been chosen ${facts[i].count} times.`)
                            msg.channel.send(found)

                            check++;
                        }
                    }

                    if (check == 0) {
                        msg.reply(`could not find fact by the name of ${args[1]}`)
                    }
                } else {
                    msg.reply('you need to specify which history fact to search for!')
                }
                break;
        }
    } else {
        msg.reply('You cannot run that command!')
    }
}
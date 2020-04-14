exports.htgawm = function (msg, Discord) {

    const fs = require('fs')
    const responses = require('../assets/htgawm/responses.json') 

    let selectResponse = responses[Math.floor(Math.random() * responses.length)]

    selectResponse.count++

    const attachment = new Discord.Attachment(`./assets/htgawm/${selectResponse.name}.png`, 'htgawm.png')

    const embed = new Discord.RichEmbed()
        .setDescription(selectResponse.desc)
        .setColor('#C60011')
        .attachFile(attachment)
        .setImage('attachment://htgawm.png')
        .setFooter(`This HTGAWM fact has been chosen ${selectResponse.count} times.`)
    msg.channel.send(embed)

    fs.writeFile('./assets/htgawm/responses.json', JSON.stringify(responses), (err) => {
        if (err) {
            console.log(err)
        }
    })
}

exports.edit = async (msg, args, Discord, bot) => {
    
    var fs = require('fs')

    let responses = require('../assets/htgawm/responses.json')

    if (msg.author.id == "371825847440769024" || msg.author.id == "377989938680954902") {
        // lb!edithtgawm add <name> <description>
        // lb!edithtgawm editname <name> <new name>
        // lb!edithtgawm editdesc <name> <new description>
        // lb!edithtgawm check <name>
        // lb!edithtgawm remove <name>

        const loading = new Discord.RichEmbed()
        .setDescription(`${bot.emojis.get("698700264877850684")} Please wait...`)

        switch (args[0]) {
            case 'add':
                let m = await msg.channel.send(loading)

                var i;
                var check = 0;
                for (i = responses.length - 1; i > -1; i--) {
                    if (args[1] == responses[i].name) {
                        const exists = new Discord.RichEmbed()
                            .setDescription(`${args[1]} already exists.`)
                        m.edit(exists)
                        check++;
                    }
                }
                
                if (check == 0) {
                    newResponse = {
                        name: (args[1]),
                        desc: args.slice(2).join(' '),
                        count: 0
                    };
    
                    responses.push(newResponse)
    
                    if (msg.attachments.first()) {

                        const https = require('https')

                        const file = fs.createWriteStream(`./assets/htgawm/${newResponse.name}.png`)
                        https.get(msg.attachments.first().url, function (response) {
                            response.pipe(file)
                        })

                        fs.writeFile("./assets/htgawm/responses.json", JSON.stringify(responses), (err) => {
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
                    for (i = responses.length - 1; i > -1; i--) {
                        if (args[1] == responses[i].name) {
                            const attachment = new Discord.Attachment(`./assets/htgawm/${responses[i].name}.png`, 'htgawm.png')
                            
                            const found = new Discord.RichEmbed()
                                .setDescription(responses[i].desc)
                                .attachFile(attachment)
                                .setImage('attachment://htgawm.png')
                                .setFooter(`This HTGAWM fact has been chosen ${responses[i].count} times.`)
                            msg.channel.send(found)

                            check++;
                        }
                    }

                    if (check == 0) {
                        msg.reply(`could not find response by the name of ${args[1]}`)
                    }
                } else {
                    msg.reply('you need to specify which HTGAWM fact to search for!')
                }
                break;
            case 'count':
                var i
                var count = 0
                for (i = 0; i < responses.length; i++) {
                    count++
                }
                const embed = new Discord.RichEmbed()
                    .setDescription(`There are a total of ${count} responses.`)
                msg.channel.send(embed)
                break;
        }
    } else {
        msg.reply('You cannot run that command!')
    }
}
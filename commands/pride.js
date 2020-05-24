exports.pride = function (msg, Discord) {

    const fs = require('fs')
    const responses = require('../assets/pride/responses.json') 

    let selectResponse = responses[Math.floor(Math.random() * responses.length)]

    selectResponse.count++

    const attachment = new Discord.Attachment(`./assets/pride/${selectResponse.name}.png`, 'pride.png')

    let colorsList = [
        "E40303", //red
        "FF8C00", //orange
        "FFED00", //yellow
        "008026", //green
        "004DFF", //blue
        "750787" //purple
    ]

    let color = colorsList[Math.floor(Math.random() * colorsList.length)]

    const embed = new Discord.RichEmbed()
        .setDescription(selectResponse.desc)
        .setColor(`#${color}`)
        .attachFile(attachment)
        .setImage('attachment://pride.png')
        .setFooter(`This Pride fact has been chosen ${selectResponse.count} times.`)
    msg.channel.send(embed)

    fs.writeFile('./assets/pride/responses.json', JSON.stringify(responses), (err) => {
        if (err) {
            console.log(err)
        }
    })
}

exports.edit = async (msg, args, Discord, bot) => {
    
    var fs = require('fs')

    let responses = require('../assets/pride/responses.json')

    if (msg.author.id == "371825847440769024" || msg.author.id == "377989938680954902") {
        // lb!editpride add <name> <description>
        // lb!editpride check <name>

        switch (args[0]) {
            case 'add':
                var i;
                var check = 0;
                for (i = responses.length - 1; i > -1; i--) {
                    if (args[1] == responses[i].name) {
                        const exists = new Discord.RichEmbed()
                            .setDescription(`${args[1]} already exists.`)
                        msg.channel.send(exists)
                        check++;
                    }
                }
                
                if (check == 0) {
                    if (msg.attachments.first()) {
                        newResponse = {
                            name: (args[1]),
                            desc: args.slice(2).join(' '),
                            count: 0
                        };
        
                        responses.push(newResponse)

                        const https = require('https')

                        const file = fs.createWriteStream(`./assets/pride/${newResponse.name}.png`)
                        https.get(msg.attachments.first().url, function (response) {
                            response.pipe(file)
                        })

                        fs.writeFile("./assets/pride/responses.json", JSON.stringify(responses), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
        
                        const embed = new Discord.RichEmbed()
                            .setTitle(`New Pride Fact Added!`)
                            .setDescription(args.slice(2).join(' '))
                        msg.channel.send(embed)
                    } else {
                        const noimage = new Discord.RichEmbed()
                            .setDescription('You need an image!')
                        msg.channel.send(noimage)
                    }
                }
                break;
            case 'check':
                if (args[1]) {
                    var i;
                    var check = 0;
                    for (i = responses.length - 1; i > -1; i--) {
                        if (args[1] == responses[i].name) {
                            const attachment = new Discord.Attachment(`./assets/pride/${responses[i].name}.png`, 'pride.png')
                            
                            const found = new Discord.RichEmbed()
                                .setDescription(responses[i].desc)
                                .attachFile(attachment)
                                .setImage('attachment://pride.png')
                                .setFooter(`This Pride fact has been chosen ${responses[i].count} times.`)
                            msg.channel.send(found)

                            check++;
                        }
                    }

                    if (check == 0) {
                        msg.reply(`could not find response by the name of ${args[1]}`)
                    }
                } else {
                    msg.reply('you need to specify which Pride fact to search for!')
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
exports.disney = function (msg, args, Discord, config) {
    const fs = require('fs')

    let parks = fs.readdirSync(`./assets/disney/parks/`)

    if (args[0]) {
        if (args[0].toLowerCase() === 'random') {
            let park = parks[Math.floor(Math.random() * parks.length)]

            let responses = getParkResponses(park)
            let info = getPark(park)

            let response = responses[Math.floor(Math.random() * responses.length)]

            let attachment = new Discord.Attachment(`./assets/disney/parks/${park}/${response.name}.png`, `disney.png`)

            const responseEmbed = new Discord.RichEmbed()
                .setDescription(response.desc)
                .setColor(`#${info.color}`)
                .attachFile(attachment)
                .setImage(`attachment://disney.png`)
                .setFooter(`This Disney Parks fact has been chosen ${response.count} times!`)
            msg.channel.send(responseEmbed)

            countUp(park, responses, response)
        } else {
            var park = ` `
            for (i = 0; i < parks.length; i++) {
                if (args[0].toLowerCase() === parks[i]) {
                    park = args[0].toLowerCase()
                }
            }

            if (park === ` `) {
                listParks()
            } else {
                let responses = getParkResponses(park)
                let info = getPark(park)

                let response = responses[Math.floor(Math.random() * responses.length)]

                let attachment = new Discord.Attachment(`./assets/disney/parks/${park}/${response.name}.png`, `disney.png`)

                const responseEmbed = new Discord.RichEmbed()
                    .setDescription(response.desc)
                    .setColor(`#${info.color}`)
                    .attachFile(attachment)
                    .setImage(`attachment://disney.png`)
                    .setFooter(`This Disney Parks fact has been chosen ${response.count} times!`)
                msg.channel.send(responseEmbed)

                countUp(park, responses, response)
            }
        }
    } else {
        listParks()
    }

    function getParkResponses(park) {
        let info = JSON.parse(fs.readFileSync(`./assets/disney/parks/${park}/responses.json`, {
            encoding: `utf8`
        }, function(err) {
            if (err) {
                console.log(err)
            }
        }))

        return info
    }

    function getPark(park) {
        let parkInfo = JSON.parse(fs.readFileSync(`./assets/disney/parks/${park}/info.json`, {
            encoding: `utf8`
        }, function(err) {
            if (err) {
                console.log(err)
            }
        }))

        return parkInfo
    }

    function listParks() {
        const listEmbed = new Discord.RichEmbed()
            .setTitle(`All Disney Parks`)
            .setColor(`RANDOM`)
            .addField(`❓ Random`, `\`${config.prefix}parks random\``, true)
                
        for (i = 0; i < parks.length; i++) {
            let park = getPark(parks[i])

            listEmbed.addField(`${park.alias}`, `\`${config.prefix}parks ${parks[i]}\``, true)
        }

        msg.channel.send(listEmbed)
    }

    function countUp(park, responses, response) {
        response.count++

        fs.writeFileSync(`./assets/disney/parks/${park}/responses.json`, JSON.stringify(responses), (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
}

exports.edit = async (msg, args, Discord) => {
    const fs = require('fs')

    if (msg.author.id === `371825847440769024` || msg.author.id === `377989938680954902`) {
        // lb!editdisney add <park> <name> <description>
        // lb!editdisney check <name>

        let parks = fs.readdirSync(`./assets/disney/parks/`)

        var parkFound = false
        for (i = 0; i < parks.length; i++) {
            if (args[1] === parks[i]) {
                parkFound = true
            }
        }

        if (parkFound === true) {
            let responses = JSON.parse(fs.readFileSync(`./assets/disney/parks/${args[1]}/responses.json`, {
                encoding: `utf8`
            }, function(err) {
                if (err) {
                    console.log(err)
                }
            }))

            switch(args[0]) {
                case 'count':
                    var count = 0
                    for (i = 0; i < responses.length; i++) {
                        count++
                    }

                    const countEmbed = new Discord.RichEmbed()
                        .setDescription(`There are a totoal of ${count} responses.`)
                    msg.channel.send(countEmbed)
                break

                case 'add':
                    var exists = false
                    for (i = 0; i < responses.length; i++) {
                        if (args[2] === responses[i].name) {
                            const existsEmbed = new Discord.RichEmbed()
                                .setDescription(`${args[2]} already exists`)
                            msg.channel.send(existsEmbed)
                            exists = true
                        }
                    }

                    if (exists === false) {
                        if (msg.attachments.first()) {
                            newResponse = {
                                name: (args[2]),
                                desc: (args.slice(3).join(` `)),
                                count: 0
                            }

                            responses.push(newResponse)

                            const https = require('https')

                            const file = new fs.createWriteStream(`./assets/disney/parks/${args[1]}/${newResponse.name}.png`)
                            https.get(msg.attachments.first().url, function(response) {
                                response.pipe(file)
                            })

                            fs.writeFileSync(`./assets/disney/parks/${args[1]}/responses.json`, JSON.stringify(responses), (err) => {
                                if (err) {
                                    console.log(err)
                                }
                            })

                            const embed = new Discord.RichEmbed()
                                .setTitle(`New Disney Fact Added!`)
                                .setDescription(args.slice(3).join(' '))
                            msg.channel.send(embed)
                        } else {
                            const noImage = new Discord.RichEmbed()
                                .setDescription('You need an image!')
                            msg.channel.send(noImage)
                        }
                    }
                break

                case 'check':
                    if (args[2]) {
                        var exists = false
                        var response = ``
                        for (i = responses.length - 1; i > -1; i--) {
                            if (args[2] === responses[i].name) {
                                exists = true
                                response = responses[i]
                            }
                        }

                        if (exists === true) {
                            const attachment = new Discord.Attachment(`./assets/disney/parks/${args[1]}/${response.name}.png`, `disney.png`)

                            const found = new Discord.RichEmbed()
                                .setDescription(response.desc)
                                .attachFile(attachment)
                                .setImage(`attachment://disney.png`)
                                .setFooter(`This Disney Parks fact has been chosen ${response.count} times.`)
                            msg.channel.send(found)
                        } else {
                            msg.reply(`Cound not find response with the name \`${args[2]}\``)
                        }
                    } else {
                        msg.reply(`You need to specify which response to search for!`)
                    }
                break
            }
        } else {
            msg.reply(`Could not find park with the name \`${args[1]}\``)
        }
    }
}
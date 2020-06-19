exports.create = async (msg, Discord, args, config, bot) => {
    //lb!createpoll <amount of options>

    if (msg.member.roles.has(config.staffrole) || msg.author.id === '377989938680954902') {
        
        if (args[0]) {

            if (args[0] >= 16) {

                const embed = new Discord.MessageEmbed()
                    .setTitle('Too many options')
                    .setDescription('You cannot have more than 15 options!')
                    .setColor('#74FF00')
                msg.channel.send(embed)

            } else if (args[0] <= 1) {

                const embed = new Discord.MessageEmbed()
                    .setTitle('Not enough options')
                    .setDescription('You cannot have less than 2 options!')
                    .setColor('#74FF00')
                msg.channel.send(embed)

            } else {

                const options = args[0]

                const embed = new Discord.MessageEmbed()
                    .setTitle('Creating poll')
                    .setDescription('Please enter the poll.')
                    .setColor('#74FF00')
                msg.channel.send(embed)

                const filter = m => m.author.id === msg.author.id

                const collector = msg.channel.createMessageCollector(filter, { time: 10000 })

                collector.on('collect', async m => {

                    const embed = new Discord.MessageEmbed()
                        .setTitle('Poll collected!')
                        .setDescription('Sending poll to the poll channel.')
                        .setColor('#74FF00')
                    msg.channel.send(embed)

                    const poll = new Discord.MessageEmbed()
                        .setTitle('New Poll!')
                        .setAuthor(m.author.username, m.author.avatarURL)
                        .setDescription(m)
                        .setColor('#74FF00')
                    const pollMSG = await bot.channels.get(config.pollCH).send(poll)

                    // emojis
                    const emojis = {
                        1: "🇦",
                        2: "🇧",
                        3: "🇨",
                        4: "🇩",
                        5: "🇪",
                        6: "🇫",
                        7: "🇬",
                        8: "🇭",
                        9: "🇮",
                        10: "🇯",
                        11: "🇰",
                        12: "🇱",
                        13: "🇲",
                        14: "🇳",
                        15: "🇴"
                    }

                    var i;
                    for (i = 1; i <= options; i++) {

                        await pollMSG.react(emojis[i])

                    }

                })

            }

        } else {

            const embed = new Discord.MessageEmbed()
                .setTitle('Invalid Arguments')
                .setDescription('You did not specify how many options to include.')
                .setColor('#74FF00')
            msg.channel.send(embed)

        }

    } else {

        msg.reply('You do not have permission to run this command!')

    }

}

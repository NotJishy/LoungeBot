exports.question = async (bot, config, Discord, msg, args, xp) => {
    var fs = require('fs')

    let questions = require('../assets/trivia.json')

    let category = ''
    let categoryID = 0

    if (args[0]) {

        if (args[0] === 'list') {

            const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('Trivia Categories')

            for (i = 0; i < questions.length; i++) {

                embed.addField(`**${questions[i].category}**`, `\`${(questions[i].questions.length) + 1} questions\``, true)

            }

            msg.channel.send(embed)

        } else {

            for (i = 0; i < questions.length; i++) {

                if (args[0] === questions[i].category) {

                    category = questions[i].category

                    categoryID = i

                }

            }

        }

    } else {

        categoryID = Math.floor(Math.random() * questions.length)

        category = category[categoryID]

    }

    if (!args[0] || args[0] != 'list') {

        let question = questions[categoryID].questions[Math.floor(Math.random() * questions[categoryID].questions.length)]

        const embed = new Discord.RichEmbed()
            .setColor('#4200FF')
            .setAuthor(questions[categoryID].alias, questions[categoryID].icon)
            .setTitle(question.question)
            .setDescription(
                `🇦: ${question.A1.text}\n
    🇧: ${question.A2.text}\n
    🇨: ${question.A3.text}\n
    🇩: ${question.A4.text}`
            )
            .setFooter(`Rated difficulty: ${question.difficulty}`)
        await msg.channel.send(embed)

        const filter = m => m.author.id === msg.author.id
        const collector = msg.channel.createMessageCollector(filter, {
            time: 10000
        })

        let answered = false

        collector.on('collect', async m => {

            answer = m.content.toLowerCase().replace('a', 'A1').replace('b', 'A2').replace('c', 'A3').replace('d', 'A4')

            if (question.answer === answer) {
                if (!xp[msg.author.id]) {
                    xp[msg.author.id] = {
                        xp: 0,
                        level: 0
                    };
                }

                let curxp = xp[msg.author.id].xp;
                let curlvl = xp[msg.author.id].level;
                let nxtlvl = xp[msg.author.id].level * 1000 * curlvl;

                if (curlvl >= 0) {
                    var xpAdd
                    if (question.difficulty === 'super easy') {
                        xpAdd = 10
                    } else if (question.difficulty === 'easy') {
                        xpAdd = 20
                    } else if (question.difficulty === 'medium') {
                        xpAdd = 30
                    } else if (question.difficulty === 'hard') {
                        xpAdd = 40
                    }

                    xp[msg.author.id].xp = curxp + xpAdd;
                    if (nxtlvl <= xp[msg.author.id].xp) {
                        xp[msg.author.id].level = curlvl + 1;
                        if (curlvl > 0) {
                            let lvlup = new Discord.RichEmbed()
                                .setAuthor((msg.author.username), (msg.author.avatarURL))
                                .setColor(0xf3ff00)
                                .setDescription((msg.author.username) + " has leveled up to level **" + curlvl + "**");
                            bot.channels.get(config.lvlupch).send(lvlup);

                            if (msg.channel.id == (config.gifCH)) {
                                let gifs = [{
                                    "url": "https://i.imgur.com/gHgZNGf.gif"
                                }, {
                                    "url": "https://i.imgur.com/oF9z8Q9.gif"
                                }]
                                let gif = gifs[Math.floor(Math.random() * gifs.length)]

                                const gifEmbed = new Discord.RichEmbed()
                                    .setDescription(`${msg.author}, you have leveled up to level ${curlvl}`)
                                    .setColor(0xf3ff00)
                                    .setImage(`${gif.url}`)
                                msg.channel.send(gifEmbed)
                            } else {
                                const lvlupEmbed = new Discord.RichEmbed()
                                    .setColor(0xf3ff00)
                                    .setDescription(`${msg.author}, you have leveled up to level ${curlvl}`)
                                msg.channel.send(lvlupEmbed)
                            }
                        }

                        if (curlvl > 0) {
                            let lvlrole = msg.guild.roles.find(`name`, 'Lvl ' + curlvl);

                            if (!lvlrole) {
                                try {
                                    lvlrole = await msg.guild.createRole({
                                        name: "Lvl " + curlvl,
                                        color: "#006933",
                                        permissions: []
                                    });
                                } catch (e) {
                                    console.log(e.stack);
                                }
                            }
                            await (msg.member.addRole(`${lvlrole.id}`));
                        }

                        if (curlvl > 1) {
                            let previousrole = msg.guild.roles.find('name', 'Lvl ' + (curlvl - 1));
                            await (msg.member.removeRole(`${previousrole.id}`));
                        }
                    }

                    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });

                    const embed = new Discord.RichEmbed()
                        .setColor('#3AFF00')
                        .setTitle('Correct!')
                        .setDescription(`Congrats ${msg.author}, you got ${xpAdd} XP for getting a \`${question.difficulty}\` difficulty question correct!`)
                    msg.channel.send(embed)

                    console.log(`TRIVIA: ${msg.author.username} has been given ${xpAdd} xp, and is level ${curlvl}`);
                }

            } else {

                const embed = new Discord.RichEmbed()
                    .setColor('#FF0000')
                    .setTitle('Incorrect!')
                    .setDescription(`Sorry ${msg.author}, the answer was ${question.answer.replace('A1', '🇦').replace('A2', '🇧').replace('A3', '🇨').replace('A4', '🇩')}`)
                msg.channel.send(embed)

            }

            answered = true

            collector.stop()

        })

        collector.on('end', collected => {

            const embed = new Discord.RichEmbed()
                .setTitle('Out of time!')
                .setDescription(`${msg.author} did not answer the question in time!`)
                .setColor('#FF0000')

            if (answered === false) {

                msg.channel.send(embed)

            }

        })

    }

}
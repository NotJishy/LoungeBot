exports.question = async (Discord, msg, args) => {

    let questions = require('../assets/trivia.json')

    let category = ''
    let categoryID = 0

    if (args[0]) {

        for (i = 0; i < questions.length; i++) {

            if (args[0] === questions[i].category) {

                category = questions[i].category

                categoryID = i

            }

        }
       
    } else {

        categoryID = Math.floor(Math.random() * questions.length)

        category = category[categoryID]

    }

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
    const collector = msg.channel.createMessageCollector(filter, { time: 10000 })

    let answered = false

    collector.on('collect', m => {

        answer = m.content.toLowerCase().replace('a', 'A1').replace('b', 'A2').replace('c', 'A3').replace('d', 'A4')

        if (question.answer === answer) {

            const embed = new Discord.RichEmbed()
                .setColor('#3AFF00')
                .setTitle('Correct!')
                .setDescription(`Congrats ${msg.author}, you got the question correct!`)
            msg.channel.send(embed)

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
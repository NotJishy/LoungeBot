exports.run = function (msg, Discord) {
    const embed = new Discord.RichEmbed()
        .setTitle('LoungeBot Bug Reports Form')
        .setDescription(`This is where you can report bugs, typos, incorrect trivia question answers, etc.!`)
        .setColor('#C100FF')
        .setURL('https://forms.gle/PAfzDFBT21VYjAJJ6')
    msg.channel.send(embed)
}
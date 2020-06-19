exports.suggestion = function (msg, Discord) {
    const embed = new Discord.MessageEmbed()
        .setTitle('LoungeBot Suggestion Form')
        .setDescription(`This is where you can suggest features and/or changes to LoungeBot! Think of something you like about it, and what you don't like about it. Something you wan't to see added. `)
        .setColor('#C100FF')
        .setURL('https://forms.gle/9LPZ66CSQqEPkk4YA')
    msg.channel.send(embed)
}
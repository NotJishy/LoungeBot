exports.run = function (msg, Discord) {
    const embed = new Discord.RichEmbed()
        .setColor('BLUE')
        .setTitle(`Amount of members in ${msg.guild.name}`)
        .setDescription(`There are ${msg.guild.memberCount} total members!\nHumans: ${msg.guild.members.filter(m => m.user.bot === false).size}\nBots: ${msg.guild.members.filter(m => m.user.bot === true).size}`)
    msg.channel.send(embed)
}
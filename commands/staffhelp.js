exports.staffhelp = async (msg, Discord, config, blue, red) => {
    if (!msg.member.roles.has(config.staffrole)) {
        msg.channel.send({
            embed: {
                color: red,
                title: "Error:",
                description: "Insufficient Permissions!"
            }
        })
    } else {
        let shEmbed = new Discord.RichEmbed()
            .setColor(blue)
            .setTitle("Staff only commands:")
            .setDescription("Commands that can only be used by team members!")
            .addField("- " + (config.prefix) + "warn", "`Warn a user. Format: *" + (config.prefix) + "warn @user <reason>*`", true)
            .addField("- " + (config.prefix) + "ban", "`Ban a user from the server. Format: *" + (config.prefix) + "ban @user <reason>*`", true)
            .addField("- " + (config.prefix) + "mute (CURRENTLY BROKEN)", "`Mute a user for specified amount of time. Format: *" + (config.prefix) + "mute @user <time> <reason>*`", true)
            .addField("- " + (config.prefix) + "purge", "`Mass delete any amount of messages at once. Format: *" + (config.prefix) + "purge <amount>*`", true)
            .addField("- " + (config.prefix) + "announce", "`Send an announcement to the announcement channel. Format: *" + (config.prefix) + "announce <tag> <everyone | here | false> <message>*`", true)
            .addField("- " + (config.prefix) + "welcome", "`Edit and view the welcome message for new users. Format: *" + (config.prefix) + "welcome <view | new message>* (use \"{member}\" to mention the member.`", true)
        msg.channel.send(shEmbed);
    }
}
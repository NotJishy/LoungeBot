exports.changeprefix = async (msg, args, Discord, green, red, config) => {
    if (!msg.member.roles.has(config.staffrole)) {
        msg.channel.send({
            embed: {
                color: red,
                title: "Error:",
                description: "Insufficient permissions!"
            }
        })
    } else {
        if (!args[0]) {
            let badArgs = new Discord.MessageEmbed()
            .setColor(red)
            .setTitle("Error:")
            .setDescription("`Invalid Arguments. Please use the format: " + (config.prefix) + "changeprefix <prefix>`")
            msg.channel.send(badArgs);
        };
        if (args[0]) {
            config.prefix = args[0];
            let success = new Discord.MessageEmbed()
            .setColor(green)
            .setTitle("Success!")
            .setDescription("Command prefix has been changed to: `" + (config.prefix) + "`!")
            msg.channel.send(success);
        }
    }
}
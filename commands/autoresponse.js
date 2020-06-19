exports.autoresponse = function (msg, args, Discord, green, red, darkgold, config) {
    var fs = require('fs');
    const autoRespond = require("../autorespond");

    if (!msg.member.roles.has(config.staffrole)) {
        msg.channel.send({
            embed: {
                color: red,
                title: "Error:",
                description: "Insufficient permissions!"
            }
        })
    } else {
        switch (args[0]) {
            case 'edit':
                let error1 = new Discord.MessageEmbed()
                    .setColor(red)
                    .setTitle("Error:")
                    .setDescription("Invalid Arguments. Use the format: `" + (config.prefix) + "autoresponse edit <prefix> <response message>`!");
                if (!args[2]) {
                    msg.channel.send(error1);
                } else {
                    var message = args.slice(2).join(' ');
                    autoRespond[args[1]] = (message);
                    fs.writeFile("./autorespond.json", JSON.stringify(autoRespond), (err) => {
                        if (err) {
                            console.log(err);
                            bot.channels.get(logCH).send(err);
                        }
                    });

                    let success = new Discord.MessageEmbed()
                        .setColor(green)
                        .setTitle("Success!")
                        .setDescription("Auto response has been edited/added successfully!");
                    msg.channel.send(success);
                };
                break;
            case 'delete':
                if (!args[1]) {
                    let error2 = new Discord.MessageEmbed()
                        .setColor(red)
                        .setTitle("Error:")
                        .setDescription("Invalid Arguments. Please use format: `" + (config.prefix) + "autoresponse delete <prefix>`");
                    msg.channel.send(error2);
                } else {
                    let deleted = new Discord.MessageEmbed()
                        .setColor(green)
                        .setTitle("Deleted Successfully!")
                        .setDescription(autoRespond[args[1]]);
                    msg.channel.send(deleted);

                    delete autoRespond[args[1]];

                    fs.writeFile("./autorespond.json", JSON.stringify(autoRespond), (err) => {
                        if (err) {
                            console.log(err);
                            bot.channels.get(logCH).send(err);
                        }
                    });
                }
                break;
            case 'list':
                for (key in autoRespond) {
                    if (autoRespond.hasOwnProperty(key)) {
                        let list = new Discord.MessageEmbed()
                            .setColor(darkgold)
                            .setTitle(key)
                            .setDescription(autoRespond[key]);
                        msg.channel.send(list);
                    }
                }
                break;
            case 'deleteall':
                for (key in autoRespond) {
                    for (key in autoRespond) {
                        if (autoRespond.hasOwnProperty(key)) {
                            delete key;
                            fs.writeFile("./autorespond.json", JSON.stringify(autoRespond), (err) => {
                                if (err) {
                                    console.log(err);
                                    bot.channels.get(logCH).send(err);
                                }
                            });
                        }
                    }
                }
                break;
            default:
                let help = new Discord.MessageEmbed()
                    .setColor(red)
                    .setTitle("Auto responses command formatting-")
                    .setDescription("How to use auto response commands.")
                    .addField("edit:", "Adds or edits auto responses.\n`" + (config.prefix) + "autoresponse edit <prefix> <response>`", true)
                    .addField("list:", "Lists all current auto responses.\n`" + (config.prefix) + "autoresponse list`", true)
                    .addField("delete:", "Deletes specified auto response.\n`" + (config.prefix) + "autoresponse delete <prefix>`", true)
                    .addField("deleteall: (coming soon)", "Deletes all auto responses. You cannot get them back!\n`" + (config.prefix) + "autoresponse deleteall`", true);
                msg.channel.send(help);
        }
    }
}
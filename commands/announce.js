const red = 15158332
const green = 3066993
const purple = 10181046

exports.announce = function (bot, msg, args, announceCH, logCH, config) {

    const announceMSG = args.slice(2).join(' ');
    const announceTag = (args[0]);
    const announceFull = (announceMSG) + " @" + (announceTag);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    if (!msg.member.roles.has(config.staffrole)) {
        msg.channel.send({
            embed: {
                color: red,
                title: "Error:",
                description: "Insufficient permissions!"
            }
        })
    } else {
        if (!announceMSG) return msg.reply({
            embed: {
                color: red,
                title: "Error:",
                description: "`Invalid arguments. Please use the format: " + (config.prefix) + "announce <everyone | here | false> <message>` #002"
            }
        });
        if ((announceTag === "here") || (announceTag === "everyone") || (announceTag === "false")) {
            if ((announceTag === "here") || (announceTag === "everyone")) {
                bot.channels.get(announceCH).send(announceFull);
            };
            if ((announceTag === "false")) {
                bot.channels.get(announceCH).send(announceMSG);
            };

            msg.channel.send({
                embed: {
                    color: green,
                    title: "Success!",
                    description: "Announcement has been sent!"
                }
            });
            bot.channels.get(logCH).send({
                embed: {
                    color: purple,
                    title: "Announcement",
                    description: "Announcement has been sent by " + (msg.author),
                    fields: [{
                            name: "Announcement Content:",
                            value: (announceMSG)
                        },
                        {
                            name: "Ping:",
                            value: (announceTag)
                        },
                        {
                            name: "Date & Time:",
                            value: (date) + " @ " + (time)
                        }
                    ]
                }
            }).catch(err => {
                msg.reply({
                    embed: {
                        color: red,
                        title: "Error:",
                        description: "`An error has occured. Please contact jishy you fucking moron`"
                    }
                });
                console.log(err);
                bot.channels.get(logCH).send(err);
            })
        } else {
            msg.channel.send({
                embed: {
                    color: red,
                    title: "Error:",
                    description: "`Invalid arguments. Please use the format: " + (config.prefix) + "announce <everyone | here | false> <message>` #003"
                }
            });
        }
    }
}
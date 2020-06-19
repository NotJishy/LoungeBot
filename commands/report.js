const green = 3066993
const red = 15158332
const navy = 3426654


exports.report = function (bot, args, msg, config) {

    let user = msg.mentions.users.first()

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const reason = args.slice(1).join(' ');

    if (!args[1]) return msg.reply({
        embed: {
            title: "Error",
            description: "`Invalid Arguments: Please use the format \"+report <user> <reason>`",
            color: red
        }
    });
    msg.channel.send({
        embed: {
            color: green,
            title: "Success!",
            description: "User successfully reported!"
        }
    });
    bot.channels.get(config.reportsChannel).send({
        embed: {
            color: navy,
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
            },
            title: "Report",
            description: (user) + " has been reported by " + (msg.author),
            fields: [{
                    name: "Reason:",
                    value: "\"`" + (reason) + "`\""
                },
                {
                    name: "Date & Time:",
                    value: (date) + " @ " + (time)
                },
                {
                    name: "Channel:",
                    value: "#" + (msg.channel.name)
                }
            ]
        }
    }).catch(err => {
        msg.reply({
            embed: {
                title: "Error",
                description: "`Invalid Arguments: Please use the format \"+report <user> <reason>`",
                color: red
            }
        });
        console.log(err);
        bot.channels.get(logCH).send(err);
    });
};
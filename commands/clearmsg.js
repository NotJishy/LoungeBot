const red = 15158332
const gold = 15844367
const green = 3066993

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

exports.clearmsg = function (msg, args, bot, config) {
    if (!msg.member.roles.has(config.staffrole)) {
        msg.channel.send({
            embed: {
                color: red,
                title: "Error:",
                description: "Insufficient permissions!"
            }
        })
    } else {
        if (!args[0]) return msg.reply({
            embed: {
                title: "Error:",
                color: red,
                description: "`Invalid arguments: Please specify amount of messages to clear`"
            }
        });
        msg.channel.bulkDelete((args[0]));
        msg.channel.send({
            embed: {
                color: green,
                title: "Success!",
                description: "`Deleted " + (args[0]) + " messages`"
            }
        }).then(msg => {
            msg.delete(3000)
        });
        bot.channels.get(config.logsChannel).send({
            embed: {
                author: {
                    name: (msg.author.username),
                    icon_url: (msg.author.avatarURL)
                },
                color: gold,
                title: "Message Purge",
                description: "**" + (args[0]) + "** messages deleted by " + (msg.author),
                fields: [{
                        name: "Channel:",
                        value: "#" + (msg.channel.name)
                    },
                    {
                        name: "Date & Time:",
                        value: (date) + " @ " + (time)
                    }
                ]
            }
        })
    }
};
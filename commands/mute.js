const Discord = require('discord.js');
const bot = new Discord.Client();

const red = 15158332
const green = 3066993


//date and time shit
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var fs = require('fs');

exports.mute = async (bot, msg, paramtime, logCH, timeLogs, args, reason, config) => {
    //+mute @user 1s/1m/1h/1d <reason>

    let user = msg.guild.member(msg.mentions.users.first());

    if (!user) return msg.reply({
        embed: {
            color: red,
            title: "Error:",
            description: "Invalid arguments. Please use the format: `" + (config.prefix) + "mute @user <time> [reason]`"
        }
    });
    let muterole = msg.guild.roles.find(`name`, "Muted");

    //start of bot creating muted role, if muted role does not already exist
    if (!muterole) {
        try {
            muterole = await msg.guild.createRole({
                name: "Muted",
                color: "#818386",
                permissions: []
            })
            msg.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                });
            });
        } catch (e) {
            console.log(e.stack);
            bot.channels.get(logCH).send(e.stack);
        }
    }

    let mutetime = args[1];

    await (user.addRole(`${muterole.id}`));
    msg.channel.send({
        embed: {
            color: green,
            title: "Success!",
            description: "User, " + (`${user}`) + " has been temporarily muted by " + (`${msg.author}`)
        }
    });
    if (`${user}`) {
        msg.mentions.members.first().send({
            embed: {
                color: red,
                title: (`${msg.guild.name}`),
                description: "You have been muted for " + (`${mutetime}`),
                fields: [{
                    name: "Reason:",
                    value: (`${reason}`)
                }]
            }
        }).catch(function (err) {
            if (err != "DiscordAPIError: cannot send message to this user")
                console.log(err);
                bot.channels.get(logCH).send(err);
        });
    }
    bot.channels.get(logCH).send({
        embed: {
            color: red,
            author: {
                name: (`${msg.author.username}`),
                icon_url: (`${msg.author.avatarURL}`)
            },
            title: "Mute",
            description: (`${user}`) + " has been muted by " + (`${msg.author}`),
            fields: [{
                    name: "Length:",
                    value: (`${mutetime}`)
                },
                {
                    name: "Reason:",
                    value: "\"`" + (`${reason}`) + "`\""
                },
                {
                    name: "Date & Time:",
                    value: (`${date}`) + " @ " + (`${time}`)
                }
            ]
        }
    });
    if (!fs.existsSync('./logs/mutes/' + (`${user.id}`))) {
        fs.mkdirSync('./logs/mutes/' + (`${user.id}`));
    };
    if (!fs.existsSync('./logs/mutes/' + (`${user.id}`) + '/' + (`${date}`))) {
        fs.mkdirSync('./logs/mutes/' + (`${user.id}`) + '/' + (`${date}`));
    };
    fs.writeFile('./logs/mutes/' + (`${user.id}`) + '/' + (`${date}`) + '/' + (timeLogs) + '.txt', (`${user}`) + '(' + (`${user.username}`) + ')' + '\n\nDate & Time:\n' + (`${date}`) + ' @ ' + (`${time}`) + '\n\nMuted by:\n' + (`${msg.author}`) + '(' + (`${msg.author.username}`) + ')' + '\n\nLength:\n' + (`${mutetime}`) + '\n\nReason:\n' + (`${reason}`), function (err) {
        if (err) {
            return console.log(err)
            .then(bot.channels.get(logCH).send(err));
        };
    });

    setTimeout(function () {
        user.removeRole(`${muterole.id}`);

        today = new Date();
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


        bot.channels.get(logCH).send({
            embed: {
                color: green,
                author: {
                    name: (`${user.username}`),
                    icon_url: (user.avatarURL)
                },
                title: "Unmute",
                description: "User, " + (`${user}`) + " has been unmuted.",
                fields: [{
                        name: "Unmuted by:",
                        value: "`time`"
                    },
                    {
                        name: "Date & Time:",
                        value: (`${date}`) + " @ " + (`${time}`)
                    }
                ]
            }
        });
    }, ms(mutetime))
}
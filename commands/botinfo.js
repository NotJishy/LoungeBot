const { DiscordAPIError } = require("discord.js");

const blue = 3447003

exports.botinfo = async (msg, args, package, config, bot) => {
    switch (args[0]) {
        case 'version':
            msg.channel.send('Version ' + package.version);
            break
        case 'ping':
            const m = await msg.channel.send("Loading... " + bot.emojis.get("644345141183643664"))
            m.edit(`${m.createdTimestamp - msg.createdTimestamp}` + " ms");
            break;

        case 'commands':
            msg.reply({
                embed: {
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    color: blue,
                    title: "Commands:",
                    description: "All of the info commands.\n",
                    fields: [{
                            name: (config.prefix) + "botinfo version",
                            value: "`View the version of the bot`",
                        },
                        {
                            name: (config.prefix) + "botinfo ping",
                            value: "`Get the bots ping.`",
                        },
                        {
                            name: (config.prefix) + "botinfo commands",
                            value: "`View this list`",
                        },
                    ]
                }
            });
            break;

        default:
            msg.reply({
                embed: {
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    color: blue,
                    title: "Commands:",
                    description: "All of the info commands.\n",
                    fields: [{
                            name: (config.prefix) + "botinfo version",
                            value: "`View the version of the bot`",
                        },
                        {
                            name: (config.prefix) + "botinfo ping",
                            value: "`Get the bots ping.`",
                        },
                        {
                            name: (config.prefix) + "botinfo commands",
                            value: "`View this list`",
                        }
                    ]
                }
            });
            break
        }
    }

exports.run = async (msg, package, client, Discord) => {
    const infoEmbed = new Discord.MessageEmbed()
        .setTitle('LoungeBot Information')
        .setDescription('LoungeBot is the official bot of The Lounge Discord server. Here, you can see some information about its current status.')
        .setThumbnail(client.user.avatarURL())
        .addField(`🖥️ Version`, `v${package.version}`, true)
        .addField(`🌐 Ping`, `${Math.round(client.ws.ping)}ms`, true)
        .addField(`🟢 Uptime`, `${getUptime(client)}`)
        .setColor('BLUE')
    msg.channel.send(infoEmbed)
}

function getUptime(client) {
    let totalSeconds = (client.uptime / 1000)
    let days = Math.floor(totalSeconds / 86400)
    let hours = Math.floor(totalSeconds / 3600)
    
    totalSeconds %= 3600

    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds % 60)

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
}
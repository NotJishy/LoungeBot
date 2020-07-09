// This is created and maintained by unpaid voluntary developers on The Lounge. All credit goes where it is deserved.

const Discord = require('discord.js')
const client = new Discord.Client()

const commands = require('./commands/commands')
const listeners = require('./listeners/listeners')

const xp = require('./xp.json')
const config = require('./config.json')
const package = require('./package.json')
const welcome = require('./welcome.json')
const { messageDeleteListener } = require('./listeners/listeners')

// When bot is on and logged in
client.on('ready', () => {
    console.log('LoungeBot enabled.')

    client.user.setPresence({ activity: { name: `LoungeBot v${package.version}`, type: 'PLAYING' }, status: 'online' })
})

// When a new member joins the guild
client.on('guildMemberAdd', (member) => {
    if (!member.user.bot) {
        const welcomeEmbed = new Discord.MessageEmbed()
            .setTitle(`${member.guild.memberCount} members!`)
            .setDescription((welcome.MSG).replace(`{member}`, `${member}`))
            .setColor('#3ab4ff')
            .setTimestamp()
            .setThumbnail(member.user.avatarURL)
        member.guild.channels.get(config.generalCH).send(welcomeEmbed)
    }
})

// When a message is sent
client.on('message', async (msg) => {
    // Auto responses will be added back at a later date

    var args = ''
    if (msg.content.indexOf(config.prefix) === 0) {
        args = msg.content.slice(config.prefix.length).trim().split(/ +/g)
    } else {
        if ((msg.channel.type != 'dm') && (!msg.author.bot)) {
            listeners.XPGiver.level(msg, Discord, client, xp, config)
        }
    }

    switch(args[0]) {
        case 'botinfo':
            commands.botinfocommand.run(msg, package, client, Discord)
            break
        
        case 'clear':
            commands.clearmsgcommand.clearmsg(msg, args, client, config)
            break

        case 'report':
            commands.reportcommand.report(client, args, msg, config)
            break

        case 'help':
            commands.helpcommand.help(client. msg, args, config, Discord)
            break

        case 'ship':
            commands.shipcommand.ship(msg, args, purple, Discord, config)
            break

        case 'level' || 'profile':
            commands.levelcommand.lvlcheck(msg, Discord, xp)
            break

        case 'cat':
            commands.cat.cat(msg, Discord)
            break

        case 'dog':
            commands.dog.dog(msg, Discord)
            break

        case 'president':
            commands.president.president(msg, Discord)
            break

        case '8ball':
            commands.eightball.eightball(Discord, msg, args)
            break

        case 'history':
            commands.history.history(msg, Discord)
            break
        
        case 'tv':
            commands.tv.tv(msg, Discord)
            break
        
        case 'createpoll':
            commands.poll.create(msg, Discord, args, config, client)
            break
        
        case 'hug':
            commands.hug.hug(msg, Discord, args, config, client)
            break

        case 'trivia':
            commands.trivia.question(client, config, Discord, msg, args, xp)
            break
        
        case 'meme':
            commands.meme.subreddit(Discord, msg)
            break

        case 'parks':
            commands.parks.disney(msg, args, Discord, config)
            break

        case 'movies':
            commands.movies.disney(msg, Discord)
            break

        case 'bird' || 'birb':
            commands.bird.subreddit(Discord, msg)
            break

        case 'dadjokes' || 'dadjoke':
            commands.dadjokes.dadjokes(msg, Discord)
            break

        case 'members':
            commands.membercount.run(msg, Discord)
            break
            
        case 'sendmessage':
            commands.sendmessage.run(client, msg, args, Discord, config)
            break
    }
})

// When a message is deleted
client.on('messageDelete', (messageDelete) => {
    listeners.messageDeleteListener.msgDelete(client, messageDelete, config, Discord)
})

// Login to Discord
client.login(config.token)
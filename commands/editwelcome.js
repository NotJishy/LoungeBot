exports.change = function (msg, args, welcome, Discord) {
    const fs = require('fs')

    if (msg.author.id == '371825847440769024' || msg.author.id == '377989938680954902') {
        switch(args[0]) {
            case 'view':
                const embed = new Discord.RichEmbed()
                    .setTitle(`${msg.guild.memberCount} members!`)
                    .setDescription((welcome.MSG).replace('{member}', `${msg.author}`))
                    .setColor('#3ab4ff')
                msg.channel.send(embed)
            break;
            default:
                if (args[0]) {
                    welcome.MSG = (args.slice(0).join(' '))
        
                    fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
        
                    msg.reply('Welcome message changed.')
                    const embed = new Discord.RichEmbed()
                        .setTitle(`${msg.guild.memberCount} members!`)
                        .setDescription((welcome.MSG).replace('{member}', `${msg.author}`))
                        .setColor('#3ab4ff')
                    msg.channel.send(embed)
                } else {
                    msg.reply('You need to reply what the welcome message is!')
                }
            break;
        }
    } else {
        msg.reply('You do not have permission to run this command!')
    }
}
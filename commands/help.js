const blue = 3447003

exports.help = function (bot, msg, args, config, Discord) {
    switch (args[0]) {
        default:
                const newHelp = new Discord.MessageEmbed()
                .setColor(blue)
                .setTitle("Commands Help!")
                .setDescription("All commands you can use with *LoungeBot-2000*!")
                .addField("**General**", "`" + (config.prefix) + "help general`", true)
                .addField("**Random**", "`" + (config.prefix) + "help random`", true)
                .addField("**Games**", "`" + (config.prefix) + "help games`", true)
                .addField("**Other**", "`" + (config.prefix) + "help other`", true)
                .setFooter("More commands comming soon!", (bot.user.avatarURL));
            msg.channel.send(newHelp);
            break;
        
        case 'general':
            const genHelp = new Discord.MessageEmbed()
                .setColor(blue)
                .setTitle("Commands Help!")
                .setDescription("All general commands:")
                .addField("***__help__***", "`Displays the commands help.`", true)
                .addField("***___report___***", "`Check your level and XP info.`", true)
                .addField("***__survival__***", "`Join information of our Lounge Survival Minecraft server!`", true)
                .addField("***__suggest__***", "`Get a link to the LoungeBot suggestions form.`", true)
                .setFooter("More commands comming soon!", (bot.user.avatarURL));
            msg.channel.send(genHelp);
            break;

        case 'random':
            const randHelp = new Discord.MessageEmbed()
                .setColor(blue)
                .setTitle("Commands Help!")
                .setDescription("All random commands:")
                .addField("***__ship__***", "`Put a cute heart between you and someone else and combime your name UwU.`", true)
                .addField("***__president__***", "`Get a random U.S. president.`", true)
                .addField(`***__history__***`, '`Get a random historical fact.`', true)
                .addField('***__tv__***', '`Get a random fact about the actors, characters, and events of different television Shows.`', true)
                .addField('***__parks__***', '`Get a random Disney Park fact.`', true)
                .addField("***__movies__***", '`Get a random Disney movie feature.`', true)
                .addField("***__dog__***", "`Get a random picture of a dog.`", true)
                .addField("***__cat__***", "`Get a random picture of a cat.`", true)
                .addField("***__bird__***", "`Get a random picture of a bird from a subreddit.`", true)
                .addField("***__trivia__***", "`Get a random trivia question to answer.`", true)
                .addField("***__meme__***", "`Get a random meme from a subreddit.`", true)
                .addField("***__dadjoke__***", "`Get a random dad joke from Reddit.`", true)
                .addField("***__pride__***", "`Get a random LGBTQ+ Pride activist, place, or event.`", true)
                .setFooter("More commands comming soon!", (bot.user.avatarURL));
            msg.channel.send(randHelp);
            break;

        case 'games':
            const gameHelp = new Discord.MessageEmbed()
                .setColor(blue)
                .setTitle("Commands Help!")
                .setDescription("All games commands:")
                .addField("***__level__***", "`Check yours or someone else's XP info.`", true)
                .addField("***__8ball__***", "`Ask the Magic 8Ball a question.`", true)
                .setFooter("More commands comming soon!", (bot.user.avatarURL));
            msg.channel.send(gameHelp);
            break;

        case 'other':
            const otherHelp = new Discord.MessageEmbed()
                .setColor(blue)
                .setTitle("Commands Help!")
                .setDescription("All other commands:")
                .addField("***__botinfo__***", "`Check some info about the bot.`", true)
                .setFooter("More commands comming soon!", (bot.user.avatarURL));
            msg.channel.send(otherHelp);
            break;
    }
}
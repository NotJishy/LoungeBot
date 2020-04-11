exports.lvlcheck = function (msg, args, Discord, user, xp) {
    let curxp = xp[msg.author.id].xp;
    let curlvl = xp[msg.author.id].level;
    let nxtlvl = xp[msg.author.id].level * 1000 * curlvl;
    let difference = nxtlvl - curxp;

    if (user) {
        let mentioncurxp = xp[user.id].xp;
        let mentioncurlvl = xp[user.id].level;
        let mentionnxtlvl = xp[user.id].level * 1000 * mentioncurlvl;
        let mentiondifference = mentionnxtlvl - mentioncurxp;

        let mentionlvlEmbed = new Discord.RichEmbed()
            .setAuthor((user.username), (user.avatarURL))
            .setTitle("Profile information for " + (user.username))
            .setColor(0xf3ff00)
            .setImage(user.avatarURL)
            .addField("Current XP:", mentioncurxp, true)
            .addField("Current Level:", mentioncurlvl - 1, true)
            .setFooter(`${mentiondifference} XP until level ` + (curlvl));
        msg.channel.send(mentionlvlEmbed);
    } else {
        let lvlEmbedB = new Discord.RichEmbed()
            .setAuthor((msg.author.username), (msg.author.avatarURL))
            .setTitle("Profile information for " + (msg.author.username))
            .setColor(0xf3ff00)
            .setImage(msg.author.avatarURL)
            .addField("Current XP:", curxp, true)
            .addField("Current Level:", (curlvl - 1), true)
            .setFooter(`${difference} XP until level ` + (curlvl));
        msg.channel.send(lvlEmbedB);
    }
}
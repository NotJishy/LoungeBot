exports.level = async (msg, Discord, bot, xp, config) => {
    var fs = require('fs');

    if (!xp[msg.author.id]) {
        xp[msg.author.id] = {
            xp: 0,
            level: 0
        };
    }

    let curxp = xp[msg.author.id].xp;
    let curlvl = xp[msg.author.id].level;
    let nxtlvl = xp[msg.author.id].level * 1000 * curlvl;

    if (curlvl >= 0) {
        let xpAdd = Math.floor(Math.random() * 50) + 20;

        xp[msg.author.id].xp = curxp + xpAdd;
        if (nxtlvl <= xp[msg.author.id].xp) {
            xp[msg.author.id].level = curlvl + 1;
            if (curlvl > 0) {
                let lvlup = new Discord.RichEmbed()
                    .setAuthor((msg.author.username), (msg.author.avatarURL))
                    .setColor(0xf3ff00)
                    .setDescription((msg.author.username) + " has leveled up to level **" + curlvl + "**");
                bot.channels.get(config.lvlupch).send(lvlup);

                if (msg.channel.id == (config.gifCH)) {
                    let gifs = [{ "url": "https://i.imgur.com/gHgZNGf.gif" }, { "url": "https://i.imgur.com/oF9z8Q9.gif" }]
                    let gif = gifs[Math.floor(Math.random() * gifs.length)]

                    const gifEmbed = new Discord.RichEmbed()
                        .setDescription(`${msg.author}, you have leveled up to level ${curlvl}`)
                        .setColor(0xf3ff00)
                        .setImage(`${gif.url}`)
                    msg.channel.send(gifEmbed)
                } else {
                    const lvlupEmbed = new Discord.RichEmbed()
                        .setColor(0xf3ff00)
                        .setDescription(`${msg.author}, you have leveled up to level ${curlvl}`)
                    msg.channel.send(lvlupEmbed)
                }
            }

            if (curlvl > 0) {
                let lvlrole = msg.guild.roles.find(`name`, 'Lvl ' + curlvl);

                if (!lvlrole) {
                    try {
                        lvlrole = await msg.guild.createRole({
                            name: "Lvl " + curlvl,
                            color: "#006933",
                            permissions: []
                        });
                    } catch (e) {
                        console.log(e.stack);
                    }
                }
                await (msg.member.addRole(`${lvlrole.id}`));
            }

            if (curlvl > 1) {
                let previousrole = msg.guild.roles.find('name', 'Lvl ' + (curlvl - 1));
                await (msg.member.removeRole(`${previousrole.id}`));
            }
        }

        fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
            if (err) {
                console.log(err);
            }
        });

        console.log(`${msg.author.username} has been given ${xpAdd} xp, and is level ${curlvl}`);
    }
}
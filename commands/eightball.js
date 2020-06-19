exports.eightball = async (Discord, msg, args) => {
    if (!args[0]) {
        const noArgs = new Discord.RichEmbed()
            .setColor('RED')
            .setTitle("Invalid Arguments!")
            .setDescription("`You did not ask a question. Be sure to ask the Magic 8Ball a question!`");
        msg.channel.send(noArgs);
    } else {
        let type = ["goodResponse", "neutralResponse", "badResponse"];
        let goodResponse = ["It is certain.", "It is decidedly so.", "Without of doubt", "Yes - definitely", "You may rely on it", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes."];
        let neutralResponse = ["Reply hazy, try again.", "Ask again later.", "Better not count on it.", "Cannot predict now.", "Concentrate and ask again."];
        let badResponse = ["Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
        
        let chooseType = type[Math.floor(Math.random() * type.length)];
        
        if (chooseType === "goodResponse") {
            const answer = new Discord.RichEmbed()
                .setColor('GREEN')
                .setDescription("🎱 " + (goodResponse[Math.floor(Math.random() * goodResponse.length)]));
            msg.channel.send(answer);
        } else if (chooseType === "neutralResponse") {
            const answer1 = new Discord.RichEmbed()
                .setColor('BLUE')
                .setDescription("🎱 " + (neutralResponse[Math.floor(Math.random() * neutralResponse.length)]));
            msg.channel.send(answer1);
        } else {
            const answer2 = new Discord.RichEmbed()
                .setColor('DARKRED')
                .setDescription("🎱 " + (badResponse[Math.floor(Math.random() * badResponse.length)]));
            msg.channel.send(answer2);
        }
    }
}
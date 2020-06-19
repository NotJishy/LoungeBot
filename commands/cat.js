exports.cat = async (msg, Discord) => {
    const superagent = require('superagent')

    let message = await msg.channel.send("Generating sexy cat image...")

    let {body} = await superagent
    .get('http://aws.random.cat/meow')
    //console.log(body.file)
    if (!{body}) return msg.channel.send("*An unkown error has occured. Please try again.*")

    let cEmbed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setAuthor((msg.author.username), (msg.author.avatarURL))
        .setTitle("Enjoy this sexy cat image ;)")
        .setImage(body.file);
    msg.channel.send(cEmbed);
    message.delete();
}
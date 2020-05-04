exports.dog = async (bot, msg, message, Discord, darkblue, superagent) => {
    let message = await msg.channel.send("Looking up the most unfunny dad jokes..")

    let {body} = await snekfetch
 .get('https://www.reddit.com/r/dadjokes.json?sort=hot&t=week')
    //console.log(body.file)
 .query({ limit: 800 });
    if (!{body}) return msg.channel.send('It seems we are out of fresh dad jokes!, Try again later.')
    const randomnumber = Math.floor(Math.random() * allowed.length)

let dadembed = new RichEmbed()
        .setColor(darkblue)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription(allowed[randomnumber].data.selftext)
        .setFooter("👍 Upvotes: " + allowed[randomnumber].data.ups + " / 📝 Comments: " + allowed[randomnumber].data.num_comments)
        msg.edit(embed)

}


    
    
     

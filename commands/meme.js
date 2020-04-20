exports.subreddit = function (Discord, msg) {

    let subs = ["dankmemes", "me_irl", "dank_meme"]
    let sub = subs[Math.floor(Math.random() * subs.length)]

    var request = require('request')
    request(`https://www.reddit.com/r/${sub}/hot.json`, function(error, response, body) {

        if (!error && response.statusCode == 200) {

            var importedJSON = JSON.parse(body);

            let post = importedJSON.data.children[Math.floor(Math.random() * importedJSON.data.children.length)]

            const embed = new Discord.RichEmbed()
                .setAuthor(post.data.author)
                .setTitle(post.data.title)
                .setColor("RANDOM")
                .setImage(post.data.url)
                .setFooter(`r/${sub}`)
            msg.channel.send(embed)

        }

    })

}
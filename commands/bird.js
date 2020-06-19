exports.subreddit = function (Discord, msg) {

    let subs = ["birds"]

    let sub = subs[Math.floor(Math.random() * subs.length)]

    var request = require('request')
    request(`https://www.reddit.com/r/birds/hot.json`, function(error, response, body) {

        if (!error && response.statusCode == 200) {

            var importedJSON = JSON.parse(body);

            let post = importedJSON.data.children[Math.floor(Math.random() * importedJSON.data.children.length)]

            const embed = new Discord.MessageEmbed()
                .setAuthor(post.data.author)
                .setTitle(post.data.title)
                .setColor("RANDOM")
                .setImage(post.data.url)
                .setFooter(`r/${sub} ○ 👍${post.data.ups} ○ 🏆${post.data.total_awards_received}`)
            msg.channel.send(embed)

        }

    })

}
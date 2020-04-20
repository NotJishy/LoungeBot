exports.subreddit = function (Discord, msg, args) {

    let subs = []

    if (!args[0]) {

        subs = ["dankmemes", "me_irl", "dank_meme", "Animememes"]

    } else if (args[0] === 'anime') {

        subs = ["Animememes"]

    } else if (args[0] === 'dank') {

        subs = ["dankmemes", "me_irl", "dank_meme"]

    } else if (args[0] === 'hydrohomies' || args[0] === 'hydro' || args[0] === 'water' || args[0] === 'h2o') {

        subs = ["HydroHomies"]

    }

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
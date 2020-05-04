exports.dadjokes = async (msg, Discord, darkblue) => {
   var request = require('request')
   request(`https://www.reddit.com/r/dadjokes/hot.json`, function(error, response, body) {
      if (!error && response.statusCode == 200) {

         var importedJSON = JSON.parse(body)

         let post = importedJSON.data.children[Math.floor(Math.random() * importedJSON.data.children.length)]

         const embed = new Discord.RichEmbed()
            .setColor(darkblue)
            .setTitle(post.data.title)
            .setDescription(post.data.selftext)
            .setFooter(`👍${post.data.ups} ○ 🏆${post.data.total_awards_received}`)
         msg.channel.send(embed)

      }
   })
}
    
    
     

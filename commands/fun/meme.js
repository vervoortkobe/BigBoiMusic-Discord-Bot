const {
    MessageEmbed
  } = require('discord.js');
  const fetch = require("node-fetch");
  
  module.exports = {
    name: "meme",
    description: "sends a random  hacking meme",
    run: async (client, message, args) => {

        const res = await fetch("https://and-here-is-my-code.glitch.me/memes/hacking/hackingmemes")
        .then(res => res.json())
        .then(json => {
          return json
        });

        
       
      
      console.log(res);
  
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(res.Link);
        
      
      message.channel.send(embed);
      }

}

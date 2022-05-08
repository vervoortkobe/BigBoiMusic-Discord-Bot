const {
    MessageEmbed
  } = require('discord.js');
  
  module.exports = {
    name: "leave",
    description: "leaves the current voice channel", 
    run: async (client, message, args, prefix) => {
      
      if(!message.member.voice.channel) return message.channel.send(`❌ | Please connect to a voice channel first!`);

      if(!message.guild.me.voice.channel) return message.channel.send(`❌ | I am currently not connected to a voice channel!`);
      
      if(message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send(`❌ | We aren't connected to the same voice channel!`);
      
      message.guild.me.voice.channel.leave();
      
      message.channel.send(`👋 | I have left the current voice channel!`);
      
      }

}

const {
    MessageEmbed
  } = require('discord.js');
  const ytdl = require("ytdl-core");
  const search = require("yt-search");
  
  module.exports = {
    name: "combined",
    description: "plays a song (searched by name or url)", 
    run: async (client, message, args, prefix, options) => {
  
      if(!message.member.voice.channel) return message.channel.send(`❌ | Please connect to a voice channel first!`);
      if(message.guild.me.voice.channel) return message.channel.send("Ik ben al verbonden");
      if(!args[0]) return message.channel.send(`❌ | You didn't define which song I have to play!`);
      
      var validate = await ytdl.validateURL(args[0]);
      if(!validate) {

        let songQuery = {
          query: args.join(" ")
        }
        
        search(songQuery, function (err, res) {
        if(err) return message.channel.send(`❌ | ERROR: ${err}`);
        
        var videos = res.videos.slice(0, 10);
        
        var response = "";
        
        for(var vid in videos) {
          response += `**[${parseInt(vid) + 1}]:** ${videos[vid].title} \r\n`;
        }
        
        response += `✅ | Choose a number between \`1-${videos.length}\`!`;
        
        message.channel.send(response);
        
        const filter = music => !isNaN(parseInt(music.content)) && music.content < videos.length && music.content > 0;
                                       
        const collection = message.channel.createMessageCollector(filter);
        
        collection.videos = videos;
        
        collection.once("collect", function (music) {
          var commandFile = require("./play.js");
          
          commandFile.run(client, message, this.videos[parseInt(music.content) - 1].url, options)
        });
      });
        
        
        
        
        
      } else {
      
      
      
      
      
      
      
      
      
        
      var info = await ytdl.getInfo(args[0]);

      var data = options.active.get(message.guild.id) || {};

      if(!data.connection) data.connection = await message.member.voice.channel.join();
      if(!data.queue) data.queue = [];

      data.guildID = message.guild.id;

      data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
      });

    if(!data.dispatcher) {
      Play(client, options, data);
    } else {
      message.channel.send(`${info.title} toegevoegd aan de queue door ${message.author.tag}`);
    }

options.active.set(message.guild.id, data);

    }
  }
  }

  async function Play(client, options, data) {
    client.channel.cache.get(data.queue[0].announceChannel).send(`${data.queue[0].title} nu aan het spelen door ${data.queue[0].requester}`);

    var options = {seek: 2, volume: 1, bitrate: 128000 };

    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: "audioonly"}), options);

    data.dispatcher.gildID = data.guildID;

    data.dispatcher.once("finish", function () {
      Finish(client, options,  this);
    });

  }

  function Finish(client, options, dispatcher) {
    var fetchedData = options.active.get(dispatcher.guildID);

    fetchedData.queue.shift();

    if(fetchedData.queue.length > 0) {
       
       options.active.set(dispatcher.gildID, fetchedData);

       Play(client, options, fetchedData);
    } else {
      options.active.delete(dispatcher.guildID);

      var voiceChannel = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
    }
  }

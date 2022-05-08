const express = require("express");
var Client = require("uptime-robot");

const app = express();

app.get("/", (req, res) => {
  res.send("online");
});

app.use(express.static("public"));
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port: " + listener.address().port);
});

///////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const opusscript = require("opusscript");
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const fetch = require("node-fetch");
const ffmpeg = require("ffmpeg-static");
const fs = require("fs");
let cooldown = new Set();
let cdseconds = 5;

client.aliases = new Discord.Collection();

client.on("ready", () => {
  console.log("Servers:");
  client.guilds.cache.forEach(guild => {
    console.log(" - " + guild.name);
  });
  let statuses = [
    `Your music`,
    `Owners are The Aussie Developer#5422,  Tsunami
#6271 and IcyberdCoding#3796`
  ];
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setPresence({
      status: "online",
      game: {
        name: status,
        type: "Listening"
      }
    });
  }, 20000);
});

client.on("channelCreate", channel => {
  console.log("Channel with ID: " + channel.id + " was just created");
});

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
  const prefix = process.env.PREFIX;

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.login(process.env.TOKEN);

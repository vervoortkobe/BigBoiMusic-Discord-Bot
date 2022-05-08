const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "command list",
    run: async (client, message, args) => {
    let botembed = new Discord.MessageEmbed()
    .setDescription(
    "Commands \n"+
    "m.play \n"+
    "m.leave \n"+
    "m.meme \n"+
    "m.kick \n" +
    "m.rlist \n" +
    "m.radio \n"
    )
    .setColor("#15f153")



    message.channel.send(botembed);
}

}

const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "kicks user",
    run: async (client, message, args) => {
 

      let kUser = message.mentions.users.first();
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
    
        let kickEmbed = new Discord.MessageEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Tiime", message.createdAt)
        .addField("Reason", kReason);
    
        let kickChannel = message.guild.channels.cache.find(`name`, "incidents");
        if(!kickChannel) return message.channel.send("Can't find incidents channel.");

        message.guild.member(kUser).kick(kReason);

        kickChannel.send(kickEmbed);


   


   

}

}

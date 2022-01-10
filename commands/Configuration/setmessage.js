const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **|** You dont have permission to use this command!")

    // TO DO
}
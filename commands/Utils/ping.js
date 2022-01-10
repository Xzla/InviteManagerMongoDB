const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    message.channel.send(":timer: **|** Chargement ...").then(m =>{
        m.edit(`:ping_pong: **|** The ping of **${client.user.username}** is \`${m.createdTimestamp - message.createdTimestamp}ms\` !`)
      })
}
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    let guildData = await client.data.getGuildDB(message.member.guild.id)

    let ranksString = "__List of invite reward roles :__"

    if (guildData.ranks && Object.keys(guildData.ranks).length > 0) {
        for (const [nbInv, roleInv] of Object.entries(guildData.ranks)) {
            ranksString = ranksString + `\n<@&${roleInv}> : **${nbInv} invites**`
        }
    } else {
        ranksString = ranksString + "\nNo Ranks Exist"
    }

    return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`${message.member.guild.name} Ranks`)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`${ranksString}

Obtain these roles by inviting people, use !invites to check how many invites your at
*Use the command \`${guildData.prefix}setprefix\` to configure these roles.*`)
    )

}
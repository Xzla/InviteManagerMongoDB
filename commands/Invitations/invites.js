const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if (!args[0]) {
        let userData = await client.data.getUserDB(message.member.id, message.member.guild.id)

        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(message.member.user.tag+"'s Invites")
            .setTimestamp()
            .setThumbnail(message.member.user.displayAvatarURL())
            .setFooter(`Requested by ${message.member.user.tag}`)
            .setDescription(`:infinity: **${!userData ? 0 : userData.invites_join}** Invites
:x: **${!userData? 0 : userData.invites_left}** Left
:poop: **${!userData ? 0 : userData.invites_invalid}** Fake
:sparkles: **${!userData ? 0 : userData.invites_bonus}** Bonus

:white_check_mark: You have **${!userData ? 0 : userData.invites}** invites ! :clap:`)
        )
    }

    let userTargeted = message.mentions.users.first()
    let userData = await client.data.getUserDB(userTargeted.id, message.member.guild.id)

    return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Invites of " + userTargeted.tag)
        .setTimestamp()
        .setThumbnail(userTargeted.displayAvatarURL())
        .setFooter(`Requested by ${message.member.user.tag}`)
        .setDescription(`:infinity: **${!userData ? 0 : userData.invites_join}** Invites
:x: **${!userData ? 0 : userData.invites_left}** Left
:poop: **${!userData ? 0 :userData.invites_invalid}** Fake
:sparkles: **${!userData ? 0 : userData.invites_bonus}** Bonus

:white_check_mark: They have **${!userData ? 0 : userData.invites}** invites! :clap:`)
    )

}
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: **|** You dont have permission to use this command!");

    let user = message.mentions.users.first();
    let guildData = await client.data.getGuildDB(message.member.guild.id)

    if (!user) return message.channel.send(`:x: **|** This user could not be found or you did not mention a user !\n__Example__: \`${guildData.prefix}edit-invites \`<@${message.author.id}>\` +10\``);
    if (!args[1]) return message.channel.send(`:x: **|** You must include a value in the command\n__Example__: \`${guildData.prefix}edit-invites \`<@${message.author.id}>\` +10\``)
    if (!(args[1].startsWith("+") || args[1].startsWith("-"))) return message.channel.send(`:x: **|** The value must start with \`+\` ou \`-\` !\n__Example__: \`${guildData.prefix}edit-invites \`<@${message.author.id}>\` +10\``)
    if (isNaN(args[1].slice(1))) return message.channel.send(`:x: **|** This number is invalid !\n__Example__: \`${guildData.prefix}edit-invites \`<@${message.author.id}>\` +10\``)

    let userData = await client.data.getUserDB(user.id, message.guild.id, "unknown")

    userData.invites = userData.invites + parseFloat(args[1])
    userData.invites_bonus = userData.invites_bonus + parseFloat(args[1])
    userData.save()

        return message.channel.send(`:white_check_mark: **|** Set <@${user.id}>'s invites to **${userData.invites}** (**${userData.invites_bonus}** bonus)`)
}
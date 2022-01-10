const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    let leaderboardData = await client.data.getLeaderboard(message.member.guild.id)
    if (!leaderboardData || (leaderboardData === undefined)) return message.channel.send(`:x: **|** Failed to load leaderboard on ${message.member.guild.name}. Please try again later ...`)

    let usernameArray = []
    for (const user of leaderboardData) {
        usernameArray.push(await message.member.guild.member(user._id).user.tag)
    }

    var counter = 0
    let leaderboardArray = []
    for (const username of usernameArray) {
        leaderboardArray.push(`\n**${counter + 1} |** ${username} - :white_check_mark: ${leaderboardData[counter].invites} :infinity: ${leaderboardData[counter].invites_join} :sparkles: ${leaderboardData[counter].invites_bonus} :poop: ${leaderboardData[counter].invites_invalid} :x: ${leaderboardData[counter].invites_left}`)
        counter++
    }

    message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(message.guild.name+ ' Invite Leaderboard')
        .setDescription(`Rankings of ${message.member.guild.name}
        
:white_check_mark: Confirmed Invites
:infinity: Invites
:sparkles: Bonus
:poop: Fake
:x: Left
${leaderboardArray}`)
        .setTimestamp()
        .setFooter(`Requested by ${message.member.user.tag}`)
    )
}
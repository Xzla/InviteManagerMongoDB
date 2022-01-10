const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **|** You dont have permission to use this command!")
    let guildData = await client.data.getGuildDB(message.member.guild.id)

    switch (args[0]) {
        case ("add"):
            const roles = message.member.guild.roles.cache.filter(role => role.name !== '@everyone' && !role.managed && message.member.guild.me.roles.highest.comparePositionTo(role) > 0)
            if (!roles.size) return message.channel.send(`:x: **|** Impossible d'ajouter un rank sans avoir de rôle sur **${message.member.guild.name}** !`)

            if (!args[1]) return message.channel.send(`:x: **|** Vous devez indiquer un rôle !\n__Exemple__: \`${guildData.prefix}setranks add \`<@&${roles.random().id}>\` 5\``)
            if (!args[2]) return message.channel.send(`:x: **|** Vous devez indiquer le nombre d'invitations nécessaires !\n__Exemple__: \`${guildData.prefix}setranks add \`<@&${roles.random().id}>\` 5\``)
            if (isNaN(args[2])) return message.channel.send(`:x: **|** Le nombre d'invitations nécessaires doit être un nombre valide !\n__Exemple__: \`${guildData.prefix}setranks add \`<@&${roles.random().id}>\` 5\``)

            if (!guildData.ranks) guildData.ranks = {}
            if (guildData.ranks[args[2]]) return message.channel.send(`:x: **|** Il y a déjà un rank avec **${args[2]} invitations**, il s'agit de <@&${await guildData.ranks[args[2]]}> !`)

            guildData.ranks[args[2]] = args[1].slice(3, -1)
            guildData.markModified('ranks')
            guildData.save()

            return message.channel.send(`:white_check_mark: **|** Le rank pour le rôle ${args[1]} avec **${args[2]} invitation(s)** a été ajouté !`)
        case ("remove"):
            if (!args[1]) return message.channel.send(`:x: **|** Vous devez indiquer le nombre d'invitations du rank que vous voulez supprimer !\n__Exemple__: \`${guildData.prefix}setranks remove 5\``)
            if (isNaN(args[1])) return message.channel.send(`:x: **|** Le nombre d'invitations du rank que vous voulez supprimer doit être un nombre valide !\n__Exemple__: \`${guildData.prefix}setranks add \`<@&${roles.random().id}>\` 5\``)
            if (!guildData.ranks[args[1]]) return message.channel.send(`:x: **|** Il n'y a pas de rank avec **${args[1]} invitations** !`)

            delete guildData.ranks[args[1]]
            guildData.markModified('ranks')
            guildData.save()

            return message.channel.send(`:white_check_mark: **|** Le rank avec **${args[1]} invitations** a été supprimé !`)
        case ("autoremove"):
            switch (args[1]) {
                case ("on"):
                    guildData.autoremoverank = true
                    guildData.save()
                    return message.channel.send(`:white_check_mark: **|** L'autoremove pour les ranks sur **${message.guild.name}** est **activé** !\nVous pouvez à tout moment le désactiver avec \`${guildData.prefix}setranks autoremove off\` !`)
                case ("off"):
                    guildData.autoremoverank = false
                    guildData.save()
                    return message.channel.send(`:white_check_mark: **|** L'autoremove pour les ranks sur **${message.guild.name}** est maintenant **désactivé** !\nous pouvez à tout moment le réactiver avec \`${guildData.prefix}setranks autoremove on\` !`)
                default:
                    if (guildData.autoremoverank === true) return message.channel.send(`:white_check_mark: **|** L'autoremove pour les ranks sur **${message.guild.name}** est **activé** !\nVous pouvez à tout moment le désactiver avec \`${guildData.prefix}setranks autoremove off\` !`)
                    return message.channel.send(`:white_check_mark: **|** L'autoremove pour les ranks sur **${message.guild.name}** est **désactivé** !\nVous pouvez à tout moment l'activer avec \`${guildData.prefix}setranks autoremove on\` !`)
            }
        default:
            let ranksString = "__Liste des rôles disponibles :__"

            if (guildData.ranks && Object.keys(guildData.ranks).length > 0) {
                for (const [nbInv, roleInv] of Object.entries(guildData.ranks)) {
                    ranksString = ranksString + `\n<@&${roleInv}> : **${nbInv} invitations**`
                }
            } else {
                ranksString = ranksString + "\nAucun rank existant."
            }

            return message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Ranks de ${message.member.guild.name}`)
                .setColor("GREEN")
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setDescription(`${ranksString}

*Exemple de commandes :*
● \`${guildData.prefix}setranks add @Premium 8\` pour ajouter le rank avec comme rôle **@Premium** pour **5 invitations**.
● \`${guildData.prefix}setranks remove 5\` pour supprimer le rank avec **5 invitations**.
● \`${guildData.prefix}setranks autoremove off\` pour désactiver l'autoremove des ranks.`)
            )
    }
}
const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../config.json");
const backup = require("discord-backup")

module.exports = {
    name: "backup-create",
    category: "backupcommands",
    aliases: ["bcreate"],
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | you need \`MANAGE_GUILD\` to run this command")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            // message.author.send(`Created a backup of ${message.guild.name}, To load it use \`${prefix}backup-load ${backupData.id}\``)
            message.author.send(
                {
                    embed: {
                        title: `Created a backup of ${message.guild.name}`,
                        description: `Here's The id: \`${backupData.id}\`\n to load it use \`${prefix}backup-load <id>\``,
                        color: 0x03fc24
                    }
                })
            message.channel.send(
                {
                    embed: {
                        description: "Created the backup! Please check your dms",
                        color: 0xff7700,
                    }
                }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
        })
    }
}
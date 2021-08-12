const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../config.json");
const backup = require("discord-backup")

module.exports = {
    name: "backup-create",
    category: "backupcommands",
    aliases: ["bcreate"],
    description: `creates a backup of the server`,
    usage: `${prefix}backup`,
    example: `${prefix}backup`,
    cooldowns: 5,
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | you need \`MANAGE_GUILD\` to run this command")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        message.channel.send({
                embed: {
                    description: "**Created the backup! Please check your dms**",
                    color: 0x03fc24,
                }
            }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
            
        backup.create(message.guild, { jsonBeautify: true }).then((backupData) => {
            message.author.send({
                embed: {
                    title: `Created a backup of ${message.guild.name}`,
                    description: `to load the backup use \`${prefix}backup-load ${backupData.id}\``,
                    color: 0x03fc24
                }
            }).catch((err) => {
                console.log(err)
                return message.channel.send(new MessageEmbed()
                    .setTitle("Error | ❌ Please Enabled DMs and Try Again!")
                    .setColor(0x03fc24)
                    .setTimestamp()
                    .setFooter(message.author.tag, message.member.user.displayAvatarURL()))
            })
        })
    }
}
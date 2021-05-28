const { MessageEmbed } = require('discord.js');
const backup = require("discord-backup")

module.exports = {
    name: "backup-list",
    category: "backupcommands",
    aliases: ['blist'],
    description: `show's a list of the backs servers`,
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | you need \`MANAGE_GUILD\` to run this command")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))


        backup.list().then((backups) => {
            // console.log(backups); // Expected Output [ "BC5qo", "Jdo91", ...]

            const embed = new MessageEmbed()
                .setTitle("List of backed up servers:")
                .setDescription(`\`${backups}\``)
                .setColor(0x03fc24)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
            return message.channel.send(embed)

        })
    }
}
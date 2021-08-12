const { MessageEmbed } = require('discord.js');
const db = require('../../model/reconDB');
const { prefix } = require("../../config.json")

module.exports = {
    name: 'autorole-check',
    description: "check to see if there's an auto-role on the server",
    aliases: ["ac", "autoc"],
    usage: `${prefix}autorole-check`,
    example: `${prefix}autorole-check`,
    category: 'utility',
    cooldowns: 10,
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_ROLES"))
            return message.channel.send(
                new MessageEmbed()
                    .setTitle("❌ Error | you need \`MANAGE_ROLES\` to run this command")
                    .setColor(0x03fc24)
                    .setTimestamp()
                    .setFooter(message.author.tag, message.member.user.displayAvatarURL())
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        const check = await db.has(`autorole-${message.guild.id}`);

        if (check === false) return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | There is no autorole set for this guild!")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        const role = await db.get(`autorole-${message.guild.id}`);
        message.channel.send(
            new MessageEmbed()
                .setTitle(`Autorole for ${message.guild.name}`)
                .setDescription(`<@&${role}> is the autorole!`)
                .setColor(0x03fc24)
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))
    }
}
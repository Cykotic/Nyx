const { MessageEmbed } = require('discord.js');
const db = require('../../model/reconDB');
const { prefix } = require("../../config.json")

module.exports = {
    name: 'autorole',
    description: "set the autorole, of the server",
    aliases: ["ac", "autoc"],
    usage: `${prefix}autorole <ROLE>`,
    example: `${prefix}autorole <@MEMBER>`,
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

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if (!role) return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | Role is not valid!")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        await db.set(`autorole-${message.guild.id}`, role.id);

        message.channel.send(
            {
                embed: {
                    description: `${role.name} is now the autorole!`,
                    color: 0x03fc24,
                }
            }
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
    }
}
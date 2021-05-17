const db = require("../../model/reconDB");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "auto-meme",
    category : 'autocommands',
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGE"))
            return message.channel.send(
                new MessageEmbed()
                    .setTitle("❌ Error | you don't have permission to use this command!")
                    .setColor(0xff7700)
                    .setTimestamp()
                    .setFooter(message.author.tag, message.member.user.displayAvatarURL())
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | no channel found")
                .setColor(0xff7700)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        let time = args[1]
        if (!time) return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | Please specify a time!")
                .setColor(0xff7700)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        time = ms(time)
        time = parseInt(time)
        await db.set(`automeme-${message.guild.id}`, [channel.id, time]);
        message.channel.send(
            {
                embed: {
                    description: `Automeme is set to ${channel}`,
                    color: 0xff7700,
                }
            }
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
    },
};
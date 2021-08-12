const { prefix } = require("../../config.json")
const { MessageEmbed } = require("discord.js");
const logChannels = '862685774579236864';

module.exports = {
    name: 'bug',
    description: "reporting a bug",
    aliases: ["Bug", "report"],
    usage: `${prefix}Bug <problem>`,
    example: `${prefix}Bug <problem>`,
    category: 'utility',
    cooldowns: 3,
    run: async (client, message, args) => {

        //query = args
        const query = args.join(" ");
        if (!query) return message.channel.send(new MessageEmbed()
            .setTitle("❌ Error | Please specify a bug")
            .setColor(0x03fc24)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        await message.delete()
        client.channels.cache.get(logChannels).send(
            new MessageEmbed()
                .setTitle("New Bug Report!")
                .setDescription(`> ❯ Reported Bug!: **${query}**`)
                .setColor(0x03fc24)
                .addField("Bug Information:", [
                    `> ❯ Author: ${message.author.toString()}`,
                    `> ❯ Guild: **${message.guild.name}**`,
                ])
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        )
        setTimeout(async () => {
            // sending please wait before the attack starts
            let msg = await message.channel.send(new MessageEmbed()
                .setColor(0x03fc24)
                .setTitle("Thank you for reporting the bug!"));
            msg.delete({ timeout: 20000 }).catch(e => console.log(e.message))

        }, 1000);
    }
}
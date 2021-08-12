const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'invite',
    category: "Information",
    aliases: ["inv"],
    description : `invite Nyx to your server`,
    cooldowns: 3,
    run : async(client, message, args) => {

        const embed = new MessageEmbed()
        .addField(`Nyx's Invite:`, [
            `> ❯ Invite: [Invite!](https://dsc.gg/nyyx)`,
            `> ❯ Vote: [Vote Nyx!](https://top.gg/bot/843721388866011156)`,
        ])
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        .setColor(0x03fc24)
        message.channel.send(embed)
    }
}
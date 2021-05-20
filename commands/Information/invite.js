const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'invite',
    category: "Information",
    description : `invite Nyx to yourserver`,
    run : async(client, message, args) => {

        const embed = new MessageEmbed()
        .addField("Nyx Bot Invite", [
            `> ❯ The link to invite ${client.user.tag}: [Click Meh!](https://dsc.gg/nyyx)`,
            "> ❯ Here's the support: [Click Meh!](https://discord.gg/9SQWXVzj32)",
        ])
        .setColor(0x03fc24)
        message.channel.send(embed)
    }
}
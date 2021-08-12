const { MessageEmbed } = require('discord.js')
const { prefix } = require("../../config.json")

module.exports = {
    name: "nuke",
    description: "nukes the channel and then makes a new one",
    aliases: ["nc"],
    usage: `${prefix}nuke`,
    example: `${prefix}nuke`,
    category: 'utility',
    cooldowns: 10,
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | you need \`MANAGE_CHANNELS\` to run this command")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        if (!message.channel.deletable) {
            return message.reply("This channel cannot be nuked! what are you thinking?")
        }

        message.channel.clone().then((channel)=> {
            channel.setParent(channel.parent.id)
            channel.setPosition(channel.position)
            message.channel.delete()

            return channel.send(new MessageEmbed()
            .setColor(0xff7700)
            .setImage('https://media1.tenor.com/images/953c50b25f0661d2267c968730b5ae36/tenor.gif')
            )
        }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
    }
}

const db = require('../../model/reconDB')

module.exports = {
    name: 'rmv-automeme',
    category: 'autocommands',
    run: async (client, message) => {

        if (!message.member.hasPermission("MANAGE_MESSAGE"))
        return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | you need \`MANAGE_MESSAGE\` to run this command")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        const guild = message.guild.id;
        if(await db.has(`automeme-${guild}`)) {
            await db.delete(`automeme-${guild}`)
        } else return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | there is no data stored")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
        message.message.channel.send(
            {
                embed: {
                    description: `Automeme has been turned off!`,
                    color: 0x03fc24,
                }
            }
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
    }
}
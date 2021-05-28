const { autokick } = require("../../utility/collection");
const { prefix } = require("../../config.json")

module.exports = {
    name: "auto-kick",
    category : 'autocommands',
    description: "mostly for anti-raid, it kicks out the people who are trting to join when this is active",
    aliases: ["aj", "autok"],
    usage: `${prefix}autokick [ON/OFF/LIST]`,
    example: `${prefix}autokick [ON/OFF/LIST]`,
    run: async (client, message, args) => {

        if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | you need \`MANAGE_MESSAGE\` to run this command")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        const arg = [`\n\`${prefix}autokick on\``, `\n\`${prefix}autokick off\``, `\n\`${prefix}autokick list\``]

        const query = args[0]?.toLowerCase();
        if (!query) return message.reply(
            {
                embed: {
                    description: `Please specify a argument: ${arg}!\n`,
                    color: 0x03fc24,
                }
            }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        const getCollection = autokick.get(message.guild.id);
        if (query === 'on') {
            if (getCollection)
                return message.reply(
                    {
                        embed: {
                            description: "Autokick is already \`ENABLED!\`"

                        }
                    }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

            autokick.set(message.guild.id, []);
            message.reply({
                embed: {
                    description: "Autokick: \`ENABLED\`",
                    color: 0x03fc24,
                }
            }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
        } else if (query === 'off') {
            if (!getCollection)
                return message.reply(
                    {
                        embed: {
                            description: "Autokick is already \`DISABLED!\`",
                            color: 0x03fc24,
                        }
                    }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

            autokick.delete(message.guild.id);
            message.reply({
                embed: {
                    description: "Autokick \`DISABLED\`",
                    color: 0x03fc24,
                }
            }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
        } else if (query === "list") {
            if (!getCollection) return message.reply(
                {
                    embed: {
                        description: "Autokick is \`DISABLED!\`",
                        color: 0x03fc24,
                    }
                }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
            message.reply({
                embed: {
                    color: 0x03fc24,
                    description: (
                        `Kicked Members: ${getCollection.map((value) => {
                            return `\`${value.tag}\``;
                        })}`
                    )
                }
            })
        }
    }
}
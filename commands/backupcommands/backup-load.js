const { prefix } = require("../../config.json")
const backup = require("discord-backup")

module.exports = {
    name: 'backup-load',
    category: "backupcommands",
    aliases: ['bload'],
    description: `loads the back up of backup of the server`,
    usage: `${prefix}backup-load`,
    example: `${prefix}backup-load`,
    cooldowns: 5,
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(
                new MessageEmbed()
                    .setTitle("❌ Error | you need \`MANAGE_GUILD\` to run this command")
                    .setColor(0x03fc24)
                    .setTimestamp()
                    .setFooter(message.author.tag, message.member.user.displayAvatarURL())
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        let backUpID = args[0];
        if (!backUpID) return message.channel.send(
            {
                embed: {
                    description: "Please give me the id! The bot must have dmed you before when you created a backup!",
                    color: 0x03fc24
                }
            }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        backup.fetch(backUpID).then(async () => {
            message.channel.send(
                {
                    embed: {
                        description: `⚠ | When the backup is loaded, all the channels, roles, etc. will be replaced! Type "${prefix}confirm" to confirm!`,
                        color: 0x03fc24
                    }
                });
            await message.channel.awaitMessages(m => (m.author.id) && (m.content === `${prefix}confirm`), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
                return message.channel.send(
                    {
                        embed: {
                            description: "⚠ | Time up you were to late to answer, cancelled, try again!",
                            color: 0x03fc24
                        }
                    }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
            });

            message.author.send(`Loading the backup`)
            message.channel.send(`Loading....`)
            backup.load(backUpID, message.guild).then(() => {
                backup.remove(backUpID)
            }).catch((err) => {
                console.log(err)
                return message.channel.send(`An error occured | Please make sure my roles is above all the roles and i have admin permissions`)
            })
        }).catch((err) => {
            console.log(err)
            return message.channel.send(":x: | No backup found for `" + backUpID + "`!")
        })
    }
}
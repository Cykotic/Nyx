const { MessageEmbed } = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    name: "backup-info",
    category: "backupcommands",
    aliases: ['binfo'],
    description: `show's the info of the backup of the server`,
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
            new MessageEmbed()
                .setTitle("❌ Error | you need \`MANAGE_GUILD\` to run this command")
                .setColor(0x03fc24)
                .setTimestamp()
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        const backupID = args.join(' ');

        if (!backupID)
            return message.channel.send(':x: Please specify a valid backup ID!');

        backup.fetch(backupID).then((backup) => {

            const date = new Date(backup.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
            const formattedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;

            const embed = new MessageEmbed()
                .setColor(0x03fc24)
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`Backup information: \`${backup.data.name}\``, [
                    `> ❯ Size: **${backup.size}Kb**`,
                    `> ❯ CreateAt: **${formattedDate}**`,
                ])
                .setTimestamp()
                .setFooter(`Backup ID: ${backup.id}`)
            return message.channel.send(embed);

        }).catch((err) => {

            if (err === 'No backup found')
                // return message.channel.send(':x: No backup found for ID ' + backupID + '!');
                return message.channel.send(
                    {
                        embed: {
                            description: `❌ no back up found for this ID \`${backupID}!\``,
                            color: 0x03fc24
                        }
                    })
            else
                return message.channel.send(':x: An error occurred: ' + (typeof err === 'string') ? err : JSON.stringify(err));

        });

    }
}
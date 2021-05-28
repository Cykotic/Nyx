const { MessageEmbed } = require("discord.js");
const client = require("../index")
const logChannels = '845131900435693578';


/**
 * 
 * @param {*} client 
 * @param { GuildMember } member
 *
 */

/* logs the server when the bot joins a new guild */
client.on('guildCreate', async (guild) => {
    client.channels.cache.get(logChannels).send(
        new MessageEmbed()
            .setTitle("NEW SERVER!")
            .setColor(0x03fc24)
            .setTimestamp()
            .setFooter(guild.name, client.user.avatarURL())
            .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
            .addField("Guild Info:", [
                `> ❯ Guild Name: **${guild.name}**`,
                `> ❯ Guild Id: **${guild.id}**`,
                `> ❯ Guild Members: **${guild.memberCount}**`,
            ])
            .addField("Owner Info:", [
                `> ❯ Guild Owner: **${guild.owner}**`,
                `> ❯ Owner Id: **${guild.owner.id}**`,
            ])
            .addField("Guilds:", [
                `> ❯ Currently in: **${client.guilds.cache.size} Guilds**`,
            ])
    )
});
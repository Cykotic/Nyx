const { MessageEmbed } = require("discord.js");
const client = require("../../index")
const logChannels = '845131900435693578';


/**
 * 
 * @param {*} client 
 * @param { GuildMember } member
 *
 */

/* logs the server when the bot leave a new guild */
module.exports = async (client, guild) => {
    client.channels.cache.get(logChannels).send(
        new MessageEmbed()
            .setTitle("REMOVED FROM THE SERVER!")
            .setColor(0x03fc24)
            .setTimestamp()
            .setFooter(guild.name, client.user.avatarURL())
            .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
            .addField("Guild Info:", [
                `> ❯ Guild Name: **${guild.name}**`,
                `> ❯ Guild Id: **${guild.id}**`,
                `> ❯ Guild Members: **${guild.memberCount}**`,
            ])
            .addField("Owner Info:", [
                `> ❯ Guild Owner: **${guild.owner}**`,
                `> ❯ Owner Id: **${guild.owner.id}**`,
            ])
            .addField("Gulids:", [
                `> ❯ Currently in: **${client.guilds.cache.size} Guilds**`,
            ])
    )

};
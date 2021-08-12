const { MessageEmbed } = require("discord.js");
const db = require("../../model/reconDB");
const { prefix } = require("../../config.json");

module.exports = {
  name: "rmv-autorole",
  description: "set the autorole, of the server",
  aliases: ["ac", "autoc"],
  usage: `${prefix}autorole`,
  example: `${prefix}autorole`,
  category: "utility",
  cooldowns: 10,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel
        .send(
          new MessageEmbed()
            .setTitle("❌ Error | you need \`MANAGE_ROLES\` to run this command")
            .setColor(0x03fc24)
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.member.user.displayAvatarURL()
            )
        )
        .then((msg) =>
          msg.delete({ timeout: 10000 }).catch((e) => console.log(e.message))
        );

    if (await db.has(`autorole-${message.guild.id}`)) {
      await db.delete(`autorole-${message.guild.id}`);
    } else
      return message.channel
        .send(
          new MessageEmbed()
            .setTitle("❌ Error | there is no data stored")
            .setColor(0x03fc24)
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.member.user.displayAvatarURL()
            )
        )
        .then((msg) =>
          msg.delete({ timeout: 10000 }).catch((e) => console.log(e.message))
        );

    message.channel
      .send({
        embed: {
          description: `Autorole is now off!`,
          color: 0x03fc24,
        },
      })
      .then((msg) =>
        msg.delete({ timeout: 10000 }).catch((e) => console.log(e.message))
      );
  },
};

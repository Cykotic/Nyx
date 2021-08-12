const { prefix } = require("../../config.json")
const { Collection, MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.members.fetch(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  /* cooldown handler */
  if (command) {
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection())
    }
    const now = Date.now(); const timestamps = client.cooldowns.get(command.name); const cooldownAmount = (command.cooldown || 1.5) * 1000; if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount; if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000; return message.channel.send(
          new MessageEmbed()
            .setColor(0x03fc24)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setTitle(`❌ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
      }
    } timestamps.set(message.author.id, now); setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if (command) command.run(client, message, args);
  }
}
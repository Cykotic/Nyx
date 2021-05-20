module.exports = {
    name: "serverlist",
    aliases: ["sl"],
    category: "Information",
    description: `show's what server the bot in`,
    run: async (client, message, args) => {

        if (message.author.id !== "253986575682109441") {
            return message.channel.send("your not allowed to use this command!")
        }
        return message.channel.send(
            {
                embed: {
                    description: `I'm in \`${client.guilds.cache.size}\` servers with \`${client.users.cache.size}\` users ⭐`,
                    color: 0x03fc24
                }
            })
    }
}
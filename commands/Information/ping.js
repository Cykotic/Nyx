const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'ping',
    category: "Information",
    description : 'Returns latency and API ping',
    cooldowns: 3,
    run : async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nMessage edit ping is ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            .setColor(0x03fc24)
            await message.channel.send(embed)
            msg.delete()

 
        }
}
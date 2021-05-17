const client = require('../../src/index')
const prefix = client.prefix;
const db = require('../model/reconDB');
const got = require('got');
const { MessageEmbed } = require('discord.js');
const { Collection } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms')

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));


    if (command) {
        if(command.cooldown) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
        } else command.run(client, message, args);
    }


    // const data = db.get(`automemes-${message.guild.id}`)
    if(await db.has('automeme-778813818612613120') === false) return;
    const data = await db.get('automeme-778813818612613120')
    const channel = client.channels.cache.get(data[0])
    const time = data[1]

    setInterval(function () {
        got('https://www.reddit.com/r/dankmemes/random/.json').then(res => {
            let content = JSON.parse(res.body)
            channel.send(
                new MessageEmbed()
                    .setTitle(content[0].data.children[0].data.title)
                    .setImage(content[0].data.children[0].data.url)
                    .setColor(0xff7700)
                    .setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`)
            )
        })
    }, time)

});
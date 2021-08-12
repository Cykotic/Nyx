const fs = require('fs')
const { color } = require('colors')
const { apiToken } = require('./config.json');
const config = require('./config.json');
const { Collection, Client } = require('discord.js');
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    shards: "auto"
});


// Make sure to install this with 'npm install dblapi.js`
const DBL = require('dblapi.js');
const dbl = new DBL(apiToken, { webhookPort: 8000, webhookAuth: 'anyPassword' });
dbl.webhook.on('ready', hook => {
    console.log(`Webhook up and running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.on('error', e => {
    console.log(`Oops! ${e}`);
})
// When the webhook receives a vote
dbl.webhook.on('vote', async vote => {
    // This will log the whole vote object to the console
    console.log(vote)
    // Get the Discord ID of the user who voted
    const userID = vote.user;
    let channelForWebhooks;
    channelForWebhooks = await client.channels.resolve('845131900435693578');
    if (channelForWebhooks) await channelForWebhooks.send(`User with ID \`${userID}\` just voted!`);
})


module.exports = client;
client.commands = new Collection(); // commands
client.aliases = new Collection(); // aliases
client.prefix = config.prefix
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Collection();

// handler dir
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.login(config.token);
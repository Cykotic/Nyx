const client = require('../../src/index');
const mongoose = require("mongoose")
const { mongo } = require('../config.json');
const { prefix } = require('../config.json')

client.on('ready', () => {
    client.user.setStatus('dnd')
    client.user.setActivity(`${prefix}help | ${client.users.cache.size} users`,  { type: 'WATCHING' })
    console.log(`${client.user.tag} is now online!`);
    mongoose.connect(`${mongo}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }).then(console.log("Mongoose has successfully connected!"))


})
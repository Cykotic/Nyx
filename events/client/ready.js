const mongoose = require("mongoose")
const { mongo } = require('../../config.json');
const { prefix } = require('../../config.json')

module.exports = async (client) => {
  client.user.setStatus('dnd')
  // client.user.setActivity(`${prefix}help | ${client.users.cache.size} users`,  { type: 'WATCHING' })
  console.log(`${client.user.tag} is now online!`);
  mongoose.connect(`${mongo}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(console.log("reconDB has successfully connected!"))
};
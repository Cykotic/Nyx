const { reconDB } = require('reconlx')
const client = require('../index')
const { mongo } = require("../config.json")
const db = new reconDB(client, {
    uri: `${mongo}`,
});

module.exports = db;
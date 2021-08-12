const db = require('../../model/reconDB')

// guild member add
module.exports = async (client, member) => {
    const check = await db.has(`autorole-${member.guild.id}`);
    if(check === true) {
        member.roles.add(await db.get(`autorole-${member.guild.id}`))
    }
}
const Balance = require('../models/balance.js');

module.exports = (client) => {
    client.getBalance = async (guildId, userId) => {
        let storedBalance = await Balance.findOne({ guildId: guildId, userId: userId });

        if (!storedBalance) {
            return false;
        }
        else return storedBalance;
    }
}
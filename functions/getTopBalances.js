const Balance = require('../models/balance.js');

module.exports = (client) => {
    client.getTopBalances = async (guildId, limit = 10) => {
        const balances = await Balance.find({ guildId: guildId })
            .sort({ balance: -1 })
            .limit(limit)
            .lean();

        return balances;
    }
}

const Balance = require('../models/balance.js');
const { Types } = require('mongoose');

module.exports = (client) => {
    client.fetchBalance = async (guildId, userId) => {
        let storedBalance = await Balance.findOne({ guildId: guildId, userId: userId });
        
        if (!storedBalance) {
            storedBalance = await new Balance({
                _id: new Types.ObjectId(),
                guildId: guildId,
                userId: userId,
            });

            await storedBalance
                .save()
                .then(async balance => {
                    console.log(`Created new balance for ${balance.userId} in ${balance.guildId}`);
                })
                .catch(console.error);
            return storedBalance;
        }
        else return storedBalance;
    }
}
const { Events } = require('discord.js');
const Balance = require('../models/balance.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;

        const randomAmount = Math.random() * (0.7 - 0.3) + 0.3;
        const storedBalance = await client.fetchBalance(message.guild.id, message.author.id);

        await Balance.findOneAndUpdate(
            { _id: storedBalance._id },
            { balance: await client.roundNumbers(storedBalance.balance + randomAmount) },
        )
    }
}
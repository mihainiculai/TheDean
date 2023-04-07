const { model, Schema } = require('mongoose');

let balanceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    userId: String,
    balance: { type: Number, default: 0 },
    lastDailyClaim: { type: Date, default: null },
});

module.exports = model('Balance', balanceSchema, 'balances');
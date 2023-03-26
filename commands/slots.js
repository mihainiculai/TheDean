const { SlashCommandBuilder } = require('@discordjs/builders');
const { Slots } = require('discord-gamecord');
const Balance = require('../models/balance.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Play a game of slots.')
        .addNumberOption(option =>
            option.setName('bet')
                .setDescription('How much you want to bet.')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction, client) {
        const bet = interaction.options.getNumber('bet');
        const storedBalance = await client.fetchBalance(interaction.guildId, interaction.user.id);

        if (bet < 1)
            return interaction.reply({ content: 'You can\'t bet less than 1 coin.', ephemeral: true });

        if (bet > storedBalance.balance)
            return interaction.reply({ content: 'You don\'t have enough coins to bet that much.', ephemeral: true });

        const Game = new Slots({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: '🎰 Slot Machine',
                color: '#f1ac50',
                timestamp: true,
            },
            slots: ['🍇', '🍊', '🍋', '🍌']
        });

        Game.startGame();
        Game.on('gameOver', async result => {
            if (result.result === 'win') {
                await Balance.findOneAndUpdate(
                    { _id: storedBalance._id },
                    { balance: await client.roundNumbers(storedBalance.balance + bet * 10) },
                )
            } else {
                await Balance.findOneAndUpdate(
                    { _id: storedBalance._id },
                    { balance: await client.roundNumbers(storedBalance.balance - bet) },
                )
            }
        });
    }
};
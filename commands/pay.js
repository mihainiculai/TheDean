const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Balance = require('../models/balance.js');
const logger = require('../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Pay a user with some money.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to pay.')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('How much you want to pay.')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction, client) {
        try {

            const userStoredBalance = await client.fetchBalance(interaction.guildId, interaction.user.id);
            let amount = interaction.options.getNumber('amount');
            const selectedUser = interaction.options.getUser('user');

            if (selectedUser.bot) return interaction.reply({ content: 'You can\'t send money a bot.', ephemeral: true });
            else if (selectedUser.id === interaction.user.id) return interaction.reply({ content: 'You can\'t send money to yourself.', ephemeral: true });
            else if (amount < 1) return interaction.reply({ content: 'You can\'t send less than 1 coin.', ephemeral: true });
            else if (amount > userStoredBalance.balance) return interaction.reply({ content: 'You don\'t have enough coins.', ephemeral: true });

            const selectedUserStoredBalance = await client.fetchBalance(interaction.guildId, selectedUser.id);

            amount = await client.roundNumbers(amount);

            await Balance.findOneAndUpdate(
                { _id: userStoredBalance._id },
                { balance: await client.roundNumbers(userStoredBalance.balance - amount) },
            )
            await Balance.findOneAndUpdate(
                { _id: selectedUserStoredBalance._id },
                { balance: await client.roundNumbers(selectedUserStoredBalance.balance + amount) },
            )

            const embed = new EmbedBuilder()
                .setTitle('Payment')
                .setDescription(`You have sent ${amount} coins to ${selectedUser.username}.`)
                .setColor('#f1ac50')
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        catch (error) {
            logger.error("🚫 Error at /pay", error);
            await interaction.reply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
};
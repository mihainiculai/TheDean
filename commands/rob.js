const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Balance = require('../models/balance.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rob')
        .setDescription('Rob someone.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to rob.')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction, client) {
        const userStoredBalance = await client.fetchBalance(interaction.guildId, interaction.user.id);
        const selectedUser = interaction.options.getUser('user');

        if (selectedUser.bot) return interaction.reply({ content: 'You can\'t rob a bot.', ephemeral: true });
        else if (selectedUser.id === interaction.user.id) return interaction.reply({ content: 'You can\'t rob yourself.', ephemeral: true });

        const selectedUserStoredBalance = await client.fetchBalance(interaction.guildId, selectedUser.id);

        if (selectedUserStoredBalance.balance <= 0) return interaction.reply({ content: `${selectedUser.username} has no money to be robbed.`, ephemeral: true });
        if (Math.random() < 0.3) {
            const chance = Math.random();
            if (chance < 0.6) amountRobbed = await client.roundNumbers(Math.random() * (selectedUserStoredBalance.balance/10));
            else if (chance < 0.9) amountRobbed = await client.roundNumbers(Math.random() * (selectedUserStoredBalance.balance/5));
            else if (chance < 0.95) amountRobbed = await client.roundNumbers(Math.random() * (selectedUserStoredBalance.balance/3));
            else if (chance < 0.99) amountRobbed = await client.roundNumbers(Math.random() * (selectedUserStoredBalance.balance/2));
            else amountRobbed = await client.roundNumbers(Math.random() * selectedUserStoredBalance.balance);
            
            await Balance.findOneAndUpdate(
                { _id: userStoredBalance._id },
                { balance: await client.roundNumbers(userStoredBalance.balance + amountRobbed) },
            );
            await Balance.findOneAndUpdate(
                { _id: selectedUserStoredBalance._id },
                { balance: await client.roundNumbers(selectedUserStoredBalance.balance - amountRobbed) },
            );

            const successEmbed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setTitle('✅ Successful Robbery!')
                .setDescription(`<@${interaction.user.id}> robbed <@${selectedUser.id}> and got away with ${amountRobbed} coins!\nMaybe crime isn\'t so bad after all?`)
                .addFields(
                    { name: '🤔 Hmm...', value: 'Be careful, karma might come back to haunt you!', inline: false },
                )
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [successEmbed] });
        } else {
            const ammountLost = await client.roundNumbers(userStoredBalance.balance * 0.1);
            await Balance.findOneAndUpdate(
                { _id: userStoredBalance._id },
                { balance: await client.roundNumbers(userStoredBalance.balance - ammountLost) },
            );
            const failEmbed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setTitle('❌ Failed Robbery')
                .setDescription(`<@${interaction.user.id}> tried to rob <@${selectedUser.id}> but got caught and lost ${ammountLost} coins!`)
                .addFields(
                    { name:'🤔 Hmm...', value: 'Maybe crime isn\'t for you?', inline: false },
                )
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();
            await interaction.reply({ embeds: [failEmbed] });
        }
    }
};
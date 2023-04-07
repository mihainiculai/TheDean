const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily reward.'),

    async execute(interaction, client) {
        try {
            const userId = interaction.user.id;
            const guildId = interaction.guildId;
            const storedBalance = await client.fetchBalance(guildId, userId);

            const now = new Date();
            const lastDailyClaim = storedBalance.lastDailyClaim;

            const dailyCooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            const timeSinceLastClaim = now - lastDailyClaim;

            if (lastDailyClaim && timeSinceLastClaim < dailyCooldown) {
                const remainingCooldown = dailyCooldown - timeSinceLastClaim;
                const timeToNextDaily = ms(remainingCooldown, { long: true });

                await interaction.reply({
                    content: `⏳ You have already claimed your daily reward! You can claim it again in ${timeToNextDaily}.`,
                    ephemeral: true
                });
            } else {
                const dailyReward = 100; // Change this value to set the daily reward amount
                storedBalance.balance += dailyReward;
                storedBalance.lastDailyClaim = now;

                await storedBalance.save();

                await interaction.reply({
                    content: `💰 You have claimed your daily reward of ${dailyReward} ${client.coinNamePlural}!`,
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error("🚫 Error at /daily");
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
};

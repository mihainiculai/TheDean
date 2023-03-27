const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balancetop')
        .setDescription('Display the top 10 users with the highest balances.')
        .setDMPermission(false),

    async execute(interaction, client) {
        try {
            const balances = await client.getTopBalances(interaction.guildId, 10);
            if (balances.length === 0) {
                await interaction.reply({
                    content: 'No one has a balance yet!',
                    ephemeral: true
                });
            } else {
                const embed = new EmbedBuilder()
                    .setTitle(`Top 10 Balances in ${interaction.guild.name}`)
                    .setColor('#f1ac50')
                    .setDescription('Here are the users with the highest balances in this server:')
                    .setTimestamp();
                let rank = 1;
                for (const balance of balances) {
                    const user = await client.users.fetch(balance.userId);
                    embed.addFields({
                        name: `${rank}. ${user.username}`,
                        value: `${balance.balance} ${client.coinNamePlural}`,
                        inline: false
                    });
                    rank++;
                }

                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error("🚫 Error at /balancetop");
            await interaction.reply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
};
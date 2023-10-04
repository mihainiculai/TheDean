const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check the balance of a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to check the balance of.'),
        )
        .setDMPermission(false),
        
    async execute(interaction, client) {
        try {
            const selectedUser = interaction.options.getUser('user') || interaction.user;
            const storedBalance = await client.getBalance(interaction.guildId, selectedUser.id);

            if (!storedBalance) {
                await interaction.reply({
                    content: `${selectedUser.username} does not have a balance yet!`,
                    ephemeral: true
                });
            }
            else {
                const embed = new EmbedBuilder()
                    .setTitle(`${selectedUser.username}'s balance`)
                    .setColor('#f1ac50')
                    .addFields({ name: '💵 Balance', value: `${storedBalance.balance} ${client.coinNamePlural}` })
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                    .setTimestamp();

                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }

        } catch (error) {
            console.error("🚫 Error at /balance", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
};
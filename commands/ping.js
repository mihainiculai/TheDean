const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns the bot ping.')
        .setDMPermission(false),

    async execute(interaction) {
        try {
            const pingEmbed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setTitle('🏓 Pong!')
                .setDescription(`Latency is ${interaction.client.ws.ping}ms.`);
            await interaction.reply({ embeds: [pingEmbed] });
        } catch (error) {
            logger.error("🚫 Error at /ping", error);
            await interaction.reply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};

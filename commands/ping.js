const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns the bot ping.')
        .setDMPermission(false),

    async execute(interaction) {
        const pingEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle('🏓 Pong!')
            .setDescription(`Latency is ${interaction.client.ws.ping}ms.`);
        await interaction.reply({ embeds: [pingEmbed] });
    },
};

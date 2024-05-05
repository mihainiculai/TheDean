const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const rules = require('../configs/rules');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Replies with the rules of the server.')
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        let message = "# 📖 Regulament";

        for (let i = 0; i < rules.length; i++) {
            message += `\n### ${rules[i].title}\n${rules[i].description}`;
        }

        await interaction.editReply({ content: 'Rules has been sent successfully!', ephemeral: true });
        await interaction.channel.send({ content: message });
    },
};
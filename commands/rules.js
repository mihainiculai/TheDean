const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const rules = require('../configs/rules');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Replies with the rules of the server.')
        .setDMPermission(false),

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });

        if (await client.isStaff(interaction.member) === false) {
            return await interaction.editReply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }

        let message = "# 📖 Regulament";

        for (let i = 0; i < rules.length; i++) {
            message += `\n### ${rules[i].title}\n${rules[i].description}`;
        }

        await interaction.editReply({ content: 'Rules has been sent successfully!', ephemeral: true });
        await interaction.channel.send({ content: message });
    },
};
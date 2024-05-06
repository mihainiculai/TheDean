const { SlashCommandBuilder } = require('discord.js');
const commands = require('../configs/commands');
const logger = require('../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with a list of all commands.')
        .setDMPermission(false),

    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });

            let message = '# 🎩 The Dean Help';
            message += '\nAcestea sunt toate comenzile disponibile tuturor membrilor serverului.';

            for (const category of commands) {
                message += `\n## ${category.category}`;
                for (const command of category.commands) {
                    message += `\n- **/${command.name}**: ${command.description}`;
                }
            }

            await interaction.editReply({ content: message, ephemeral: true });
        } catch (error) {
            logger.error("🚫 Error at /help", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};
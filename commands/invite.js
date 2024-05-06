const { SlashCommandBuilder } = require('discord.js');
const { message1, message2, message3 } = require('../configs/invite');
const logger = require('../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Replies with information about inviting others to the server.')
        .setDMPermission(false),

    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
    
            await interaction.editReply({ content: 'Informations has been sent successfully!', ephemeral: true });

            await interaction.channel.send({ content: message1 });
            await interaction.channel.send({ content: message2 });
            await interaction.channel.send({ content: message3 });
        } catch (error) {
            logger.error("🚫 Error at /invite", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};
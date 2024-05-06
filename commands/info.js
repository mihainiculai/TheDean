const { SlashCommandBuilder } = require('discord.js');
const { info, channelsInfo } = require('../configs/info');
const logger = require('../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with information about the server.')
        .setDMPermission(false),

    async execute(interaction, client) {
        try {
            await interaction.deferReply({ ephemeral: true });
    
            if (await client.isStaff(interaction.member) === false) {
                return await interaction.editReply({ content: 'You do not have permission to use this command!', ephemeral: true });
            }
            
            let message = '';
        
            message += `# ${info.title}`;
            for (const content of info.content) {
                message += `\n\n${content}`;
            }

            message += `\n# ${channelsInfo.title}`;
            for (const channel of channelsInfo.channels) {
                message += `\n### ${channel.title}\n${channel.description}`;
            }
    
            await interaction.editReply({ content: 'Informations has been sent successfully!', ephemeral: true });
    
            await interaction.channel.send({ content: message });
        } catch (error) {
            logger.error("🚫 Error at /info", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};
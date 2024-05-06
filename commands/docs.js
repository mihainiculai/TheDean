const { SlashCommandBuilder } = require('discord.js');
const commands = require('../configs/commands');
const logger = require('../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('docs')
        .setDescription('Replies with docs about The Dean')
        .setDMPermission(false),

    async execute(interaction, client) {
        try {
            await interaction.deferReply({ ephemeral: true });
    
            if (await client.isStaff(interaction.member) === false) {
                return await interaction.editReply({ content: 'You do not have permission to use this command!', ephemeral: true });
            }
            
            let message = '# 🎩 The Dean Docs';
            message += `\n**Bot-ul The Dean** este un bot de Discord creat special pentru **CSIE++**. Acesta are ca scop atât de **a ajuta studenții** prin informațiile pe care le oferă cât și de a oferi o **experiență mai plăcută** pe server prin **funcționalitățile sale**.`;
            
            for (const category of commands) {
                message += `\n## ${category.category}`;
                for (const command of category.commands) {
                    message += `\n- **/${command.name}**: ${command.description}`;
                }
            }

            message += `\n\nℹ️ Pentru mai multe informații și codul sursă, poți accesa [pagina de GitHub](https://github.com/mihainiculai/TheDean) a bot-ului.`;
            message += `\n\n🧑‍🏭 **Poți să contribui și tu** la dezvoltarea bot-ului. Te rugăm să contactezi un membru al staff-ului pentru mai multe informații.`;
    
            await interaction.editReply({ content: 'Informations has been sent successfully!', ephemeral: true });
    
            await interaction.channel.send({ content: message });
        } catch (error) {
            logger.error("🚫 Error at /docs", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};
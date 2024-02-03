const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription('Displays the credits for this bot.')
        .setDMPermission(false),

    async execute(interaction) {
        try {
            const creditsEmbed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setTitle('Credits')
                .setDescription('This is the official bot for CSIE++.\nThe bot was created by <@293814256808230915>.')
                .addFields(
                    { name: "GitHub", value: "https://github.com/mihainiculai/TheDean", inline: true }
                )
                .setFooter({ text: `Copyright © ${new Date().getFullYear()} ${interaction.guild.name} | All rights reserved.`, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [creditsEmbed] });
        } catch (error) {
            logger.error("🚫 Error at /credits", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};

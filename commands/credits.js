const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription('Displays the credits for this bot.')
        .setDMPermission(false),
        
    async execute(interaction) {
        const creditsEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle('Credits')
            .setDescription('This is the official bot for CSIE++.\nThe bot was created by <@293814256808230915>.')
            .addFields(
                { name: "GitHub", value: "https://github.com/ImBroOmY/TheDean", inline: true }
            )
            .setFooter({ text: "Copyright © 2023 " +  interaction.guild.name + " | All rights reserved.", iconURL: interaction.guild.iconURL() })
            .setTimestamp();
        await interaction.reply({ embeds: [creditsEmbed] });
    },
};

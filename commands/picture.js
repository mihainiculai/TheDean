const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { unsplashAPIKey } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('picture')
        .setDescription('Sends a random picture.')
        .addStringOption(option =>
            option.setName('subject')
                .setDescription('What are you looking for?')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction) {
        try {
            const subject = interaction.options.getString('subject');

            if (!unsplashAPIKey)
                throw new Error('🚫 Missing Unsplash API key. Please set it up in the config file.');

            const response = await axios.get('https://api.unsplash.com/photos/random?query=' + subject + '&client_id=' + unsplashAPIKey + '&orientation=landscape');
            if (response.status !== 200)
                throw new Error('🚫 Unsplash API returned a non-200 status code.');

            const picture = response.data.urls?.full;
            if (!picture)
                throw new Error('🚫 Unable to get the image URL.');

            const catEmbed = new EmbedBuilder()
                .setTitle("📸 Here's a picture of " + subject + "!")
                .setColor('#f1ac50')
                .setImage(picture)
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();
            await interaction.reply({ embeds: [catEmbed] });
        }
        catch (error) {
            console.error("🚫 Error at /picture");
            await interaction.reply(
                { content: '🚫 Oops! No picture found. Please try again later.', ephemeral: true }
            );
        }
    },
};
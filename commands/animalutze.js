const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { unsplashAPIKey } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animalutze')
        .setDescription('Sends a random cute pet picture.')
        .setDMPermission(false),

    async execute(interaction) {
        if (!unsplashAPIKey)
            throw new Error('🚫 Missing Unsplash API key. Please set it up in the config file.');

        try {
            const response = await axios.get('https://api.unsplash.com/photos/random?query=pets&client_id=' + unsplashAPIKey + '&orientation=landscape');
            if (response.status !== 200)
                throw new Error('🚫 Unsplash API returned a non-200 status code.');

            const picture = response.data.urls?.full;
            if (!picture)
                throw new Error('🚫 Unable to get the image URL.');

            const catEmbed = new EmbedBuilder()
                .setTitle('🐱 un animalutz dragutz')
                .setColor('#f1ac50')
                .setImage(picture)
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();
            await interaction.reply({ embeds: [catEmbed] });
        } catch (error) {
            console.error("🚫 Error at /animalutze");
            await interaction.reply(
                { content: '🚫 Oops! Something went wrong. Please try again later.', ephemeral: true }
            );
        }
    },
};
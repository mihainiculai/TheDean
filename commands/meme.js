const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Sends a random meme.')
        .setDMPermission(false),

    async execute(interaction) {
        try {
            const response = await axios.get("https://reddit.com/r/memes/random/.json");
            if (response.status !== 200)
                throw new Error('🚫 Reddit API returned a non-200 status code.');

            const meme = response.data[0]?.data?.children[0]?.data;
            if (!meme)
                throw new Error('🚫 Unable to get the meme data.');

            const embed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setTitle(meme.title)
                .setImage(meme.url)
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();
            await interaction.reply({ embeds: [embed] });
        }
        catch (error) {
            console.error("🚫 Error at /meme");
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};
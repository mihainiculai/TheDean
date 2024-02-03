const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OpenAI } = require('openai');
const { openAIApiKey } = require('../config.json');
const logger = require('../logger');

if (!openAIApiKey) {
    console.error('🚫 Missing OpenAI API key. Please set it up in the config file.');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: openAIApiKey,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask a question to The Dean.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('What are you wondering?')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            const question = interaction.options.getString('question');
            const conversation = [
                { role: 'system', content: 'You are a friendly Discord bot named The Dean. Your are the bot of "CSIE++" discord server, the official server of CSIE (Faculty of Cybernetics, Statistics and Informatics from Bucharest). You must separate the message into paragraphs. A paragraph must have a maximum of 800 characters and separate them with \n\n.' },
                { role: 'user', content: question },
            ];

            const result = await openai.chat.completions.create({
                model: 'gpt-4-0125-preview',
                messages: conversation,
                max_tokens: 512,
            });

            const responseContent = result.choices[0].message.content;
            const paragraphs = responseContent.split('\n\n');

            const responseEmbed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                .addFields({ name: 'Question', value: question, inline: false })

            paragraphs.forEach((paragraph, index) => {
                responseEmbed.addFields({ name: `${index === 0 ? "Answer" : "\u200B"}`, value: paragraph, inline: false });
            });

            responseEmbed
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await interaction.editReply({ embeds: [responseEmbed] });

        } catch (error) {
            logger.error("🚫 Error at /ask", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
}
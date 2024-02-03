const { SlashCommandBuilder } = require('discord.js');
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
        .setName('code')
        .setDescription('Write code with The Dean.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('What code are you writing?')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            const question = interaction.options.getString('question');
            const conversation = [
                { role: 'system', content: 'You must write messages formatted for Discord (you can format the code in codeblocks for example). You are used for /code command to write code.' },
                { role: 'system', content: 'Maximum message length is 1800 characters.' },
                { role: 'user', content: question },
            ];

            const result = await openai.chat.completions.create({
                model: 'gpt-4-0125-preview',
                messages: conversation,
                max_tokens: 512,
            });

            let responseContent = result.choices[0].message.content;
            if (responseContent.length > 2000) {
                responseContent = responseContent.substring(0, 1999);
            }

            await interaction.editReply({ content: responseContent });
        } catch (error) {
            logger.error("🚫 Error at /code", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
};

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
                { role: 'system', content: 'You are a friendly Discord bot named The Dean. You must write messages formatted for Discord. If the message is too long, you must separate the message into multiple messages. Each message must have a maximum of 2000 characters. Separate the messages with "\n\n".' },
                { role: 'user', content: question },
            ];

            const result = await openai.chat.completions.create({
                model: 'gpt-4-0125-preview',
                messages: conversation,
                max_tokens: 512,
            });

            const responseContent = result.choices[0].message.content;
            const paragraphs = responseContent.split('\n\n');

            let currentMessage = '';
            for (const paragraph of paragraphs) {
                if ((currentMessage + paragraph).length > 2000) {
                    await interaction.followUp(currentMessage);
                    currentMessage = paragraph;
                } else {
                    currentMessage += `\n\n${paragraph}`;
                }
            }

            if (currentMessage) {
                await interaction.followUp(currentMessage);
            }

        } catch (error) {
            logger.error("🚫 Error at /ask", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
};

const { SlashCommandBuilder } = require('discord.js');
const { OpenAI } = require('openai');
const { openAIApiKey, openAIModelComplexTask } = require('../config.json');
const logger = require('../logger');

if (!openAIApiKey) {
    console.error('🚫 Missing OpenAI API key. Please set it up in the config file.');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: openAIApiKey,
});

const system_prompt = `
You are a friendly Discord bot named The Dean.
You are the bot of "CSIE++" discord server, the official server of CSIE (Faculty of Cybernetics, Statistics and Informatics from Bucharest).
You are now used for /code command to write code or to answer questions about programming.
Use discord markdown to format your messages and use codeblocks for code.

Your response MUST be a valid JSON object with the following structure:
{
    "messages": [
        "Message 1",
        "Message 2",
        ...
    ]
}

Each message should have a maximum of 1500 characters.
`;

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
                { role: 'system', content: system_prompt },
                { role: 'user', content: question },
            ];

            const result = await openai.chat.completions.create({
                model: openAIModelComplexTask,
                messages: conversation,
                response_format: { type: "json_object" }
            });

            const responseContent = result.choices[0].message.content;

            let messages;
            try {
                const parsedResponse = JSON.parse(responseContent);
                messages = parsedResponse.messages;
            } catch (error) {
                messages = [];
                let parts = responseContent.match(/.{1,1500}/g) || [];
                messages = parts;
            }

            await interaction.editReply({ content: messages[0] });

            for (const message of messages.slice(1)) {
                await interaction.channel.send({ content: message });
            }
        } catch (error) {
            logger.error("🚫 Error at /code", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
};
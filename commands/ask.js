const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OpenAI } = require('openai');
const { openAIApiKey, openAIModelSimpleTask } = require('../config.json');
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
Your response MUST be a valid JSON object with the following structure:
{
    "paragraphs": [
        {
            "title": "Title for paragraph 1",
            "content": "Content of paragraph 1"
        },
        {
            "title": "Title for paragraph 2",
            "content": "Content of paragraph 2"
        },
        ...
    ]
}
Each paragraph's content should have a maximum of 800 characters.
Provide concise and relevant titles for subsequent paragraphs.
Avoid creating more paragraphs than necessary.
`;

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
                { role: 'system', content: system_prompt },
                { role: 'user', content: question },
            ];

            const result = await openai.chat.completions.create({
                model: openAIModelSimpleTask,
                messages: conversation,
                response_format: { type: "json_object" }
            });

            const responseContent = result.choices[0].message.content;
            
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(responseContent);
            } catch (error) {
                throw new Error("Invalid JSON response from OpenAI");
            }

            const paragraphs = parsedResponse.paragraphs || [{title: "Answer", content: responseContent}];

            const responseEmbed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                .addFields({ name: 'Question', value: question, inline: false });

            paragraphs.forEach((paragraph, index) => {
                responseEmbed.addFields({ name: paragraph.title, value: paragraph.content, inline: false });
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
};
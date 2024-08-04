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
Create a detailed summary of the provided conversation.
Your response MUST be a valid JSON object with the following structure:
{
    "summary": [
        {
            "title": "[EMOJI] Title 1",
            "paragraph": "Paragraph 1"
        },
        {
            "title": "[EMOJI] Title 2",
            "paragraph": "Paragraph 2"
        },
        ...
    ],
    "key_points": [
        "Key point 1",
        "Key point 2",
        ...
    ]
}
Each paragraph in the summary should have a maximum of 800 characters.
Replace [EMOJI] with an emoji that represents the paragraph.
Provide 3-5 key points from the conversation.
`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summarize')
        .setDescription('Summarize the last messages in this channel.')
        .addIntegerOption(option =>
            option.setName('timespan')
                .setDescription('How many hours back to look for messages.')
                .setRequired(true)
                .addChoices(
                    { name: '30 minutes', value: 30 },
                    { name: '1 hour', value: 60 },
                    { name: '3 hours', value: 180 },
                    { name: '6 hours', value: 360 },
                    { name: '12 hours', value: 720 },
                    { name: '24 hours', value: 1440 },
                )),

    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });

            const minutes = interaction.options.getInteger('timespan');
            const hours = minutes / 60;
            const channelMessages = await interaction.channel.messages.fetch({ limit: 100 });
            const messages = channelMessages.filter(message => message.createdAt > Date.now() - (minutes * 60 * 1000));

            const conversation = messages.map(message => ({ role: 'user', content: `[${message.createdAt.toLocaleString('ro-RO', { dateStyle: 'short', timeStyle: 'short' })}] ${message.author.username}: ${message.content}` }));
            conversation.push({ role: 'system', content: system_prompt });

            let conversation_length = JSON.stringify(conversation).length;
            while (conversation_length > 10000) {
                conversation.shift();
                conversation_length = JSON.stringify(conversation).length;
            }

            const result = await openai.chat.completions.create({
                model: openAIModelSimpleTask,
                messages: conversation.reverse(),
                response_format: { type: "json_object" }
            });

            const responseContent = result.choices[0].message.content;

            let parsedResponse;
            try {
                parsedResponse = JSON.parse(responseContent);
            } catch (error) {
                logger.error("🚫 Error parsing JSON response", error);
                throw new Error("Invalid JSON response from OpenAI");
            }

            const summary = parsedResponse.summary || [];
            const keyPoints = parsedResponse.key_points || [];

            const responseEmbed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setTitle(`Summary of the last ${hours === 0 ? `${minutes} minutes` : `${hours} hours`}`)

            summary.forEach((item, index) => {
                responseEmbed.addFields({ name: `${item.title || `Paragraph ${index + 1}`}`, value: item.paragraph, inline: false });
            });

            if (keyPoints.length > 0) {
                responseEmbed.addFields({ name: "🔑 Key Points", value: keyPoints.map(point => `• ${point}`).join('\n'), inline: false });
            }

            responseEmbed
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await interaction.editReply({ embeds: [responseEmbed] });
        } catch (error) {
            logger.error("🚫 Error at /summarize", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
}
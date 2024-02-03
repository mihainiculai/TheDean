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
        .setName('summarize')
        .setDescription('Summarize the last messages in this channel.')
        .addIntegerOption(option =>
            option.setName('hours')
                .setDescription('How many hours back to look for messages.')
                .setRequired(true)
                .addChoices(
                    { name: '30 minutes', value: 0.5 },
                    { name: '1 hour', value: 1 },
                    { name: '3 hours', value: 3 },
                    { name: '6 hours', value: 6 },
                    { name: '12 hours', value: 12 },
                    { name: '24 hours', value: 24 },
                )),

    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });

            const hours = interaction.options.getInteger('hours');
            const channelMessages = await interaction.channel.messages.fetch({ limit: 100 });
            const messages = channelMessages.filter(message => message.createdAt > Date.now() - (hours * 60 * 60 * 1000));

            const conversation = messages.map(message => ({ role: 'user', content: `[${message.createdAt.toLocaleString('ro-RO', { dateStyle: 'short', timeStyle: 'short' })}] ${message.author.username}: ${message.content}` }));
            conversation.push({ role: 'system', content: 'Fa un rezumat detaliat la aceasta conversatie:' });

            let tokens = JSON.stringify(conversation).length;
            while (tokens > 4097) {
                conversation.shift();
                tokens = JSON.stringify(conversation).length;
            }

            const result = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-1106',
                messages: conversation.reverse(),
                max_tokens: 512,
            });

            const responseEmbed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setTitle(`Summary of the last ${hours} hours`)
                .addFields({ name: '\u200B', value: result.choices[0].message.content, inline: false })
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await interaction.editReply({ embeds: [responseEmbed] });

        } catch (error) {
            logger.error("🚫 Error at /summarize", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
}

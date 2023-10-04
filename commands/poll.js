const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const createOption = (name, description, required = false) => {
    return option => option.setName(name)
        .setDescription(description)
        .setRequired(required);
}

const addReactions = async (message, numOptions) => {
    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    for (let i = 0; i < numOptions; i++) {
        await message.react(emojis[i]);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a poll.')
        .addStringOption(createOption('question', 'The question of the poll.', true))
        .addStringOption(createOption('option-1', 'The first option.', true))
        .addStringOption(createOption('option-2', 'The second option.', true))
        .addStringOption(createOption('option-3', 'The third option.'))
        .addStringOption(createOption('option-4', 'The fourth option.'))
        .addStringOption(createOption('option-5', 'The fifth option.'))
        .addStringOption(createOption('option-6', 'The sixth option.'))
        .addStringOption(createOption('option-7', 'The seventh option.'))
        .addStringOption(createOption('option-8', 'The eighth option.'))
        .addStringOption(createOption('option-9', 'The ninth option.'))
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply();

        const question = interaction.options.getString('question');
        const options = Array(10).fill(null).map((_, i) => interaction.options.getString(`option-${i+1}`));

        const answers = options.map((option, i) => option ? `${i+1}️⃣ ${option}` : null).filter(Boolean).join('\n');

        const pollEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle(`📊 Poll: ${question}`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .addFields({ name: `Answers:`, value: answers })
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setTimestamp();

        try {
            const pollMessage = await interaction.editReply({ embeds: [pollEmbed] });
            await addReactions(pollMessage, options.filter(Boolean).length);
        } catch (error) {
            console.error("🚫 Error at /poll", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
};

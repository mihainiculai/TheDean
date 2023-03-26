const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a poll.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question of the poll.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option-1')
                .setDescription('The first option.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option-2')
                .setDescription('The second option.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option-3')
                .setDescription('The third option.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option-4')
                .setDescription('The fourth option.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option-5')
                .setDescription('The fifth option.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option-6')
                .setDescription('The sixth option.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option-7')
                .setDescription('The seventh option.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option-8')
                .setDescription('The eighth option.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option-9')
                .setDescription('The ninth option.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option-10')
                .setDescription('The tenth option.')
                .setRequired(false))
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply();

        const question = interaction.options.getString('question');
        const option1 = interaction.options.getString('option-1');
        const option2 = interaction.options.getString('option-2');
        const option3 = interaction.options.getString('option-3');
        const option4 = interaction.options.getString('option-4');
        const option5 = interaction.options.getString('option-5');
        const option6 = interaction.options.getString('option-6');
        const option7 = interaction.options.getString('option-7');
        const option8 = interaction.options.getString('option-8');
        const option9 = interaction.options.getString('option-9');
        const option10 = interaction.options.getString('option-10');

        let answers = `1️⃣ ${option1}\n2️⃣ ${option2}`;
        if (option3) answers += `\n3️⃣ ${option3}`;
        if (option4) answers += `\n4️⃣ ${option4}`;
        if (option5) answers += `\n5️⃣ ${option5}`;
        if (option6) answers += `\n6️⃣ ${option6}`;
        if (option7) answers += `\n7️⃣ ${option7}`;
        if (option8) answers += `\n8️⃣ ${option8}`;
        if (option9) answers += `\n9️⃣ ${option9}`;
        if (option10) answers += `\n🔟 ${option10}`;

        const pollEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle(`📊 Poll: ${question}`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .addFields({ name: `Ansers:`, value: answers })
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setTimestamp();

        try {
            const pollMessage = await interaction.editReply({ embeds: [pollEmbed] });
            await pollMessage.react('1️⃣');
            await pollMessage.react('2️⃣');
            if (option3) await pollMessage.react('3️⃣');
            if (option4) await pollMessage.react('4️⃣');
            if (option5) await pollMessage.react('5️⃣');
            if (option6) await pollMessage.react('6️⃣');
            if (option7) await pollMessage.react('7️⃣');
            if (option8) await pollMessage.react('8️⃣');
            if (option9) await pollMessage.react('9️⃣');
            if (option10) await pollMessage.react('🔟');
        
        } catch (error) {
            console.error("🚫 Error at /poll" + error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    }
}

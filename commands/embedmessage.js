const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedmessage')
        .setDescription('Send an embed message.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title of the embed.')
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The description of the embed.')
        )
        .addStringOption(option =>
            option.setName('field1-name')
                .setDescription('The name of the first field.')
        )
        .addStringOption(option =>
            option.setName('field1-value')
                .setDescription('The value of the first field.')
        )
        .addStringOption(option =>
            option.setName('field2-name')
                .setDescription('The name of the second field.')
        )
        .addStringOption(option =>
            option.setName('field2-value')
                .setDescription('The value of the second field.')
        )
        .addStringOption(option =>
            option.setName('field3-name')
                .setDescription('The name of the third field.')
        )
        .addStringOption(option =>
            option.setName('field3-value')
                .setDescription('The value of the third field.')
        )
        .addStringOption(option =>
            option.setName('field4-name')
                .setDescription('The name of the fourth field.')
        )
        .addStringOption(option =>
            option.setName('field4-value')
                .setDescription('The value of the fourth field.')
        )
        .addStringOption(option =>
            option.setName('field5-name')
                .setDescription('The name of the fifth field.')
        )
        .addStringOption(option =>
            option.setName('field5-value')
                .setDescription('The value of the fifth field.')
        )
        .setDMPermission(false),

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });

        if (await client.isStaff(interaction.member) === false) {
            return await interaction.editReply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }

        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const field1Name = interaction.options.getString('field1-name');
        const field1Value = interaction.options.getString('field1-value');
        const field2Name = interaction.options.getString('field2-name');
        const field2Value = interaction.options.getString('field2-value');
        const field3Name = interaction.options.getString('field3-name');
        const field3Value = interaction.options.getString('field3-value');
        const field4Name = interaction.options.getString('field4-name');
        const field4Value = interaction.options.getString('field4-value');
        const field5Name = interaction.options.getString('field5-name');
        const field5Value = interaction.options.getString('field5-value');

        const embed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setTimestamp();

        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (field1Name && field1Value) embed.addFields({ name: field1Name, value: field1Value });
        if (field2Name && field2Value) embed.addFields({ name: field2Name, value: field2Value });
        if (field3Name && field3Value) embed.addFields({ name: field3Name, value: field3Value });
        if (field4Name && field4Value) embed.addFields({ name: field4Name, value: field4Value });
        if (field5Name && field5Value) embed.addFields({ name: field5Name, value: field5Value });

        await interaction.editReply({ content: 'Embed message sent!', ephemeral: true });
        await interaction.channel.send({ embeds: [embed] });
    }
}
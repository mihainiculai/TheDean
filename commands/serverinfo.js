const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server.')
        .setDMPermission(false),

    async execute(interaction) {
        const serverInfoEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle('📈 Serverinfo')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription(`Here is some information about ${interaction.guild.name}.`)
            .addFields(
                { name: "📛 Name", value: `${interaction.guild.name}`, inline: true },
                { name: "🪪 ID", value: `${interaction.guild.id}`, inline: true },
                { name: "📅 Created at", value: `${interaction.guild.createdAt}`, inline: false },
                { name: "👑 Owner", value: `<@${interaction.guild.ownerId}>`, inline: true },
                { name: "👥 Members", value: `${interaction.guild.memberCount}`, inline: true },
                { name: "🌍 Region", value: `${interaction.guild.region}`, inline: true },
                { name: "📜 Roles", value: `${interaction.guild.roles.cache.size}`, inline: true },
                { name: "📁 Channels", value: `${interaction.guild.channels.cache.size}`, inline: true },
                { name: "😋 Emojis", value: `${interaction.guild.emojis.cache.size}`, inline: true },
                { name: "💎 Boosts", value: `${interaction.guild.premiumSubscriptionCount}`, inline: true },
                { name: "🔒 Verification Level", value: `${interaction.guild.verificationLevel}`, inline: true },
                { name: "🔞 Explicit Content Filter", value: `${interaction.guild.explicitContentFilter}`, inline: true },
            )
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setTimestamp();
        await interaction.reply({ embeds: [serverInfoEmbed] });
    },
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Get information about a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get information about.')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            const user = interaction.options.getUser('user');
            const embed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setTitle(user.username)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '🪪 ID', value: user.id, inline: true },
                    { name: '🏷️ Tag', value: user.tag, inline: true },
                    { name: '🤖 Bot', value: user.bot ? 'Yes' : 'No', inline: true },
                    { name: '📅 Created At', value: user.createdAt.toUTCString(), inline: true },
                    { name: '📅 Joined At', value: interaction.guild.members.cache.get(user.id).joinedAt.toUTCString(), inline: true },
                    { name: '🎫 Roles', value: interaction.guild.members.cache.get(user.id).roles.cache.map(role => role.toString()).join(' '), inline: true },
                )
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();
            await interaction.editReply({ embeds: [embed] });
        }
        catch (error) {
            console.error("🚫 Error at /userinfo", error);
            await interaction.editReply('🚫 An error occurred. Please try again later.');
        }
    },
};
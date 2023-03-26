const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restanta')
        .setDescription('Get information about a restanta.')
        .setDMPermission(false),

    async execute(interaction) {
        const restantaEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle('Restanța e restanță, se plătește!')
            .setFields(
                { name: "💰 Taxa de restanță", value: "75 RON / restanță", inline: false },
                { name: "📅 Termenul de plată", value: "cu cateva zile înainte de examen", inline: false },
                { name: "📝 Observații", value: "Nu se plătește dacă ai absentat în anul curent de studiu.\nOrice altă reevaluare se plătește.", inline: false },
                { name: "Pentru mai multe detalii, fii cu 👀 pe:", value: "https://csie.ase.ro/", inline: false },
            )
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setTimestamp();
        await interaction.reply({ embeds: [restantaEmbed] });
    },
};
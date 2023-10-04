const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('infos')
        .setDescription('Replies with the infos of the server.')
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const aboutChannelsEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle('📚 Canalele serverului')
            .addFields(
                {
                    name: "🔴 Anunturi",
                    value: "Oferă anunțuri OFICIALE despre facultate și despre ce se întamplă pe server !",
                    inline: true
                },
                {
                    name: "📗 CSIE An 1 / 2 / 3",
                    value: "Dacă doriți să comunicați exclusiv în scop academic, avem acest canal.",
                    inline: true
                },
                {
                    name: "🖥 Cariera IT",
                    value: "Este destinat pentru întrebări și discuții despre cariera în IT",
                    inline: true
                },
                {
                    name: "👥 Intros",
                    value: "Este un loc bun pentru a te introduce și a face cunoștință cu ceilalți studenți.",
                    inline: true
                },
                {
                    name: "🛒 Bazar",
                    value: "Este un loc bun pentru a face anunțuri de cumpărare/vânzare, un fel de OLX! 😄",
                    inline: true
                },
                {
                    name: "💻 Playground",
                    value: "Este destinat lucrului în echipă la proiecte de facultate/personale",
                    inline: true
                },
                {
                    name: "🆚 Competitiv",
                    value: "Este destinat pentru jocuri amicale și competiții la diferite jocuri",
                    inline: true
                },
                {
                    name: "🎰 Casino",
                    value: "Este destinat pentru jocuri de noroc: /slots /tictactoe /rockpaperscissors",
                    inline: true
                },
                {
                    name: "🐸 Memes",
                    value: "Este destinat pentru postarea de meme-uri",
                    inline: true
                },
            );

        const rolesEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle('👑 Roluri')
            .setDescription('Nu uitați să vă selectați rolurile dorite folosind canalul dedicat!');

        const inviteEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle('📢 Invitații prieteni')
            .setDescription('Invitați prietenii să se alăture serverului nostru!\nCine face asta e cel mai tare! 😎')
            .addFields(
                {
                    name: "🔗 Link de invitație permanent",
                    value: 'https://discord.gg/8VDSddF',
                    inline: false
                }
            );

        await interaction.editReply({ content: 'Infos has been sent successfully!', ephemeral: true });

        await interaction.channel.send({ embeds: [rulesEmbed] });
        await interaction.channel.send({ embeds: [aboutChannelsEmbed] });
        await interaction.channel.send({ embeds: [rolesEmbed] });
        await interaction.channel.send({ embeds: [inviteEmbed] });
    },
};
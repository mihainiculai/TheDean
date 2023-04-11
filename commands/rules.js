const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Replies with the rules of the server.')
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const rulesEmbed = new EmbedBuilder()
            .setColor('#f1ac50')
            .setTitle('📖 Regulament')
            .addFields(
                {
                    name: "📚 Respectați regulile de bază ale Discordului",
                    value: "Nu promovați violența, ura, discriminarea, conținutul ilegal sau necorespunzător excesiv.",
                    inline: false
                },
                {
                    name: "🤝 Fii politicos și respectuos",
                    value: "Comunică civilizat și respectuos, evitând limbajul ofensator, atacurile personale sau provocările excesive.",
                    inline: false
                },
                {
                    name: "🚫 Nu spamați",
                    value: "Evitați mesaje repetitive, publicitate excesivă, majuscule exagerate sau link-uri sau imagini irelevante în exces.",
                    inline: false
                },
                {
                    name: "🔒 Respectați confidențialitatea",
                    value: "Nu divulgați informații personale despre alți membri fără consimțământul lor explicit, cum ar fi nume reale, adrese, numere de telefon sau informații financiare.",
                    inline: false
                },
                {
                    name: "🚷 Nu faceți discriminări sau hărțuire",
                    value: "Nu tolerați discriminarea, hărțuirea, intimidarea sau comportament inacceptabil bazat pe rasă, sex, religie, orientare sexuală, vârstă, dizabilități sau alte caracteristici personale.",
                    inline: false
                },
                {
                    name: "📌 Respectați canalele și temele serverului",
                    value: "Postați în canalele potrivite și respectați temele specifice ale acestora. Evitați off-topicurile sau postarea repetitivă a aceluiași conținut în canale diferite.",
                    inline: false
                },
                {
                    name: "😠 Nu faceți trolling, flame sau provocări",
                    value: "Încurajați o comunicare pozitivă și constructivă în comunitate, evitând comportamentul negativ.",
                    inline: false
                },
                {
                    name: "🌙 Fără @everyone la ore târzii",
                    value: "Nu scrieți mesaje cu @everyone la ore târzii (de preferat sub ora 22:00).",
                    inline: false
                },
                {
                    name: "🚫 Reclame interzise",
                    value: "Reclamele la alte servere de discord/grupuri NU SUNT PERMISE.\nACESTA ESTE GRUPUL DE DISCORD OFICIAL ***CSIE++***.",
                    inline: false
                },
                {
                    name: "📩 Sugestii și recomandări",
                    value: "Dacă doriți să faceți o sugestie sau o recomandare, puteți contacta cu încredere un @Moderator sau un @Admin.",
                    inline: false
                }
            );

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
        
        await interaction.editReply({ content: 'Rules has been sent successfully!', ephemeral: true });

        await interaction.channel.send({ embeds: [rulesEmbed] });
        await interaction.channel.send({ embeds: [aboutChannelsEmbed] });
        await interaction.channel.send({ embeds: [rolesEmbed] });
        await interaction.channel.send({ embeds: [inviteEmbed] });
    },
};
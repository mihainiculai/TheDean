const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Replies with the rules of the server.')
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        let rules = [
            "📖 Regulament",
            "📚 Respectați regulile de bază ale Discordului",
            "Nu promovați violența, ura, discriminarea, conținutul ilegal sau necorespunzător excesiv.",
            "",
            "🤝 Fii politicos și respectuos",
            "Comunică civilizat și respectuos, evitând limbajul ofensator, atacurile personale sau provocările excesive.",
            "",
            "🚫 Nu spamați",
            "Evitați mesaje repetitive, publicitate excesivă, majuscule exagerate sau link-uri sau imagini irelevante în exces.",
            "",
            "🔒 Respectați confidențialitatea",
            "Nu divulgați informații personale despre alți membri fără consimțământul lor explicit, cum ar fi nume reale, adrese, numere de telefon sau informații financiare.",
            "",
            "🚷 Nu faceți discriminări sau hărțuire",
            "Nu tolerați discriminarea, hărțuirea, intimidarea sau comportament inacceptabil bazat pe rasă, sex, religie, orientare sexuală, vârstă, dizabilități sau alte caracteristici personale.",
            "",
            "📌 Respectați canalele și temele serverului",
            "Postați în canalele potrivite și respectați temele specifice ale acestora. Evitați off-topicurile sau postarea repetitivă a aceluiași conținut în canale diferite.",
            "",
            "😠 Nu faceți trolling, flame sau provocări",
            "Încurajați o comunicare pozitivă și constructivă în comunitate, evitând comportamentul negativ.",
            "",
            "🌙 Fără @everyone la ore târzii",
            "Nu scrieți mesaje cu @everyone la ore târzii (de preferat sub ora 22:00).",
            "",
            "🚫 Reclame interzise",
            "Reclamele la alte servere de discord/grupuri NU SUNT PERMISE.",
            "ACESTA ESTE GRUPUL DE DISCORD OFICIAL ***CSIE++***.",
            "",
            "📩 Sugestii și recomandări",
            "Dacă doriți să faceți o sugestie sau o recomandare, puteți contacta cu încredere un @Moderator sau un @Admin."
        ];

        let message = rules.join('\n');

        await interaction.editReply({ content: 'Rules has been sent successfully!', ephemeral: true });

        await interaction.channel.send({ content: message });
    },
};
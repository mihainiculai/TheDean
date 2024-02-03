const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with information about the server.')
        .setDMPermission(false),

    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });

            let sections = [
                {
                    title: "📚 Canalele serverului",
                    content: [
                        "🔴 Anunturi",
                        "Oferă anunțuri OFICIALE despre facultate și despre ce se întâmplă pe server",
                        "",
                        "📗 CSIE An 1 / 2 / 3",
                        "Dacă doriți să comunicați exclusiv în scop academic, avem acest canal",
                        "",
                        "🖥 Cariera IT",
                        "Este destinat pentru întrebări și discuții despre cariera în IT",
                        "",
                        "👥 Intros",
                        "Este un loc bun pentru a te introduce și a face cunoștință cu ceilalți studenți",
                        "",
                        "🛒 Bazar",
                        "Este un loc bun pentru a face anunțuri de cumpărare/vânzare, un fel de OLX! 😄",
                        "",
                        "💻 Playground",
                        "Este destinat lucrului în echipă la proiecte de facultate/personale",
                        "",
                        "🆚 Competitiv",
                        "Este destinat pentru jocuri amicale și competiții la diferite jocuri",
                        "",
                        "🎰 Casino",
                        "Este destinat pentru jocuri de noroc: /slots /tictactoe /rockpaperscissors",
                        "",
                        "🐸 Memes",
                        "Este destinat pentru postarea de meme-uri"
                    ]
                },
                {
                    title: "👑 Roluri",
                    content: [
                        "Nu uitați să vă selectați rolurile dorite folosind canalul dedicat!"
                    ]
                },
                {
                    title: "📢 Invitații prieteni",
                    content: [
                        "Dacă doriți să ne ajutați să creștem, puteți invita prietenii pe server!",
                        "Cine face asta e cel mai tare! 😎",
                        "",
                        "🔗 Link de invitație permanent: https://discord.gg/8VDSddF"
                    ]
                }
            ];
    
            let message = sections.map(section => {
                let sectionMessage = "```" + section.title + "```";
                sectionMessage += "\n" + section.content.join('\n');
                return sectionMessage;
            }).join('\n\n');
    
            await interaction.editReply({ content: 'Informations has been sent successfully!', ephemeral: true });
    
            await interaction.channel.send({ content: message });
        } catch (error) {
            logger.error("🚫 Error at /info", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};
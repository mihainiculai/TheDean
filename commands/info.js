const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with information about the server.')
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        let message = "";
        message += "```📚 Canalele serverului```\n";
        message += "🔴 Anunturi\n";
        message += "Oferă anunțuri OFICIALE despre facultate și despre ce se întamplă pe server\n";
        message += "\n";
        message += "📗 CSIE An 1 / 2 / 3\n";
        message += "Dacă doriți să comunicați exclusiv în scop academic, avem acest canal\n";
        message += "\n";
        message += "🖥 Cariera IT\n";
        message += "Este destinat pentru întrebări și discuții despre cariera în IT\n";
        message += "\n";
        message += "👥 Intros\n";
        message += "Este un loc bun pentru a te introduce și a face cunoștință cu ceilalți studenți\n";
        message += "\n";
        message += "🛒 Bazar\n";
        message += "Este un loc bun pentru a face anunțuri de cumpărare/vânzare, un fel de OLX! 😄\n";
        message += "\n";
        message += "💻 Playground\n";
        message += "Este destinat lucrului în echipă la proiecte de facultate/personale\n";
        message += "\n";
        message += "🆚 Competitiv\n";
        message += "Este destinat pentru jocuri amicale și competiții la diferite jocuri\n";
        message += "\n";
        message += "🎰 Casino\n";
        message += "Este destinat pentru jocuri de noroc: /slots /tictactoe /rockpaperscissors\n";
        message += "\n";
        message += "🐸 Memes\n";
        message += "Este destinat pentru postarea de meme-uri\n";
        message += "\n";
        message += "```👑 Roluri```\n";
        message += "Nu uitați să vă selectați rolurile dorite folosind canalul dedicat!\n";
        message += "\n";
        message += "```📢 Invitații prieteni```\n";
        message += "Dacă doriți să ne ajutați să creștem, puteți invita prietenii pe server!\n";
        message += "Cine face asta e cel mai tare! 😎\n";
        message += "\n";
        message += "🔗 Link de invitație permanent: https://discord.gg/8VDSddF\n";
        message += "\n";
        
        await interaction.editReply({ content: 'Informations has been sent successfully!', ephemeral: true });
        
        await interaction.channel.send( { content: message } );
    },
};
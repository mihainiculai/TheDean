const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with a list of all commands.')
		.setDMPermission(false),

	async execute(interaction) {
		const helpEmbed = new EmbedBuilder()
			.setColor('#f1ac50')
			.setTitle('📖 Help')
			.setDescription('Here is a list of all commands.\n \u200B')
			.addFields(
				{ name: "💰 Balance", value: "Displays your balance.", inline: true },
				{ name: "🏦 Rob", value: "Rob a user.", inline: true },
				{ name: "💸 Pay", value: "Pay a user with some money.", inline: true },
				{ name: "🖼️ Picture", value: "Sends a random picture.", inline: true },
				{ name: "📝 Ask", value: "Ask a question to the bot.", inline: true },
				{ name: "🐶 Animalutze", value: "Sends a random cute pet picture.", inline: true },
				{ name: "🎰 Slots", value: "Play slots and win money.", inline: true },
				{ name: "🎮 TicTacToe", value: "Play TicTacToe with a friend.", inline: true },
				{ name: "🪨 RockPaperScissors", value: "Play RockPaperScissors with a friend.", inline: true },
				{ name: "📚 Restante", value: "Displays information about restante.", inline: true },
				{ name: "🏓 Ping", value: "Returns the bot ping.", inline: true },
				{ name: "📊 Poll", value: "Creates a poll.", inline: true },
				{ name: "👤 Whois", value: "Displays information about a user.", inline: true },
				{ name: "📈 Serverinfo", value: "Displays information about the server.", inline: true },
				{ name: "📜 Credits", value: "Displays the credits for this bot.", inline: true }
			)
			.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
			.setTimestamp();
		await interaction.reply({ embeds: [helpEmbed] });
	},
};
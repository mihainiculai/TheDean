const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Balance = require('../models/balance.js');

const fruits = ['🍇', '🍊', '🍋', '🍌'];

function generateSlots() {
    const result = [];
    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++)
            row.push(fruits[Math.floor(Math.random() * fruits.length)]);
        result.push(row);
    }
    return result;
}
function outputSlots(result, final = false) {
    let message = "```\n"
    message += `----------------------------\n`;
    message += `    🎰  SLOT MACHINE  🎰    \n`;
    message += `----------------------------\n`;
    message += `    ${result[0][0]}   :   ${result[0][1]}   :   ${result[0][2]}    \n`;
    message += `\n`;
    message += ` >  ${result[1][0]}   :   ${result[1][1]}   :   ${result[1][2]}  < \n`;
    message += `\n`;
    message += `    ${result[2][0]}   :   ${result[2][1]}   :   ${result[2][2]}   \n`;
    message += `----------------------------\n`;
    if (final) {
        if (result[1][0] === result[1][1] && result[1][1] === result[1][2]) {
            message += ` : : : :    WIN    : : : : \n`;
        } else {
            message += ` : : : :    LOSE   : : : : \n`;
        }
    } else {
        message += ` : : : :    SPIN    : : : : \n`;
    }
    message += `----------------------------\n`;
    message += "```";
    return message;
}
    
module.exports = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Play a game of slots.')
        .addNumberOption(option =>
            option.setName('bet')
                .setDescription('How much you want to bet.')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction, client) {
        try {
            await interaction.deferReply();

            const bet = interaction.options.getNumber('bet');
            const storedBalance = await client.fetchBalance(interaction.guildId, interaction.user.id);
    
            if (bet < 1)
                return interaction.editReply({ content: 'You can\'t bet less than 1 coin.', ephemeral: true });
    
            if (bet > storedBalance.balance)
                return interaction.editReply({ content: 'You don\'t have enough coins to bet that much.', ephemeral: true });
    
            let embed = new EmbedBuilder()
                .setColor('#f1ac50')
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setDescription(outputSlots(generateSlots()))
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();
            await interaction.editReply({ embeds: [embed] });
    
            setTimeout(async () => {
                embed = new EmbedBuilder()
                    .setColor('#f1ac50')
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                    .setDescription(outputSlots(generateSlots()))
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                    .setTimestamp();
                await interaction.editReply({ embeds: [embed] });
            }, 1000);
    
            const result = generateSlots();
            setTimeout(async () => {
                embed = new EmbedBuilder()
                    .setColor('#f1ac50')
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                    .setDescription(outputSlots(result, true))
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                    .setTimestamp();
                await interaction.editReply({ embeds: [embed] });
            }, 3000);
    
            if (result[1][0] === result[1][1] && result[1][1] === result[1][2]) {
                await Balance.findOneAndUpdate(
                    { _id: storedBalance._id },
                    { balance: await client.roundNumbers(storedBalance.balance + bet * 10) },
                )
            } else {
                await Balance.findOneAndUpdate(
                    { _id: storedBalance._id },
                    { balance: await client.roundNumbers(storedBalance.balance - bet) },
                )
            }
        }
        catch (error) {
            console.error("🚫 Error at /slots");
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
        
    },
};
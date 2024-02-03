const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Balance = require('../models/balance.js');
const logger = require('../logger');

const fruits = ['🍇', '🍊', '🍋', '🍌'];

function generateSlots() {
    const result = [];
    const winRate = Math.floor(Math.random() * 100);

    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(fruits[Math.floor(Math.random() * fruits.length)]);
        }
        result.push(row);
    }
    
    let middleRowFruit = -1;
    if (winRate < 25) middleRowFruit = 0;
    else if (winRate < 30) middleRowFruit = 1;
    else if (winRate < 34) middleRowFruit = 2;
    else if (winRate < 35) middleRowFruit = 3;
    else {
        while (result[1][0] === result[1][1] && result[1][1] === result[1][2]) {
            for (let i = 0; i < 3; i++) {
                result[1][i] = fruits[Math.floor(Math.random() * fruits.length)];
            }
        }
    }
    
    if (middleRowFruit !== -1) {
        result[1][0] = fruits[middleRowFruit];
        result[1][1] = fruits[middleRowFruit];
        result[1][2] = fruits[middleRowFruit];
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
            let winnings = 0;
            if (result[1][0] === result[1][1] && result[1][1] === result[1][2]) {
                if (result[1][0] === fruits[0]) winnings = bet * 1;
                else if (result[1][0] === fruits[1]) winnings = bet * 2.5;
                else if (result[1][0] === fruits[2]) winnings = bet * 4;
                else if (result[1][0] === fruits[3]) winnings = bet * 5;

                winnings = await client.roundNumbers(winnings);

                await Balance.findOneAndUpdate(
                    { _id: storedBalance._id },
                    { balance: await client.roundNumbers(storedBalance.balance + winnings) },
                )
            } else {
                await Balance.findOneAndUpdate(
                    { _id: storedBalance._id },
                    { balance: await client.roundNumbers(storedBalance.balance - bet) },
                )
            }

            setTimeout(async () => {
                embed = new EmbedBuilder()
                    .setColor('#f1ac50')
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                    .setDescription(outputSlots(result, true))
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                    .setTimestamp();

                if (winnings > 0) {
                    embed.addFields({ name: '💰 Winnings', value: `${winnings} CiberLei`, inline: true });
                }
                else {
                    embed.addFields({ name: '💸 Loss', value: `${bet} CiberLei`, inline: true });
                }
                
                await interaction.editReply({ embeds: [embed] });
            }, 3000);
        }
        catch (error) {
            logger.error("🚫 Error at /slots", error);
            await interaction.editReply({ content: `🚫 Oops! Something went wrong. Please try again later.`, ephemeral: true });
        }
    },
};
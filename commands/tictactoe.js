const { SlashCommandBuilder } = require('@discordjs/builders');
const { TicTacToe } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('Play a game of tic tac toe.')
        .addUserOption(option =>
            option.setName('opponent')
                .setDescription('Who do you want to play against?')
                .setRequired(true))
        .setDMPermission(false),

    async execute(message) {
        const Game = new TicTacToe({
            message: message,
            isSlashGame: true,
            opponent: message.options.getUser('opponent'),
            embed: {
                title: 'Tic Tac Toe',
                color: '#f1ac50',
                statusTitle: 'Status',
                overTitle: 'Game Over',
            },
            emojis: {
                xButton: '❌',
                oButton: '🔵',
                blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} | Its turn of player **{player}**.',
            winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
        });

        Game.startGame();
        Game.on('gameOver', result => {
            // TO DO: Add economy support
        });
    },
};

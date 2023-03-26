const { SlashCommandBuilder } = require('@discordjs/builders');
const { RockPaperScissors } = require("discord-gamecord");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rockpaperscissors')
        .setDescription('Play a game of rock paper scissors.')
        .addUserOption(option =>
            option.setName('opponent')
                .setDescription('Who do you want to play against?')
                .setRequired(true))
        .setDMPermission(false),
        
    async execute(message) {
        const Game = new RockPaperScissors({
            message: message,
            isSlashGame: false,
            opponent: message.options.getUser('opponent'),
            embed: {
                title: 'Rock Paper Scissors',
                color: '#f1ac50',
                description: 'Press a button below to make a choice.'
            },
            buttons: {
                rock: 'Rock',
                paper: 'Paper',
                scissors: 'Scissors'
            },
            emojis: {
                rock: '🌑',
                paper: '📰',
                scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'You choose {emoji}.',
            winMessage: '**{player}** won the Game! Congratulations!',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
        });

        Game.startGame();
        Game.on('gameOver', result => {
            //console.log(`${result.player.username} result: ${result.result}`);
        });
    }
};
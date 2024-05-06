const commands = [
    {
        category: '⚙️ General',
        commands: [
            {
                name: 'help',
                description: 'Obține o listă cu toate comenzile disponibile.'
            },
            {
                name: 'whois',
                description: 'Obține informații despre un utilizator.'
            },
            {
                name: 'serverinfo',
                description: 'Obține informații despre server.'
            },
            {
                name: 'credits',
                description: 'Obține informații despre bot.'
            }
        ]
    },
    {
        category: '🤖 AI Powered',
        commands: [
            {
                name: 'ask',
                description: 'Pune o întrebare și primește un răspuns.'
            },
            {
                name: 'summarize',
                description: 'Rezumă conținutul conversației curente.'
            },
            {
                name: 'code',
                description: 'Te ajută la scris cod sau alte lucruri legate de programare.'
            }
        ]
    },
    {
        category: '💸 Economy',
        commands: [
            {
                name: 'balance',
                description: 'Află soldul tău curent.'
            },
            {
                name: 'daily',
                description: 'Primește recompensa ta zilnică.'
            },
            {
                name: 'balancetop',
                description: 'Află cei mai bogați 10 utilizatori.'
            },
            {
                name: 'pay',
                description: 'Transferă bani unui alt utilizator.'
            }
        ]
    },
    {
        category: '🎉 Fun',
        commands: [
            {
                name: 'meme',
                description: 'Primește un meme random de pe Reddit.'
            },
            {
                name: 'animalutze',
                description: 'Primește imagini random cu animale cute.'
            }
        ]
    },
    {
        category: '🎮 Games',
        commands: [
            {
                name: 'rob',
                description: 'Jefuiește un alt utilizator.'
            },
            {
                name: 'tictactoe',
                description: 'Joacă X și O cu un prieten.'
            },
            {
                name: 'slots',
                description: 'Joacă la păcănele.'
            },
            {
                name: 'rockpaperscissors',
                description: 'Joacă Piatra, Foarfeca, Hârtia cu un prieten.'
            }
        ]
    }
]

module.exports = commands;
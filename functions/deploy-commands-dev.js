module.exports = (client) => {
    client.deployCommandsDev = async () => {
        const { REST, Routes } = require('discord.js');
        const { clientIdDev, tokenDev } = require('../config.json');
        const fs = require('node:fs');
        const path = require('node:path');

        const commands = [];
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '10' }).setToken(tokenDev);

        (async () => {
            try {
                console.log(`⏳ Started refreshing ${commands.length} application (/) commands.`);

                console.log('⏳ Started deleting all old commands.');
                rest.put(Routes.applicationCommands(clientIdDev), { body: [] })
                    .then(() => console.log('✅ Successfully deleted all application commands.'))
                    .catch(console.error);

                const data = await rest.put(
                    Routes.applicationCommands(clientIdDev),
                    { body: commands },
                );

                console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.error('❌' + error);
            }
        })();
    }
}

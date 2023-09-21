const { Events, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const { mongoDBurl } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		if (!mongoDBurl) return console.error('❌ No MongoDB URL provided');

		mongoose.connect(mongoDBurl || '', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		if (mongoose.connect)
			console.log('✅ Connected to database');
		else
			console.log('❌ Failed to connect to database');

		client.user.setActivity('with the code </ >', { type: ActivityType.Playing });
		client.user.setStatus('idle');

		console.log(`✅ ${client.user.tag} is now online`);
	},
};
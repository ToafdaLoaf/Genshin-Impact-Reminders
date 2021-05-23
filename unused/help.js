const Discord = require('discord.js');
const mongo = require('@root/mongo');
const commandPrefixSchema = require('@schemas/command-prefix-schema');

module.exports = {
	commands: 'help',
	minArgs: 0,
	maxArgs: 0,
	callback: async message => {

		const guildId = message.guild.id;
		const query = { _id: guildId };

		await mongo().then(async mongoose => {
			try {
				const result = await commandPrefixSchema.find(query);
				let prefix;
				if (result.length === 0) {
					prefix = 'b!';
				} else {
					prefix = result[0].prefix;
				}

				const embed = new Discord.MessageEmbed()
					.setTitle(`Help/Command List (Current Prefix: ${prefix})`)
					.setDescription(`
				**help** - Displays this window
				**bruh** - bruh moment
				**characters (Page Number — Default 1)** - Displays supported characters
				**charinfo/cinfo [ID/Character Name]** - Displays information about a certain character
				**tracking (Page Number — Default 1)** - Displays a list of which characters you are currently tracking
				**add/track [ID/Character Name]** - Start tracking a character
				**remove/untrack [ID/Character Name/all]** - Stop tracking a character ( \`all\` WIPES your characters list. Be careful.)
				**weapons (Page Number — Default 1)** - Displays supported weapons
				**weaponinfo/winfo [ID/Weapon Name]** - Displays information about a certain weapon
				**arsenal** - Displays a list of which weapons you are curently tracking
				**addweapon/equip [ID/Weapon Name]** - Start tracking a weapon
				**removeweapon/unequip [ID/Weapon Name/all]** - Stop tracking a weapon (\`all\` WIPES your weapons list. Be careful.)
				**agenda (Page Number - Default 1)** - View what materials you can farm for your tracked characters and weapons
				**message (Message)** - Add a custom message to the bottom of the agenda. Inputting no arguments will show your saved message
				**setprefix [prefix]** - You need administrator perms to do this one`,
					)
					.setColor('#00FF97')
					.addFields(
						{
							name: 'This bot is a __**Work In Progress**__ and is centered around **NA** server time!',
							value: 'Stuff is probably not going to work. Please contact `Toafu#4965` if something doesn\'t work as expected.',
							inline: true,
						});
				message.channel.send(embed);
			} finally {
				mongoose.connection.close();
			}
		});
	},
};
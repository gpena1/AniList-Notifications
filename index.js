import {Client, Events, GatewayIntentBits } from 'discord.js';
import express from 'express'; 
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
let user;
client.on(Events.ClientReady, async rc => {
	console.log('hello from discord bot');
	user = await rc.users.fetch(process.env.USER_ID);
	client.user.setPresence({status: 'online'});
});
client.on(Events.InteractionCreate, async interaction => {
	let n = interaction.options.data[0].value;
	if(n > 100){
		interaction.reply(`Error: \`n\` must be less than 100. You entered: \`${n}\`.`);
		return;
	}
	interaction.reply(`Deleting \`${n}\` messages...`);
	let gian;
	try{
		gian = await client.users.fetch('247492668131770369');
	}catch(e){
		console.log('Error with API request fetching my account:');
		console.log(e);
		return;
	}
	try{
		let channel = await gian.createDM();
		let messages = await channel.messages.fetch({limit: n});
		messages.filter(msg => msg.author.id == client.user.id);
		await Promise.all(messages.map(msg => msg.delete()));
	}catch(e){
		console.log('Error with purging DM channel:');
		console.log(e);
		return;
	}
});
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
	res.send('hello :3');
});
app.post('/notify', async (req, res) => {
	let json = req.body;
	console.log(json);
	let name = json.name;
	let episode = json.episode;
	user.send(`Episode ${episode} of ${name} has aired!`);
	res.send('OK');
});

app.listen(8080, () => {
	console.log('Anime notifications bot online.');
});
client.login(process.env.ANILIST_BOT_TOKEN);

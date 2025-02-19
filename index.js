import {Client, Events, GatewayIntentBits } from 'discord.js';
import express from 'express'; 
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
let user;
client.on(Events.ClientReady, async rc => {
	console.log('hello from discord bot');
	user = await rc.users.fetch(process.env.USER_ID);
	client.user.setPresence({status: 'online'});
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

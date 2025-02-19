import {Client, Events, GatewayIntentBits } from 'discord.js';
import express from 'express'; 
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
let gian;
client.on(Events.ClientReady, async rc => {
	console.log('hello from discord bot');
	gian = await rc.users.fetch('247492668131770369');
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
	gian.send(`Episode ${episode} of ${name} has aired!`);
	res.send('OK');
});

app.listen(8080, () => {
	console.log('Anime notifications bot online.');
});
client.login(process.env.ANILIST_BOT_TOKEN);

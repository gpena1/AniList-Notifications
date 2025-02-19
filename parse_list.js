#!/home/ubuntu/.nvm/versions/node/v22.13.1/bin/node

let json = process.argv[2];
json = JSON.parse(json).data.Page.mediaList;
json = json.filter( entry => entry.media.nextAiringEpisode );

// 3 seconds is the maximum I will allow two timestamps to be for equality.
let tolerance = 3000; 

json.forEach(j => {
	let name = j.media.title.english
	let episode = j.media.nextAiringEpisode.episode;
	let timestamp = j.media.nextAiringEpisode.airingAt * 1000;
	let current = new Date().getTime();
	if(Math.abs(current - timestamp) <= tolerance)
		fetch('http://localhost:8080/notify', {method: 'POST', body: JSON.stringify({"name": name, "episode": episode}), headers: {'Content-Type': 'application/json'}});
});

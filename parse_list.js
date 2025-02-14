#!/home/ubuntu/.nvm/versions/node/v22.13.1/bin/node

let json = process.argv[2];
json = JSON.parse(json).data.Page.mediaList;
json = json.filter( entry => entry.media.nextAiringEpisode );
function format(date){
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let day_of_week = date.getDay();
	return `${minutes} ${hours} * * ${day_of_week}`;

}
json.forEach(j => {
	let name = j.media.title.english
	let episode = j.media.nextAiringEpisode.episode;
	let timestamp = j.media.nextAiringEpisode.airingAt;
	let d = new Date(timestamp * 1000);
	console.log(`${format(d)} ubuntu curl -sX GET "http://localhost:8080/notify" -H "Content-Type: application/json" --data @<(echo "{\\"name\\": \\"${name}\\", \\"episode\\": ${episode}}") > /dev/null 2>&1`)
});

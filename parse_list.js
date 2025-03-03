#!/home/ubuntu/.nvm/versions/node/v22.13.1/bin/node

let current = new Date().getTime();
let json = process.argv[2];
json = JSON.parse(json).data.Page.mediaList;
console.log(json);
json = json.filter(entry => entry.media.nextAiringEpisode);
console.log(json);

// 8 seconds is the maximum I will allow two timestamps to be apart for
// equality.
let tolerance = 8000;

json.forEach(j => {
    let name = j.media.title.english
    let episode = j.media.nextAiringEpisode.episode;
    let timestamp = j.media.nextAiringEpisode.airingAt * 1000;
    if (Math.abs(current - timestamp) <= tolerance)
        fetch('http://localhost:8080/notify', {
            method : 'POST',
            body : JSON.stringify({"name" : name, "episode" : episode}),
            headers : {'Content-Type' : 'application/json'}
        });
});

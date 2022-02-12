const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 3000;

/*app.get('/go.js', (req, res) => {
	res.sendFile(path.resolve(__dirname, "./go.js"));
});*/

app.ws('/ws', function(ws, req) {
	ws.on('message', function(msg) {
		var msgJSON = JSON.parse(msg);
		
		/*if (msgJSON.type == "hellofromgojs") {
			console.log(`Hello from go.js! Mazean Scene ID: ${msgJSON.data.sceneID}`);
		}
		else {*/

		if (!fs.existsSync("waypoints.json")) {
			fs.writeFileSync("waypoints.json", "[]");
		}
		
		const waypointData = JSON.parse(fs.readFileSync("waypoints.json"));

		waypointData.push(msgJSON);

		fs.writeFileSync("waypoints.json", JSON.stringify(waypointData));

		console.log(msg);
		//}

		ws.send(msg);
	});
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
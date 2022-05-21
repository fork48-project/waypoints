const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 3000;

app.ws('/ws', function(ws, req) {
	ws.on('message', function(msg) {
		var msgJSON = JSON.parse(msg);

		if (!fs.existsSync("waypoints.json")) {
			fs.writeFileSync("waypoints.json", "[]");
		}
		
		const waypointData = JSON.parse(fs.readFileSync("waypoints.json"));

		waypointData.push(msgJSON);

		fs.writeFileSync("waypoints.json", JSON.stringify(waypointData));

		console.log(msg);

		ws.send(msg);
	});
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
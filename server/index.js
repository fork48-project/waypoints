const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 8080;

let connections = 0;

app.ws("/ws", function(ws, req) {
	if (connections > 50) {
		ws.close();
		return;
	}

	connections++;
	console.log("Connections:", connections);

	const sessionID = crypto.randomBytes(16).toString("hex");

	ws.on("message", function(msg) {
		// Parse message

		try {
			JSON.parse(msg);
		} catch (e) {
			ws.close();
			return;
		}

		if (!fs.existsSync(`waypoints/${sessionID}.json`)) {
			mkdirp.sync("waypoints");

			fs.writeFileSync(`waypoints/${sessionID}.json`, "[]");
		}
		
		let waypointData = JSON.parse(fs.readFileSync(`waypoints/${sessionID}.json`));

		waypointData.push(JSON.parse(msg));

		fs.writeFileSync(`waypoints/${sessionID}.json`, JSON.stringify(waypointData));

		ws.send(msg);
	});

	ws.on("close", () => {
		connections--;
	});
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
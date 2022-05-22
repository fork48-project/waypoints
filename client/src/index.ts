let globalObject = (window as any);

globalObject.waypoints = globalObject.waypoints ?? {server: "ws://localhost:8080/ws"};

// Replace branding

document.title += " + waypoints";

let newImage = document.createElement("img");

newImage.src = "https://raw.githubusercontent.com/fork48-project/waypoints/main/assets/logo.svg";
newImage.id = "svg57";

document.getElementById("svg57").replaceWith(newImage);

// Networking

globalObject._waypoints_socket = new WebSocket(globalObject.waypoints.server);

globalObject._waypoints_socket.addEventListener("open", e => {
	setInterval(() => {
		if (document.getElementsByClassName("reason").length == 1) {
			globalObject._waypoints_socket.send(JSON.stringify({time: Date.now(), alive: false, reason: (document.getElementsByClassName("reason")[0] as HTMLElement).innerText, name: localStorage.name, server: Number(localStorage.serverId)}));
		}

		if (!document.getElementById("ship_status")) {
			return;
		}

		const coords = (document.getElementById("ship_status").firstChild as HTMLElement).innerText.split("—")[3].split("\\n")[0].replace("(", "").replace(")", "").trim();

		globalObject._waypoints_socket.send(JSON.stringify({time: Date.now(), alive: true, position: coords, name: localStorage.name, server: Number(localStorage.serverId)}));
	}, 1000);
});

globalObject._waypoints_socket.addEventListener("close", e => {
	throw new Error("waypoints disconnected");
});
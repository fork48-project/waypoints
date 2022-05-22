let globalObject = (window as any);

globalObject.waypoints = globalObject.waypoints ?? {server: "ws://localhost:8080/ws"};

document.title += " + waypoints";

/*globalObject._waypoints_socket = new WebSocket(globalObject.waypoints.server);

globalObject._waypoints_socket.addEventListener("open", e => {
	setInterval(() => {
		globalObject._waypoints_socket.send();
	}, 1000);
});*/
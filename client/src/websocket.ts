export function init() {
    let webSocketUrl = "ws://";
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        webSocketUrl += "localhost:8081";
    }
    else {
        webSocketUrl += "ws." + location.host;
    }

    const socket = new WebSocket(webSocketUrl);

    socket.onmessage = (message) => {
        console.log(message);
    };
}
const io = require("socket.io-client");

let socket = io.connect("http://localhost:3004");


socket.on("stockvalue", (data) => { console.log("Received: ", data) });
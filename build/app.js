"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import net module.
const net = require("net");
let server = new net.Server();
server.on("connection", (socket) => {
    console.log("Established connection");
    socket.write("Hello!");
    server.getConnections(function (err, count) {
        if (!err) {
            // Print current connection count in server console.
            console.log("There are %d connections now. ", count);
        }
        else {
            console.error(JSON.stringify(err));
        }
    });
});
// Make the server a TCP server listening on port 9999.
server.listen(9999, function () {
    // Get server address info.
    var serverInfo = server.address();
    var serverInfoJson = JSON.stringify(serverInfo);
    console.log('TCP server listen on address : ' + serverInfoJson);
    server.on('close', function () {
        console.log('TCP server socket is closed.');
    });
    server.on('error', function (error) {
        console.error(JSON.stringify(error));
    });
});

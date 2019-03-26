import { Socket } from "net";
import { default as net } from 'net';

// This function create and return a net.Socket object to represent TCP client.
function createSocket() {

    var option = {
        host: 'localhost',
        port: 9999
    }

    let client = new net.Socket();
    client.connect(option);

    client.setEncoding('utf8');

    client.on('data', function (data) {
        console.log('Server return data : ' + data);
    });

    client.on('end', function () {
        console.log('Client socket disconnect.');
    });

    client.on('timeout', function () {
        console.log('Client connection timeout. ');
    });

    client.on('error', function (err) {
        console.error("An error occured : " + err);
    });

    return client;
}

function RandomSendMessage(client: Socket) {
    client.write("Sending Data");
    setTimeout(() => {
        RandomSendMessage(client);
    }, 2000);
}

let nodeClient = createSocket();
let javaClient = createSocket();


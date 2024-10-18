import net from 'net';
import { config } from './config/config.js';

const server = net.createServer((socket) => {
  console.log('Client connected');

  // 역직렬화 바이트배열 -> 스트링
  socket.on('data', (data) => {
    // 4바이트 = 32비트
    while (data.length >= 4) {
      try {
        const packetlength = data.readInt32BE(0);

        if (data.length >= packetlength) {
          const realData = data.subarray(4, packetlength);
          console.log(realData.toString());
          data = Buffer.alloc(0);
        } else {
          break;
        }
      } catch (e) {
        console.log('error occured!');
      }
    }
  });
});

server.listen(config.server.PORT, config.server.HOST, () => {
  console.log(`Hello Sever!! ${config.server.HOST}`);
});

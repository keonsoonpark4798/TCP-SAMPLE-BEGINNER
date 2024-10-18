import net from 'net';
import { config } from './config/config.js';
import { readHeader } from '../utils.js';
const server = net.createServer((socket) => {
  console.log('Client connected');

  // 역직렬화 바이트배열 -> 스트링
  socket.on('data', (data) => {
    // 4바이트 = 32비트
    // while (data.length >= 4) {
    //   try {
    //     const packetlength = data.readInt32BE(0);

    //     if (data.length >= packetlength) {
    //       const realData = data.subarray(4, packetlength);
    //       console.log(realData.toString());
    //       data = Buffer.alloc(0);
    //     } else {
    //       break;
    //     }
    //   } catch (e) {
    //     console.log('error occured!');
    //   }
    // }
    const { handlerId, length } = readHeader(data);
    console.log(`handlerId: ${handlerId}`);
    console.log(`length: ${length}`);
    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
    // 메시지 추출
    const message = buffer.slice(headerSize); // 앞의 헤더 부분을 잘라낸다.

    console.log(`client 에게 받은 메세지: ${message}`);

    const responseMessage = 'Hi!, There';
    const responseBuffer = Buffer.from(responseMessage);

    const header = writeHeader(responseBuffer.length, handlerId);
    const responsePacket = Buffer.concat([header, responseBuffer]);

    socket.write(responsePacket);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

server.listen(config.server.PORT, config.server.HOST, () => {
  console.log(`Hello Sever!! ${config.server.HOST}`);
});

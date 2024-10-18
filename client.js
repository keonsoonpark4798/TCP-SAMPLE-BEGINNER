import net from 'net';
import { writeHeader, readHeader } from './utils.js';
// 서버에 연결할 호스트와 포트
const HOST = '127.0.0.1';
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Connected to server');

  //   const lengthBuffer = Buffer.alloc(4);
  //   lengthBuffer.writeInt32BE(data.length + 4, 0);
  //   // 직렬화 스트링 -> 바이트 배열
  //   const message = 'Hello';
  //   const data = Buffer.from(message);

  //   const buffer = Buffer.concat([lengthBuffer, data]);
  //   client.write(buffer); // write 메서드로 버퍼 쓰기
  const message = 'Hello';
  const buffer = Buffer.from(message);

  const header = writeHeader(buffer.length, 10);
  const packet = Buffer.concat([header, buffer]);
  client.write(packet);

  //client.destroy();
});

client.on('data', (data) => {
  const { handlerId, length } = readHeader(data);
  console.log(`handlerId: ${handlerId}`);
  console.log(`length: ${length}`);

  const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
  // 메시지 추출
  const message = buffer.slice(headerSize); // 앞의 헤더 부분을 잘라낸다.

  console.log(`server 에게 받은 메세지: ${message}`);
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.error('Client error:', err);
});

process.on('SIGINT', () => {
  client.end(() => {
    process.exit(0);
  });
});

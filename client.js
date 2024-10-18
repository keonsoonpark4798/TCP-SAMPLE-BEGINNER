import net from 'net';

// 서버에 연결할 호스트와 포트
const HOST = '127.0.0.1';
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Connected to server');

  const lengthBuffer = Buffer.alloc(4);
  lengthBuffer.writeInt32BE(data.length + 4, 0);
  // 직렬화 스트링 -> 바이트 배열
  const message = 'Hello';
  const data = Buffer.from(message);

  const buffer = Buffer.concat([lengthBuffer, data]);
  client.write(buffer); // write 메서드로 버퍼 쓰기

  //client.destroy();
});

client.on('data', (data) => {
  console.log(data);
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

const handler10 = (data) => {
  // 메세지 대문자로 변경
  const processedData = data.toString().toUpperCase();
  return Buffer.from(processedData);
};

export default handler10;

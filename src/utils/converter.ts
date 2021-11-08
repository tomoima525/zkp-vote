export const base64ToArrayBuffer = (strings: string): Uint8Array => {
  const binaryString = Buffer.from(strings, "base64");
  return binaryString;
};

export const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer): string => {
  const b = Buffer.from(arrayBuffer);
  return b.toString("base64");
};

import * as crypto from 'crypto';

const CHARACTER_ENCODING = 'utf-8';
const ALGORITHM = 'sha256';

function main() {
  const payload = '<body JSON string>';
  const action = '<action>';
  const url = '<url>';
  const timestamp = '<timestamp>';

  // Concatenate the data as per the specification
  const dataToSign = action + url + timestamp + payload;
  const encodedData = Buffer.from(dataToSign, CHARACTER_ENCODING).toString('base64');

  // Base64 encoded secret key
  const base64Key = '';

  // Sign the data
  const signature = sign(encodedData, base64Key);
  console.log(signature);
}

function sign(data: string, secretKey: string): string {
  const key = Buffer.from(secretKey, 'base64');
  const hmac = crypto.createHmac(ALGORITHM, key);
  const decodedData = Buffer.from(data, 'base64');
  hmac.update(decodedData);
  return hmac.digest('base64');
}

main();

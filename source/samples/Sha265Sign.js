const crypto = require('crypto');

function sign(data, secretKey) {
  const key = Buffer.from(secretKey, 'base64');
  const hmac = crypto.createHmac('sha256', key);
  const dataBuffer = Buffer.from(data, 'base64');
  hmac.update(dataBuffer);
  return hmac.digest('base64');
}

async function main() {
  const payload = "<body JSON string>";  // Replace with actual payload
  const action = "<action>";            // Replace with actual action
  const url = "<url>";                  // Replace with actual URL
  const timestamp = "<timestamp>";      // Replace with actual timestamp

  const dataString = action + url + timestamp + payload;
  const encodedData = Buffer.from(dataString).toString('base64');

  console.log("Encoded Data:", encodedData);

  const base64Key = "<signing key>";    // Replace with actual base64Key
  const signature = sign(encodedData, base64Key);

  console.log("Signature:", signature);
}

main().catch(console.error);
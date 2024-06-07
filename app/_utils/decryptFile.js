import CryptoJS from 'crypto-js';

async function decryptFile(file, passphrase) {
  // Convert the passphrase to bytes
  const passphraseBytes = CryptoJS.enc.Utf8.parse(passphrase);

  // Convert the file data to bytes
  const fileDataBytes = CryptoJS.enc.Base64.parse(file.data);

  // Decrypt the file data using AES decryption
  const decryptedData = CryptoJS.AES.decrypt(
    {
      ciphertext: fileDataBytes
    },
    passphraseBytes,
    {
      iv: CryptoJS.enc.Hex.parse(file.iv), // Convert IV from hex to bytes
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  // Convert the decrypted data to a string
  const decryptedDataString = decryptedData.toString(CryptoJS.enc.Utf8);

  return decryptedDataString;
}

export default decryptFile;
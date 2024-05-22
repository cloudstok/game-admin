const CryptoJS = require('crypto-js');

const Encryption = async (id) => {
    try {
      return CryptoJS.AES.encrypt(id, 'secret key 123').toString();
    } catch (er) {
      console.error(er);
    }
  }
  
  
  const Decryption = async (data) => {
    try {
      const bytes = CryptoJS.AES.decrypt(data, 'secret key 123');
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (er) {
      console.error(er);
    }
  }
  module.exports = {Encryption , Decryption}
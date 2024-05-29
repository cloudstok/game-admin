
const { read, write } = require('../db_config/db')
const { v4: uuidv4 } = require('uuid');
const { Encryption, Decryption } = require('../crypto/crypto');
const { hashPassword } = require('../bcrypt/bcrypt');

// Create: Insert a new operator
const ADD_SQL_OPERATOR = "INSERT INTO operator ( name ,user_id,  client_secret) VALUES (?, ?, ?)"

function generateUserId(name) {
  const suffix = '_';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomChars = '';
  for (let i = 0; i < 4; i++) {
    randomChars += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  const userId = name + suffix + randomChars;
  return userId;
}

function createPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomChars = '';
  for (let i = 0; i < 6; i++) {
    randomChars += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomChars;
}

const addAdmin = async (req, res) => {
  try {
    const { name, currency } = req.body
    const user_id = await generateUserId(name)
    const password = await createPassword()
    //  const hash = await hashPassword(password)
     const hash = await hashPassword(password)

    const client_secret = uuidv4()
    await write.query("INSERT INTO user_credentials(user_id, password , role) VALUES (?, ? , ?)", [user_id, hash, "ADMIN"])
    let SQL_admin_profile = " INSERT INTO `admin_profile`(`user_id`, `currency`,`client_secret`, `name`)VALUES(?, ?, ? , ?);"
    await write.query(SQL_admin_profile, [user_id, currency, client_secret, name])
    return res.status(200).send({ status: true, user_id, password, msg: "ADMIN ADD SUCCESSFULLY" })
  } catch (er) {
    console.log(er)
    return res.status(400).send({ status: false, Error: er })
  }
}


const getAdmins = async (req, res) => {
  try {
    const [data] = await read.query("SELECT * FROM admin_profile order by id DESC")
    return res.status(200).send({ status: true, data })
  } catch (er) {
    console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
  }
}

const DeleteOperator = async (req, res) => {
  try {
    const { user_id } = req.query
    const [data] = await read.query("DELETE FROM admin_profile WHERE user_id = ?", [user_id])
    if(data.affectedRows){
      return res.status(200).send({ status: true, msg: "ADMIN delete successfully" })
    }else{
      return res.status(200).send({ status: true, msg: "ADMIN NOT delete successfully" })

    }
  } catch (er) {
    console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
  }
}

const updateOperator = async (req, res) => {
  try {
    const { user_id } = req.body
    delete req.body.user_id 

    const [data] = await read.query("UPDATE admin_profile SET ? WHERE user_id = ?", [req.body, user_id])
    return res.status(200).send({ status: true, msg: "operator updated successfully" })
  } catch (er) {
    console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
  }
}


const resetPassword = async (req, res) => {
  try {
    const { user_id, password, newPassword } = req.body
console.log(user_id, password, newPassword)
    const [data] = await read.query("SELECT user_id , password , role FROM user_credentials where user_id = ?", [user_id])
    if (data.length > 0) {
      const checkPassword = password == await Decryption(data[0].password)
      if (!checkPassword) {
        return res.status(401).json({ status: false, msg: "Missing or Incorrect Credentials" });
      }
      const EncryptionPassword = await Encryption(newPassword)
       await read.query("UPDATE user_credentials SET password = ? WHERE user_id = ?", [EncryptionPassword, user_id])
      return res.status(200).send({ status: true, msg: "reset Password successfully !!!" })
    } else {
      return res.status(404).json({ status: false, msg: "USER NOT EXIST" })
    }
  } catch (er) {
    console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
  }
}



const changePassword = async (req, res) => {
  try {
    const { user_id , password } = req.body
   
    const hash = await hashPassword(password)
 
    await read.query("UPDATE user_credentials SET password = ? WHERE user_id = ?", [hash, user_id])
    return res.status(200).send({ status: true, msg: "change password successfully" })
  } catch (er) {
    console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
  }
}

module.exports = {
  addAdmin,
  getAdmins,
  DeleteOperator,
  updateOperator,
  resetPassword,
  changePassword
}
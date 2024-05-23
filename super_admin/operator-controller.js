
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
   const hash = await hashPassword(password)
    const client_secret = uuidv4()
    await write.query("INSERT INTO user_credentials(user_id, password , role) VALUES (?, ? , ?)", [user_id, hash , "ADMIN"])
    let SQL_admin_credentials =" INSERT INTO `admin_credentials`(`user_id`, `currency`,`client_secret`, `name`)VALUES(?, ?, ? , ?);"
    await write.query(SQL_admin_credentials, [user_id,  currency , client_secret ,name])
    return res.status(200).send({ status: true, user_id, password, msg: "ADMIN ADD SUCCESSFULLY" })
  } catch (er) {
    console.log(er)
    return res.status(400).send({ status: false, Error: er })
  }
}


const getAdmins = async (req, res) => {
  try {
    const [data] = await read.query("SELECT * FROM admin_credentials order by id DESC")
    return res.status(200).send({ status: true, data })
  } catch (er) {
    console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
  }
}

const DeleteOperator = async (req, res) => {
  try {
    const { user_id } = req.query
    const [data] = await read.query("DELETE FROM operator WHERE user_id = ?", [user_id])
    return res.status(200).send({ status: true, msg: "operator delete successfully" })
  } catch (er) {
    console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
  }
}

const updateOperator = async (req, res) => {
  try {
    const { is_active, user_id } = req.body
    const [data] = await read.query("UPDATE admin_credentials SET  is_active = ? WHERE user_id = ?", [is_active, user_id])

    return res.status(200).send({ status: true, msg: "operator updated successfully" })
  } catch (er) {
    console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
  }
}

module.exports = {
  addAdmin,
  getAdmins,
  DeleteOperator,
  updateOperator
}
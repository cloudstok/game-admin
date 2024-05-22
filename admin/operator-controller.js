
const { read, write } = require('../db_config/db')
const { v4: uuidv4 } = require('uuid');
const {Encryption , Decryption} = require('../crypto/crypto')

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
  
  const createOperator = async (req, res) => {
    try {
      const { name } = req.body
      user_id = await generateUserId(name)
      const id = uuidv4()
      await write.query(ADD_SQL_OPERATOR, [name, user_id, id])
      const client_secret = await Encryption(id)
      return res.status(200).send({ status: true, client_secret, user_id, msg: "OPERATOR ADD SUCCESSFULLY" })
    } catch (er) {
      console.log(er)
      return res.status(400).send({ status: false, Error: er })
    }
  }
  

const getOperator = async (req, res) => {
    try {
        const [data] = await read.query("SELECT * FROM operator")
         return res.status(200).send({ status: true, data })
    } catch (er) {
        console.error(er);
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
}

const DeleteOperator = async (req, res) => {
    try {
        const {user_id} = req.query
        const [data] = await read.query("DELETE FROM operator WHERE user_id = ?" , [user_id])
         return res.status(200).send({ status: true, msg : "operator delete successfully" })
    } catch (er) {
        console.error(er);
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
}

const updateOperator = async (req, res) => {
    try {
        const {is_active ,  user_id} = req.body
        const [data] = await read.query("UPDATE operator SET  is_active = ? WHERE user_id = ?" , [ is_active ,user_id])
        
         return res.status(200).send({ status: true, msg : "operator updated successfully" })
    } catch (er) {
        console.error(er);
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
}

module.exports = {
    createOperator,
    getOperator,
    DeleteOperator,
    updateOperator
}
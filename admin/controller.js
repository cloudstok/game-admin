const { compare } = require('../bcrypt/bcrypt');
const { Encryption, Decryption } = require('../crypto/crypto');
const { read, write } = require('../db_config/db');
const { generateToken } = require('../jwt/jsonwebtoken');

const selfOperator = async (req ,res)=>{
    try{
     const {user_id}  =res.locals.auth.user
        const [[data]] = await write.query("SELECT * FROM admin_profile where user_id = ?" , [user_id])
        return res.status(200).send({ status: true, data})
    }catch(er){
        console.error(er);
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
}

const loginOperator = async (req, res) => {
    try {
      const { user_id, password } = req.body
      const [data] = await read.query("SELECT user_id , password , role FROM user_credentials where user_id = ?", [user_id])
      if(data.length > 0) {
        const checkPassword =await compare(password, data[0].password)
        if (!checkPassword) {
          return res.status(401).json({ status: false, msg: "Missing or Incorrect Credentials" });
        }
const sql_admin_profile = "SELECT * FROM admin_profile where user_id = ?"
   const [[admin]] = await read.query(sql_admin_profile , [user_id])
         admin.role = data[0].role
        const Token = await generateToken(admin, res)
        return res.status(200).send({ status: true, Token,  role : data[0].role })
      } else {
        return res.status(404).json({ status: false, msg: "USER NOT EXIST" })
      }
    } catch (er) {
        console.error(er);
      return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
  }

module.exports = {
    loginOperator,
    selfOperator
}
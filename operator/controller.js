const { Encryption, Decryption } = require('../crypto/crypto');
const { read, write } = require('../db_config/db');
const { generateToken } = require('../jwt/jsonwebtoken');

const loginOperator = async(req ,res)=>{
    try{
        const {user_id , client_secret} = req.body;
        const [[data]] = await write.query("SELECT * FROM operator where user_id = ?" , [user_id])
        const uuid = await Decryption(client_secret)
         if(uuid == data?.client_secret ){
            data.secret_key = client_secret
            const Token = await generateToken(data, res)
            return res.status(200).send({ status: true, Token })
         }
    }catch(er){
        console.error(er);
    return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
}

module.exports = {
    loginOperator
}
const { Encryption } = require("../crypto/crypto");
const { generateToken } = require("../jwt/jsonwebtoken");

const addUser = async (req ,res)=>{
    try{
        const {name}= req.body;

const { id ,client_secret , user_id , currency} =res.locals.auth.user

const encryptionData = await Encryption({name , id ,client_secret , user_id , currency})
const Token = await generateToken(encryptionData, res)
        return res.status(200).send({ status: true, Token })
    }catch(er){
        console.error(er);
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
}


module.exports = { addUser}


const verifyUser = async (req ,res)=>{
    try{
const {name}= req.body;
   const amount = 3000
   const { id ,client_secret , user_id , currency} = res.locals.auth.user
const sql = "insert into user_profile (user_id , name , amount  , created_by) values(?, ?,?, ?)"
await write.query(sql , [userid , name , amount , user_id])

// const encryptionData = await Encryption({name , id ,client_secret , user_id , currency})
// const Token = await generateToken(encryptionData, res)
        return res.status(200).send({ status: true, msg : "user add successfully" })
    }catch(er){
        console.error(er);
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
}


module.exports = {
    verifyUser
}
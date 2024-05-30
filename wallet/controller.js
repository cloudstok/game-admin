const { read } = require("../db_config/db")


const verifyUser = async (req ,res)=>{
    try{
   const amount = 3000
   const { id ,client_secret , user_id , currency} = res.locals.auth.user
   const USER_sql = "update  user_profile set is_verify = ? where user_id = ?"
   const [data] = await read.query(USER_sql , [true , req.body.user_id ])
const sql = "insert into wallet(user_id , amount  , created_by) values(?, ?, ?)"
await write.query(sql , [req.body.user_id  , amount , user_id])
        return res.status(200).send({ status: true, msg : "wallet add successfully" })
    }catch(er){
        console.error(er);
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })
    }
}

const getWallet = async(req ,res)=>{
    try{
        const sql = "SELECT * FROM wallet where is_deleted = 1"
       const [data] = await read.query(sql)
       return res.status(200).send({ status: true, msg : "Find Data" , data })

    }catch(er){
        console.error(er)
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })

    }
}

const updateWallet = async(req ,res)=>{
    try{
        const sql = "update wallet set ? where id = ?"
       const data = await read.query(sql , [req.body , req.query.id])
       return res.status(200).send({ status: true, msg : "Find Data" , data })

    }catch(er){
        console.error(er)
        return res.status(500).json({ msg: "Internal server Error", status: false, ERROR: er })

    }
}


module.exports = {
    verifyUser,
    getWallet,
    updateWallet
}
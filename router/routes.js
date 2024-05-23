const { register, login } = require('../super_admin/admin-controller')
const {   DeleteOperator, updateOperator, addAdmin, getAdmins } = require('../super_admin/operator-controller')
const { auth } = require('../jwt/jsonwebtoken')
const { roundStats, getBet } = require('../admin/bet')
const { loginOperator, selfOperator } = require('../admin/controller')
const { addUser } = require('../user/controller')

const  routes = require('express').Router()


routes.get('/' ,async (req ,res)=>{
    res.send({"msg" : "Testing Successfully 👍"})
})

routes.post('/register' , register)
routes.post('/login' , login)
routes.post('/admin' , auth(['SUPERADMIN']), addAdmin  )
routes.get('/admin' , auth(['SUPERADMIN']) , getAdmins  )
routes.delete('/admin' , auth(['SUPERADMIN']) , DeleteOperator  )
routes.put('/admin' , auth(['SUPERADMIN']) , updateOperator  )
routes.post('/login/admin' , loginOperator  )
routes.get('/bet' , auth(['ADMIN']), getBet )
routes.get('/round/stats' , auth(['ADMIN']) , roundStats)
routes.get('/self/admin  ', auth(['ADMIN']) , selfOperator)
routes.post('/add/user' ,auth(['ADMIN']) , addUser)

// routes.post('/upload', upload.array('file' ,4), async(req, res) => {
//     const {ETag ,ServerSideEncryption , Location , key , Key ,Bucket } =  await uploadImage(req.files)
//     res.send('File uploaded successfully!');
//   });

module.exports = {routes}
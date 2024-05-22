const { register, login } = require('../admin/admin-controller')
const { getOperator , createOperator, DeleteOperator, updateOperator} = require('../admin/operator-controller')
const { auth } = require('../jwt/jsonwebtoken')
const { getBet, roundStats } = require('../operator/bet')
const { loginOperator } = require('../operator/controller')

const  routes = require('express').Router()


routes.get('/' ,async (req ,res)=>{
    res.send({"msg" : "Testing Successfully 👍"})
})

routes.post('/register' , register)
routes.post('/login' , login)
routes.post('/operator' , auth(['ADMIN']), createOperator)
routes.get('/operator' , auth(['ADMIN']) , getOperator)
routes.delete('/operator' , auth(['ADMIN']) , DeleteOperator)
routes.put('/operator' , auth(['ADMIN']) , updateOperator)
routes.post('/login/operator' , loginOperator)
routes.get('/bet' , auth(['OPERATOR']), getBet)
routes.get('/round/stats' , auth(['OPERATOR']) , roundStats)

// routes.post('/upload', upload.array('file' ,4), async(req, res) => {
//     const {ETag ,ServerSideEncryption , Location , key , Key ,Bucket } =  await uploadImage(req.files)
//     res.send('File uploaded successfully!');
//   });

module.exports = {routes}
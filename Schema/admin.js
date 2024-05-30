const Joi = require('joi');

// Define a schema
const loginData = Joi.object({
    user_id: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
});

const addAdminValidate = Joi.object({
    name : Joi.string().min(3).max(30).required(),
     currency :Joi.string().required(),
})

const addWallet = Joi.object({
    user_id : Joi.string().min(3).max(30).required(),
})


module.exports = {
    loginData,
    addAdminValidate,
    addWallet
}

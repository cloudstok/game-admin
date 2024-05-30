

const validateBody = (schema)=>async(req ,res , next)=>{
// Validate the data
const { error, value } = schema.validate(req.body);

if (error) {
    res.status(400).send({status : false , error})
    console.log('Validation error:', error.details);
} else {
    next()
    // console.log('Valid data:', value);
}
}



module.exports = {
    validateBody
}

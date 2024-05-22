const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: "v4",
});

async function uploadImage(files) {
    const s3 = new AWS.S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const Key = `${Date.now()}_${files[0].originalname.trim()}`;
    const params = { Bucket: bucketName, Key: Key, Body: files[0].buffer, ContentType: files[0].mimetype };
    const urlData = await s3.upload(params).promise()
    return urlData
}
module.exports = uploadImage
import AWS from "aws-sdk";

AWS.config.update({
    acessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.s3();
export default s3;
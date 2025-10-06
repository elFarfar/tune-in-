import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "mmulter-s3";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "eu-north-1",
});
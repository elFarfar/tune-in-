import aws from "aws-sdk";
import multer from "multer";
import { Readable } from "stream";

const s3 = new aws.S3({
  endpoint: process.env.CLOUDFLARE_S3_API,
  region: process.env.CLOUDFLARE_REGION,
  credentials: {
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
  },
  signatureVersion: "v4",
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const result = await s3.upload(params).promise();
  
  return result.Location; 
};

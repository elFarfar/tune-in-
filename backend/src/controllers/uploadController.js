import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "mmulter-s3";


//s3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "eu-north-1",
});

//multer
const upload = multer ({
  storage: multerS3({
    s3,
    bucket: "tunein-snippets",
    acl: "public-read",
    key: (req, file, cb) =>{
      cb(null, Date.now().toString() + "-" + file.originalname);
    }
  })
});


//Controller function
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded"});
  }
  res,json({ fileUrl: req.file.location});
};


export const uploadMiddleware = upload.single("file");



import { config } from "aws-sdk/lib/core";
const s3 = require("aws-sdk/clients/s3");

// const {
//   REACT_APP_AWS_ACCESS_KEY,
//   REACT_APP_AWS_SECRET_KEY,
//   REACT_APP_AWS_REGION,
//   REACT_APP_AWS_S3_BUCKET_NAME
// } = process.env;

const bucketName = "hackathonash";
// S3 Bucket Name : hackathonash
// aws_access_key_id = AKIAXVFTJJPJGPE7K55Y
// aws_secret_access_key = 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
// region = us-west-2
config.update({
  accessKeyId: "AKIAXVFTJJPJGPE7K55Y",
  secretAccessKey: "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",
  region: "us-west-2"
});

const S3 = new s3();

const uploadToS3 = (key = "", type, base64data) => {
  let buf = new Buffer(
    base64data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const params = {
    Key: `helloworld`,
    Body: buf,
    Bucket: bucketName,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: type
  };

  let s3UploadPromise = new Promise(function(resolve, reject) {
    S3.upload(params, (err, data) => {
      if (err) {
        console.log("e", err);
        reject(err);
      } else {
        console.log("d", data);
        resolve(data.Location);
      }
    });
  });
  return s3UploadPromise;
};

export default uploadToS3;

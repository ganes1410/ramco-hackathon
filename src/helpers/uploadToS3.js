import { config } from "aws-sdk/lib/core";
import {
  REACT_APP_AWS_ACCESS_KEY,
  REACT_APP_AWS_SECRET_KEY,
  REACT_APP_AWS_REGION,
  REACT_APP_AWS_S3_BUCKET_NAME
} from "./credentials";
const s3 = require("aws-sdk/clients/s3");

config.update({
  accessKeyId: REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: REACT_APP_AWS_SECRET_KEY,
  region: REACT_APP_AWS_REGION
});

const S3 = new s3();

const uploadToS3 = (key = "", type, base64data) => {
  let buf = new Buffer(
    base64data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const params = {
    Key: key,
    Body: buf,
    Bucket: REACT_APP_AWS_S3_BUCKET_NAME,
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

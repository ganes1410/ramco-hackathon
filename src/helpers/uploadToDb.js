import {
  REACT_APP_AWS_ACCESS_KEY,
  REACT_APP_AWS_SECRET_KEY,
  REACT_APP_AWS_REGION
} from "./credentials";

const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB({
  accessKeyId: REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: REACT_APP_AWS_SECRET_KEY,
  region: REACT_APP_AWS_REGION
});

async function updateDB(data) {
  try {
    const params = {
      TableName: "HackathonRamco",
      Item: {
        Contact: { N: data[1] },
        Name: { S: data[0] }
      }
    };

    const result = await dynamodb.putItem(params);
    console.log("rr", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default updateDB;

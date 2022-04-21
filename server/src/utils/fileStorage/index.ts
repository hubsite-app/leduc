import getBuffer from "@utils/getBuffer";
import AWS from "aws-sdk";
import { GetObjectOutput } from "aws-sdk/clients/s3";
import { ReadStream } from "fs";

const client = () => {
  return new AWS.S3({
    endpoint: new AWS.Endpoint(
      `${process.env.SPACES_REGION}.digitaloceanspaces.com`
    ),
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  });
};

const uploadFile = (name: string, body: ReadStream, mimetype: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      client().putObject(
        {
          Bucket: process.env.SPACES_NAME!,
          Key: name,
          Body: await getBuffer(body),
          ACL: "private",
          ContentType: mimetype,
        },
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getFile = (name: string) => {
  return new Promise<GetObjectOutput>(async (resolve, reject) => {
    client().getObject(
      {
        Bucket: process.env.SPACES_NAME!,
        Key: name,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
};

const removeFile = (name: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      client().deleteObject(
        {
          Bucket: process.env.SPACES_NAME!,
          Key: name,
        },
        (err, data) => {
          if (err) reject(err);
          resolve(data);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

export { uploadFile, getFile, removeFile };

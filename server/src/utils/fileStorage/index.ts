import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
} from "@aws-sdk/client-s3";
import errorHandler from "@utils/errorHandler";
import getBuffer from "@utils/getBuffer";

/**
 * @tutorial https://docs.digitalocean.com/products/spaces/resources/s3-sdk-examples/
 */

const client = new S3({
  endpoint: `https://${process.env.SPACES_REGION}.digitaloceanspaces.com`,
  region: process.env.SPACES_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_KEY || "",
    secretAccessKey: process.env.SPACES_SECRET || "",
  },
});

const uploadFile = async (name: string, buffer: Buffer, mimetype: string) => {
  try {
    const data = await client.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_NAME,
        Key: name,
        Body: buffer,
        ACL: "private",
        ContentType: mimetype,
      })
    );

    return data;
  } catch (e) {
    errorHandler("Unable to upload file", e);
  }
};

const getFile = async (name: string) => {
  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: process.env.SPACES_NAME || "",
        Key: name,
      })
    );

    const buffer = await getBuffer(response.Body);

    return buffer;
  } catch (e) {
    errorHandler("Unable to get file", e);
  }
};

const removeFile = async (name: string) => {
  try {
    const data = await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.SPACES_NAME || "",
        Key: name,
      })
    );

    return data;
  } catch (e) {
    errorHandler("Unable to remove file", e);
  }
};

const getFileSignedUrl = async (name: string) => {
  try {
    const getCommandObject = new GetObjectCommand({
      Bucket: process.env.SPACES_NAME || "",
      Key: name,
    });

    let file;
    try {
      file = await client.send(
        new GetObjectCommand({
          Bucket: process.env.SPACES_NAME || "",
          Key: name,
        })
      );
    } catch (error) {
      return null;
    }

    console.log(!!file);

    if (file) {
      return getSignedUrl(client, getCommandObject, {
        expiresIn: 60 * 60,
      });
    } else {
      return null;
    }
  } catch (e) {
    errorHandler("Unable to create a signed download Url", e);
  }
};

export { uploadFile, getFile, removeFile, getFileSignedUrl };

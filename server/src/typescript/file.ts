import { ReadStream } from "fs-capacitor";
import { Types } from "mongoose";

export enum SupportedMimeTypes {
  PNG = "image/png",
  JPEG = "image/jpeg",
  GIF = "image/gif",
  PDF = "application/pdf",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}

export interface IFileCreate {
  _id?: Types.ObjectId;
  stream: ReadStream;
  mimetype: string;
  description?: string;
}

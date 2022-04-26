import { FileDocument, FileModel } from "@models";
import { IFileCreate } from "@typescript/file";
import { uploadFile } from "@utils/fileStorage";

const document = async (
  File: FileModel,
  data: IFileCreate
): Promise<FileDocument> => {
  const file = new File({
    _id: data._id,
    mimetype: data.mimetype,
    description: data.description,
  });

  await uploadFile(file._id.toString(), data.stream, data.mimetype);

  await file.validate();

  await file.save();

  return file;
};

export default {
  document,
};

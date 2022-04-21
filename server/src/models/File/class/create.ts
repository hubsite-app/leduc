import { FileDocument, FileModel } from "@models";
import { IFileCreate } from "@typescript/file";
import { uploadFile } from "@utils/fileStorage";

const document = (File: FileModel, data: IFileCreate) => {
  return new Promise<FileDocument>(async (resolve, reject) => {
    try {
      const file = new File({
        _id: data._id,
        mimetype: data.mimetype,
        description: data.description,
      });

      await uploadFile(file._id.toString(), data.stream, data.mimetype);

      await file.validate();

      await file.save();

      resolve(file);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};

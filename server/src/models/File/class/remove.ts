import { FileDocument, FileModel } from "@models";
import { removeFile } from "@utils/fileStorage";

const full = (file: FileDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await removeFile(file._id.toString());

      await file.remove();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const all = (File: FileModel) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const files = await File.find({});

      files.forEach((file) => {
        file.fullRemove();
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  full,
  all,
};

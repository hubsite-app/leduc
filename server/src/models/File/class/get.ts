import { FileDocument, FileModel } from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import { getFile } from "@utils/fileStorage";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  File: FileModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<FileDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const file = await File.findById(id);

      if (!file && options.throwError) {
        throw new Error("File.getById: unable to find file");
      }

      resolve(file);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const buffer = (file: FileDocument) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const retreivedFile = await getFile(file._id.toString());

      if (!retreivedFile || !retreivedFile.Body)
        throw new Error("unable to retreive file from storage");

      resolve(
        `data:${file.mimetype};base64,${Buffer.from(
          retreivedFile.Body
        ).toString("base64")}`
      );
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  buffer,
};

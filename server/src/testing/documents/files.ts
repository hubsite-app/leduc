import { File, FileDocument } from "@models";
import _ids from "@testing/_ids";
import { createReadStream } from "fs";

export interface SeededFiles {
  jobsite_1_base_1_1_file_1: FileDocument;
}

const createFiles = () => {
  return new Promise<SeededFiles>(async (resolve, reject) => {
    try {
      const jobsite_1_base_1_1_file_1 = await File.createDocument({
        description: "Concrete crew",
        mimetype: "image/jpeg",
        _id: _ids.files.jobsite_1_base_1_1_file_1._id,
        stream: createReadStream("src/testing/assets/concrete.jpg"),
      });

      const files = {
        jobsite_1_base_1_1_file_1,
      };

      for (let i = 0; i < Object.values(files).length; i++) {
        await Object.values(files)[i].save();
      }

      resolve(files);
    } catch (e) {
      reject(e);
    }
  });
};

export default createFiles;

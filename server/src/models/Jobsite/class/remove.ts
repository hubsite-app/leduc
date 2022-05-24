import { File, JobsiteDocument } from "@models";
import { Id } from "@typescript/models";

const fileObject = async (jobsite: JobsiteDocument, fileObjectId: Id) => {
  const index = jobsite.fileObjects.findIndex(
    (object) => object._id?.toString() === fileObjectId.toString()
  );

  if (index !== -1) {
    const fileObject = jobsite.fileObjects[index];

    const file = await File.getById(fileObject.file || "");

    if (file) {
      await file.fullRemove();
    }

    jobsite.fileObjects.splice(index, 1);

    await jobsite.save();
  }
};

export default {
  fileObject,
};

import { CrewDocument, CrewModel } from "@models";
import { ICrewCreate } from "@typescript/crew";

const document = (Crew: CrewModel, data: ICrewCreate) => {
  return new Promise<CrewDocument>(async (resolve, reject) => {
    try {
      const crew = new Crew({
        ...data,
      });

      resolve(crew);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};

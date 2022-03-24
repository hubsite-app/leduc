import ElasticsearchClient from "../../client";
import { EmployeeDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureEmployeeSettings } from "./settings";
import { ES_ensureEmployeeMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureEmployeeIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureEmployeeSettings();
      await ES_ensureEmployeeMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateEmployee = (employee: EmployeeDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== "test") {
        logger.debug(`Updating employee ${employee._id} in ES`);
        await ElasticsearchClient.update({
          index: ElasticSearchIndices.Employee,
          id: employee._id.toString(),
          body: {
            doc: {
              name: employee.name,
              jobTitle: employee.jobTitle,
            },
            doc_as_upsert: true,
          },
        });
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";
import jestLogin from "@testing/jestLogin";
import { ReportNote, File } from "@models";
import { getFile } from "@utils/fileStorage";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

let mongoServer: any, documents: SeededDatabase, app: any;
function setupDatabase() {
  return new Promise<void>(async (resolve, reject) => {
    try {
      documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

beforeAll(async (done) => {
  mongoServer = await prepareDatabase();

  app = await createApp();

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await disconnectAndStopServer(mongoServer);
  done();
});

describe("Report Note Resolver", () => {
  describe("MUTATIONS", () => {
    describe("reportNoteRemoveFile", () => {
      const removeFileMutation = `
        mutation RemoveFile($id: String!, $fileId: String!) {
          reportNoteRemoveFile(reportNoteId: $id, fileId: $fileId) {
            _id 
            files {
              mimetype
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully remove file from report note", async () => {
          expect.assertions(7);

          const token = await jestLogin(
            app,
            documents.users.base_foreman_1_user.email
          );

          expect(
            documents.reportNotes.jobsite_1_base_1_1_note_1.files.length
          ).toBe(1);

          const res = await request(app)
            .post("/graphql")
            .send({
              query: removeFileMutation,
              variables: {
                id: documents.reportNotes.jobsite_1_base_1_1_note_1._id,
                fileId: documents.files.jobsite_1_base_1_1_file_1._id,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.reportNoteRemoveFile).toBeDefined();
          const reportNote = res.body.data.reportNoteRemoveFile;

          expect(reportNote.files.length).toBe(0);

          const fetched = await ReportNote.getById(reportNote._id);
          expect(fetched!.files.length).toBe(0);

          const nonExistantFile = await File.getById(
            documents.files.jobsite_1_base_1_1_file_1._id
          );
          expect(nonExistantFile).toBeNull();

          try {
            await getFile(
              documents.files.jobsite_1_base_1_1_file_1._id.toString()
            );
          } catch (e: any) {
            expect(e.code).toBe("NoSuchKey");
          }
        });
      });
    });
  });
});

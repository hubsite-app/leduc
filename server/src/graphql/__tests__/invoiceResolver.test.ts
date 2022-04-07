import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";
import jestLogin from "@testing/jestLogin";
import { JobsiteMaterialCreateData } from "@graphql/resolvers/jobsiteMaterial/mutations";
import { Invoice, Jobsite, JobsiteMaterial } from "@models";
import { InvoiceData } from "@graphql/resolvers/invoice/mutations";

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

describe("Invoice Resolver", () => {
  describe("MUTATIONS", () => {
    describe("invoiceUpdate", () => {
      const invoiceUpdate = `
        mutation InvoiceUpdate($id: String!, $data: InvoiceData!) {
          invoiceUpdate(id: $id, data: $data) {
            _id
            company {
              name
            }
            cost
            invoiceNumber
            description
            internal
          }
        }
      `;

      describe("success", () => {
        test("should successfully update invoice", async () => {
          const token = await jestLogin(app, documents.users.admin_user.email);

          const data: InvoiceData = {
            companyId: documents.companies.company_1._id.toString(),
            cost: 50,
            date: new Date(),
            internal: true,
            invoiceNumber: "56789",
            description: "new description",
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: invoiceUpdate,
              variables: {
                data,
                id: documents.invoices.jobsite_3_invoice_1._id,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.invoiceUpdate._id).toBe(
            documents.invoices.jobsite_3_invoice_1._id.toString()
          );

          const invoice = (await Invoice.getById(
            documents.invoices.jobsite_3_invoice_1._id
          ))!;

          expect(invoice).toBeDefined();

          expect(invoice.company!.toString()).toBe(data.companyId);
          expect(invoice.cost).toBe(data.cost);
          expect(invoice.internal).toBe(data.internal);
          expect(invoice.invoiceNumber).toBe(data.invoiceNumber);
          expect(invoice.description).toBe(data.description);
        });
      });
    });
  });
});

import {
  Company,
  Invoice,
  InvoiceDocument,
  Jobsite,
  JobsiteMonthReport,
} from "@models";
import { Id } from "@typescript/models";
import { Field, InputType } from "type-graphql";

@InputType()
export class InvoiceData {
  @Field({ nullable: false })
  public companyId!: string;

  @Field({ nullable: false })
  public invoiceNumber!: string;

  @Field({ nullable: false })
  public cost!: number;

  @Field({ nullable: false })
  public date!: Date;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: false })
  public internal!: boolean;
}

const updateForJobsite = (
  invoiceId: string,
  jobsiteId: Id,
  data: InvoiceData
) => {
  return new Promise<InvoiceDocument>(async (resolve, reject) => {
    try {
      const invoice = (await Invoice.getById(invoiceId, { throwError: true }))!;

      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      const company = (await Company.getById(data.companyId, {
        throwError: true,
      }))!;

      await invoice.updateDocument({
        ...data,
        company,
      });

      await invoice.save();

      await JobsiteMonthReport.requestBuild({
        jobsiteId: jobsite._id,
        date: invoice.date,
      });

      resolve(invoice);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  updateForJobsite,
};

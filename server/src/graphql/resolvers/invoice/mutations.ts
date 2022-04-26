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

const updateForJobsite = async (
  invoiceId: string,
  jobsiteId: Id,
  data: InvoiceData
): Promise<InvoiceDocument> => {
  const invoice = await Invoice.getById(invoiceId, { throwError: true });
  if (!invoice) throw new Error("Unable to find invoice");

  const jobsite = await Jobsite.getById(jobsiteId, { throwError: true });
  if (!jobsite) throw new Error("Unable to find jobsite");

  const company = await Company.getById(data.companyId, {
    throwError: true,
  });
  if (!company) throw new Error("Unable to find company");

  await invoice.updateDocument({
    ...data,
    company,
  });

  await invoice.save();

  await JobsiteMonthReport.requestBuild({
    jobsiteId: jobsite._id,
    date: invoice.date,
  });

  return invoice;
};

export default {
  updateForJobsite,
};

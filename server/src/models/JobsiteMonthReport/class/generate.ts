import { JobsiteMonthReportDocument } from "@models";
import { InvoiceReportClass } from "@typescript/invoice";
import { RangeSummaryReportClass } from "@typescript/jobsiteReports";
import { dayReportIssueGeneration } from "@utils/jobsiteReports/issues";
import dayjs from "dayjs";

const expenseInvoiceReports = async (
  jobsiteMonthReport: JobsiteMonthReportDocument
) => {
  // Get all expense invoices
  const jobsite = await jobsiteMonthReport.getJobsite();
  const expenseInvoices = await jobsite.getExpenseInvoices();

  const invoices: InvoiceReportClass[] = [];
  for (let i = 0; i < expenseInvoices.length; i++) {
    const expenseInvoice = expenseInvoices[i];

    if (
      dayjs(expenseInvoice.date).isSame(
        dayjs(jobsiteMonthReport.startOfMonth),
        "month"
      )
    ) {
      const invoice: InvoiceReportClass = {
        invoice: expenseInvoice._id,
        value: expenseInvoice.cost,
        internal: expenseInvoice.internal,
      };

      invoices.push(invoice);
    }
  }

  jobsiteMonthReport.expenseInvoices = invoices;

  return;
};

const revenueInvoiceReports = async (
  jobsiteMonthReport: JobsiteMonthReportDocument
) => {
  // Get all revenue invoices
  const jobsite = await jobsiteMonthReport.getJobsite();
  const revenueInvoices = await jobsite.getRevenueInvoices();

  const invoices: InvoiceReportClass[] = [];
  for (let i = 0; i < revenueInvoices.length; i++) {
    const revenueInvoice = revenueInvoices[i];

    if (
      dayjs(revenueInvoice.date).isSame(
        dayjs(jobsiteMonthReport.startOfMonth),
        "month"
      )
    ) {
      const invoice: InvoiceReportClass = {
        invoice: revenueInvoice._id,
        value: revenueInvoice.cost,
        internal: revenueInvoice.internal,
      };

      invoices.push(invoice);
    }
  }

  jobsiteMonthReport.revenueInvoices = invoices;

  return;
};

const summary = async (jobsiteMonthReport: JobsiteMonthReportDocument) => {
  let externalExpenseInvoiceValue = 0,
    internalExpenseInvoiceValue = 0;
  for (let i = 0; i < jobsiteMonthReport.expenseInvoices.length; i++) {
    if (jobsiteMonthReport.expenseInvoices[i].internal) {
      internalExpenseInvoiceValue +=
        jobsiteMonthReport.expenseInvoices[i].value;
    } else {
      externalExpenseInvoiceValue +=
        jobsiteMonthReport.expenseInvoices[i].value;
    }
  }

  let externalRevenueInvoiceValue = 0,
    internalRevenueInvoiceValue = 0;
  for (let i = 0; i < jobsiteMonthReport.revenueInvoices.length; i++) {
    if (jobsiteMonthReport.revenueInvoices[i].internal) {
      internalRevenueInvoiceValue +=
        jobsiteMonthReport.revenueInvoices[i].value;
    } else {
      externalRevenueInvoiceValue +=
        jobsiteMonthReport.revenueInvoices[i].value;
    }
  }

  const summary: RangeSummaryReportClass = {
    externalExpenseInvoiceValue,
    internalExpenseInvoiceValue,
    externalRevenueInvoiceValue,
    internalRevenueInvoiceValue,
  };

  jobsiteMonthReport.summary = summary;

  return;
};

const issues = async (jobsiteMonthReport: JobsiteMonthReportDocument) => {
  const dayReports = await jobsiteMonthReport.getDayReports();

  jobsiteMonthReport.issues = dayReportIssueGeneration(dayReports);
};

export default {
  expenseInvoiceReports,
  revenueInvoiceReports,
  summary,
  issues,
};

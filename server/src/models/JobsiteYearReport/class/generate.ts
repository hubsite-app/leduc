import { JobsiteYearReportDocument } from "@models";
import { InvoiceReportClass } from "@typescript/invoice";
import { RangeSummaryReportClass } from "@typescript/jobsiteReports";
import dayjs from "dayjs";

const expenseInvoiceReports = (
  jobsiteYearReport: JobsiteYearReportDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Get all expense invoices
      const jobsite = await jobsiteYearReport.getJobsite();
      const expenseInvoices = await jobsite.getExpenseInvoices();

      const invoices: InvoiceReportClass[] = [];
      for (let i = 0; i < expenseInvoices.length; i++) {
        const expenseInvoice = expenseInvoices[i];

        if (
          dayjs(expenseInvoice.date).isSame(
            dayjs(jobsiteYearReport.startOfYear),
            "year"
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

      jobsiteYearReport.expenseInvoices = invoices;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const revenueInvoiceReports = (
  jobsiteYearReport: JobsiteYearReportDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Get all revenue invoices
      const jobsite = await jobsiteYearReport.getJobsite();
      const revenueInvoices = await jobsite.getRevenueInvoices();

      const invoices: InvoiceReportClass[] = [];
      for (let i = 0; i < revenueInvoices.length; i++) {
        const revenueInvoice = revenueInvoices[i];

        if (
          dayjs(revenueInvoice.date).isSame(
            dayjs(jobsiteYearReport.startOfYear),
            "year"
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

      jobsiteYearReport.revenueInvoices = invoices;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const summary = (jobsiteYearReport: JobsiteYearReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      let externalExpenseInvoiceValue = 0,
        internalExpenseInvoiceValue = 0;
      for (let i = 0; i < jobsiteYearReport.expenseInvoices.length; i++) {
        if (jobsiteYearReport.expenseInvoices[i].internal) {
          internalExpenseInvoiceValue +=
            jobsiteYearReport.expenseInvoices[i].value;
        } else {
          externalExpenseInvoiceValue +=
            jobsiteYearReport.expenseInvoices[i].value;
        }
      }

      let externalRevenueInvoiceValue = 0,
        internalRevenueInvoiceValue = 0;
      for (let i = 0; i < jobsiteYearReport.revenueInvoices.length; i++) {
        if (jobsiteYearReport.revenueInvoices[i].internal) {
          internalRevenueInvoiceValue +=
            jobsiteYearReport.revenueInvoices[i].value;
        } else {
          externalRevenueInvoiceValue +=
            jobsiteYearReport.revenueInvoices[i].value;
        }
      }

      const summary: RangeSummaryReportClass = {
        externalExpenseInvoiceValue,
        internalExpenseInvoiceValue,
        externalRevenueInvoiceValue,
        internalRevenueInvoiceValue,
      };

      jobsiteYearReport.summary = summary;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  expenseInvoiceReports,
  revenueInvoiceReports,
  summary,
};

import express from "express";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { IContext } from "@typescript/graphql";

import CompanyResolver from "@graphql/resolvers/company";
import CrewResolver from "@graphql/resolvers/crew";
import DailyReportResolver from "@graphql/resolvers/dailyReport";
import DaySummaryReportResolver from "@graphql/resolvers/daySummaryReport";
import EmployeeResolver from "@graphql/resolvers/employee";
import EmployeeReportResolver from "@graphql/resolvers/employeeReport";
import EmployeeWorkResolver from "@graphql/resolvers/employeeWork";
import FileResolver from "@graphql/resolvers/file";
import InvoiceResolver from "@graphql/resolvers/invoice";
import InvoiceReportResolver from "@graphql/resolvers/invoiceReport";
import JobsiteResolver from "@graphql/resolvers/jobsite";
import JobsiteDayReportResolver from "@graphql/resolvers/jobsiteDayReport";
import JobsiteMaterialResolver from "@graphql/resolvers/jobsiteMaterial";
import JobsiteMonthReportResolver from "@graphql/resolvers/jobsiteMonthReport";
import MaterialResolver from "@graphql/resolvers/material";
import MaterialReportResolver from "@graphql/resolvers/materialReport";
import MaterialShipmentResolver from "@graphql/resolvers/materialShipment";
import MonthSummaryReportResolver from "@graphql/resolvers/monthSummaryReport";
import NonCostedMaterialReportResolver from "@graphql/resolvers/nonCostedMaterialReport";
import ProductionResolver from "@graphql/resolvers/production";
import ReportNoteResolver from "@graphql/resolvers/reportNote";
import SignupResolver from "@graphql/resolvers/signup";
import SystemResolver from "@graphql/resolvers/system";
import TruckingReportResolver from "@graphql/resolvers/truckingReport";
import UserResolver from "@graphql/resolvers/user";
import VehicleResolver from "@graphql/resolvers/vehicle";
import VehicleReportResolver from "@graphql/resolvers/vehicleReport";
import VehicleWorkResolver from "@graphql/resolvers/vehicleWork";

import SearchResolver from "@graphql/resolvers/search";

import { User, UserDocument } from "@models";
import authChecker from "@utils/authChecker";
import { logger } from "@logger";

const createApp = async () => {
  const app = express();

  app.use(cors());

  app.use(express.json({ limit: "100mb" }));

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      CompanyResolver,
      CrewResolver,
      DailyReportResolver,
      DaySummaryReportResolver,
      EmployeeResolver,
      EmployeeReportResolver,
      EmployeeWorkResolver,
      FileResolver,
      InvoiceResolver,
      InvoiceReportResolver,
      JobsiteResolver,
      JobsiteDayReportResolver,
      JobsiteMaterialResolver,
      JobsiteMonthReportResolver,
      MaterialResolver,
      MaterialReportResolver,
      MaterialShipmentResolver,
      MonthSummaryReportResolver,
      NonCostedMaterialReportResolver,
      ProductionResolver,
      ReportNoteResolver,
      SearchResolver,
      SignupResolver,
      SystemResolver,
      TruckingReportResolver,
      UserResolver,
      VehicleResolver,
      VehicleReportResolver,
      VehicleWorkResolver,
    ],
    authChecker,
  });

  const schema = makeExecutableSchema({
    resolvers: resolvers,
    typeDefs,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }: IContext) => {
      const token = req.headers.authorization;

      let user: UserDocument | null = null;

      if (token) {
        const decoded: any = jwt.decode(token);

        user = await User.getById(decoded?.userId);
      }

      return {
        user,
        req,
        res,
      };
    },
    uploads: false,
    plugins: [
      {
        requestDidStart: () => {
          return {
            didEncounterErrors: (context) => {
              if (process.env.NODE_ENV !== "test")
                logger.error({
                  message: context.errors[0].message || "Apollo request error",
                  meta: {
                    variables: context.request.variables,
                    errors: context.errors,
                    operationName: context.operationName,
                  },
                });
            },
          };
        },
      },
    ],
  });

  app.use(
    graphqlUploadExpress({
      maxFileSize: 100000000, // 100mb
      maxFiles: 20,
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  return app;
};

export default createApp;

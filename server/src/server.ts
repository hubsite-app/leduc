import * as dotenv from "dotenv";
import path from "path";
import "reflect-metadata";

// Setup environment variables
const production = process.env.NODE_ENV === "production";
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

import { Company, System } from "@models";
import updateDocuments from "@utils/updateDocuments";
import workers from "@workers";
import mongoose from "mongoose";
import createApp from "./app";
import elasticsearch from "./elasticsearch";

import saveAll from "@testing/saveAll";

let workerEnabled = true,
  apiEnabled = true;

if (process.env.APP_TYPE === "api") {
  apiEnabled = true;
  workerEnabled = false;
} else if (process.env.APP_TYPE === "worker") {
  workerEnabled = true;
  apiEnabled = false;
}

const main = async () => {
  try {
    if (process.env.NODE_ENV !== "test" && process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");

      if (!production) {
        // await seedDatabase();
      }
    }

    // Start API server
    if (apiEnabled) {
      await elasticsearch();

      const port = process.env.PORT || 8080;

      const app = await createApp();

      const server = app.listen(port, () =>
        console.log(`Server running on port: ${port}`)
      );

      // Set timeout to 3 minutes
      server.setTimeout(3 * 60 * 1000);
    }

    if (process.env.NODE_ENV !== "test") {
      if (apiEnabled) {
        if (production) {
          // await saveAll();
        } else {
          await saveAll([], "es");
        }
      }

      await System.validateSystem();
      await Company.validateCompanies();

      await updateDocuments();

      // Enable worker
      if (workerEnabled) {
        workers();
      }
    }
  } catch (error: unknown) {
    console.error("Unknown server error:", error);
  }
};

main().catch((err) => console.error(err));

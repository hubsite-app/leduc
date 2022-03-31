import "reflect-metadata";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import seedDatabase from "./testing/seedDatabase";

// Setup environment variables
let notProduction = false;
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  notProduction = true;
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
} else if (process.env.NODE_ENV !== "production") notProduction = true;

import createApp from "./app";
import updateDocuments from "@utils/updateDocuments";
import saveAll from "@testing/saveAll";
import elasticsearch from "./elasticsearch";
import { Company, System } from "@models";

const main = async () => {
  try {
    await elasticsearch();

    if (process.env.NODE_ENV !== "test") {
      await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");

      if (notProduction) {
        // await seedDatabase();
        // await saveAll();
      } else {
        await saveAll();
      }
    }

    await System.validateSystem();
    await Company.validateCompanies();

    await updateDocuments();

    let port = process.env.PORT || 8080;

    const app = await createApp();

    app.listen(port, () => console.log(`Server running on port: ${port}`));
  } catch (error: any) {
    console.error(error);
  }
};

main().catch((err) => console.error(err));

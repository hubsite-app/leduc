import "reflect-metadata";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import createApp from "./app";
import updateDocuments from "@utils/updateDocuments";
import saveAll from "@testing/saveAll";
import elasticsearch from "./elasticsearch";
import { Company, System } from "@models";

// Setup environment variables
let production = process.env.NODE_ENV === "production";
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

const main = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");

      if (!production) {
        // await seedDatabase();
        // await saveAll();
      }
    }

    let port = process.env.PORT || 8080;

    const app = await createApp();

    app.listen(port, () => console.log(`Server running on port: ${port}`));

    if (process.env.NODE !== "test") {
      if (production) {
        // await saveAll();
      }

      await elasticsearch();

      await System.validateSystem();
      await Company.validateCompanies();

      await updateDocuments();
    }
  } catch (error: any) {
    console.error(error);
  }
};

main().catch((err) => console.error(err));

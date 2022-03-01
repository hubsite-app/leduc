import "reflect-metadata";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import seedDatabase from "./testing/seedDatabase";

console.log(process.env.NODE_ENV);

// Setup environment variables
let notProduction = false;
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  notProduction = true;
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
} else if (process.env.NODE_ENV !== "production") notProduction = true;

import createApp from "./app";

const main = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");

      if (notProduction) {
        // await seedDatabase();
      }
    }

    let port = process.env.PORT || 8080;

    const app = await createApp();

    app.listen(port, () => console.log(`Server running on port: ${port}`));
  } catch (error: any) {
    console.error(error);
  }
};

main().catch((err) => console.error(err));

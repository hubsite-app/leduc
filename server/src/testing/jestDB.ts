import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

function prepareDatabase() {
  return new Promise<MongoMemoryServer>(async (resolve, reject) => {
    try {
      const mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getUri();
      await mongoose.connect(
        mongoUri,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        },
        (err) => {
          if (err) console.error(err);
        }
      );

      resolve(mongoServer);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

// Disconnect mongoose and stop server
function disconnectAndStopServer(mongoServer: any) {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.disconnect();
      await mongoServer.stop();

      resolve(mongoServer);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

export { prepareDatabase, disconnectAndStopServer };

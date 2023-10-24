import Express from "express";
import dbConnection from "./db/dbConnection.js";
import {} from "dotenv/config.js";
import errorHandler from "./Middleware/error-handler.js";
import cors from "cors";
import authrouter from "./router/authrouter.js";
import cookieParser from "cookie-parser";
// import authVerify from "./Middleware/auth-verify.js";
// import fileUpload from "express-fileupload";
// import { v2 as cloudinary } from "cloudinary";

const app = Express();
const PORT = 3000;
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(Express.json());
app.use(cookieParser());
// app.use(fileUpload({ useTempFiles: true }));
app.use("/api/v1/auth", authrouter);
// app.use("/api/v1/user", authVerify, UserDetailRouter);
app.use(errorHandler);

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

const connection = () => {
  try {
    dbConnection(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log("DB Connected")
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

connection();

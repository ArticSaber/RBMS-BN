import Express from "express";
import dbConnection from "./db/dbConnection.js";
import {} from "dotenv/config.js";
import errorHandler from "./Middleware/error-handler.js";
import cors from "cors";
import path from "path";
import authrouter from "./router/authrouter.js";
import cookieParser from "cookie-parser";
import root from "./router/root.js";
import superAdminRouter from "./router/superAdminRouter.js";
import adminRouter from "./router/adminRouter.js";


const app = Express();
const PORT = 3000;
const corsConfig = {
  credentials: true,
  origin: true,
};

const __dirname = path.resolve();

app.use(cors(corsConfig));
app.use(Express.json());
app.use(cookieParser());
app.use("/", Express.static(path.join(__dirname, "public")));
app.use("/",root);
app.use("/auth", authrouter);
app.use("/auth/admin", adminRouter);
app.use("/auth/sup", superAdminRouter);
app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

const connection = () => {
  try {
    dbConnection(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log("DB Connected");
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

connection();
// import authVerify from "./Middleware/auth-verify.js";
// import fileUpload from "express-fileupload";
// import { v2 as cloudinary } from "cloudinary";
// app.use(fileUpload({ useTempFiles: true }));
// app.use("/api/v1/user", authVerify, UserDetailRouter);
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

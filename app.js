import Express from "express";
import dbConnection from "./db/dbConnection.js";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./router/authrouter.js";
import root from "./router/root.js";
import { logger } from "./Middleware/logger.js";
import { errorHandler } from "./Middleware/error-handler.js";
import corsOptions from "./config/corsOptions.js";

const app = Express();
const PORT = 3000;
const __dirname = path.resolve();

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(Express.json());
app.use(bodyParser.json());
app.use("/", Express.static(path.join(__dirname, "/public")));

// Routes
app.use(logger);
app.use("/auth", authRoute);
app.use("/", root);

// Logger

// Error Handling
app.use(errorHandler);

// 404 Handling
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

// import mongoose from "mongoose";
// import userRouter from "./routes/userroutes.js";

// const corsConfig = {
//   credentials: true,
//   origin: true,
// };

// mongoose.connect(process.env.DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   connectTimeoutMS: 30000,
// });
// const db = mongoose.connection;
// db.on("error", (errorMessage) => console.log(errorMessage));
// db.once("open", () => console.log("Connected successfully to the database"));

// app.use("/api/user", userRouter);

import Cors from "cors";
import http from "http";
import dotenv from "dotenv";
import "./utils/database.js";
import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mapsRouter from "./routes/mapsRouter.js";
import courierRouter from "./routes/courierRouter.js";
import deliveryRouter from "./routes/deliveryRouter.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// Cors middleware
app.use(Cors());

// Middleware to parse JSON
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//socket.io setup

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Routes

app.use(mapsRouter);
app.use(courierRouter);
app.use(deliveryRouter);

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

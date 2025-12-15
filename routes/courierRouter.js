import express from "express";
import {
  handleCourierInfo,
  handleCourierLogin,
  handleCourierRating,
  handleCourierStatistik,
} from "../controllers/courierController.js";

const courierRouter = express.Router();

courierRouter.get("/api/courier/info", handleCourierInfo);
courierRouter.post("/api/courier/login", handleCourierLogin);
courierRouter.post("/api/courier/rating", handleCourierRating);
courierRouter.get("/get/courier/statistik", handleCourierStatistik);

export default courierRouter;

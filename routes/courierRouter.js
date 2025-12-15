import express from "express";
import {
  handleCourierInfo,
  handleCourierLogin,
  handleCourierRating,
  handleCourierStatistik,
} from "../controllers/courierController.js";

const courierRouter = express.Router();

courierRouter.get("/courier/info", handleCourierInfo);
courierRouter.post("/courier/login", handleCourierLogin);
courierRouter.post("/courier/rating", handleCourierRating);
courierRouter.get("/courier/statistik", handleCourierStatistik);

export default courierRouter;

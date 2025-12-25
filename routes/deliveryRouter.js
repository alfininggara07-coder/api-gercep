import express from "express";
import {
  updateDelivery,
  requestDelivery,
  getRequestDelivery,
  updateStatusDelivery,
  handleDeliveryCancle,
  getAllRequestDelivery,
} from "../controllers/deliveryController.js";

const deliveryRouter = express.Router();

deliveryRouter.get("/deliverys", getRequestDelivery);
deliveryRouter.post("/delivery/update", updateDelivery);
deliveryRouter.post("/delivery/request", requestDelivery);
deliveryRouter.get("/deliverys/all", getAllRequestDelivery);
deliveryRouter.post("/delivery/cancel", handleDeliveryCancle);
deliveryRouter.get("/delivery/update/status", updateStatusDelivery);

export default deliveryRouter;





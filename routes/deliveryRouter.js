import express from "express";
import {
  updateDelivery,
  requestDelivery,
  getKipDelivery,
  getRequestDelivery,
  updateStatusDelivery,
  handleDeliveryCancle,
  getAllRequestDelivery,
} from "../controllers/deliveryController.js";

const deliveryRouter = express.Router();

deliveryRouter.post("/update/delivery", updateDelivery);
deliveryRouter.get("/get/delivery", getRequestDelivery);
deliveryRouter.get("/api/kip/deliverys", getKipDelivery);
deliveryRouter.post("/delivery/request", requestDelivery);
deliveryRouter.get("/api/all/deliverys", getAllRequestDelivery);
deliveryRouter.post("/api/delivery/cancel", handleDeliveryCancle);
deliveryRouter.get("/update/status/delivery", updateStatusDelivery);

export default deliveryRouter;

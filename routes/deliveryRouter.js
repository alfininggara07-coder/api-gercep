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
deliveryRouter.get("/deliverys", getRequestDelivery);
deliveryRouter.get("/kip/deliverys", getKipDelivery);
deliveryRouter.post("/delivery/request", requestDelivery);
deliveryRouter.get("/all/deliverys", getAllRequestDelivery);
deliveryRouter.post("/delivery/cancel", handleDeliveryCancle);
deliveryRouter.get("/update/status/delivery", updateStatusDelivery);

export default deliveryRouter;



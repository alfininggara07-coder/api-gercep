import express from "express";
import { getLocation } from "../controllers/mapsController.js";

const mapsRouter = express.Router();

mapsRouter.get("/api/get/location", getLocation);


export default mapsRouter;

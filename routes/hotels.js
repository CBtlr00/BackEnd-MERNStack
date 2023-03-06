import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Creating a hotel
router.post("/", verifyAdmin, createHotel);

//Updating a hotel
router.put("/:id", verifyAdmin, updateHotel);

//Delete a hotel
router.delete("/find/:id", verifyAdmin, deleteHotel);

//Get a hotel
router.get("/:id", getHotel);

//Get all hotels
router.put("/", getHotels);
router.put("/countByCity", countByCity);
router.put("/countByType", countByType);

export default router
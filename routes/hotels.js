import express from "express";
import {
  getHotelsByCity,
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  getHotelsByType,
  getHotelsByPrice,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET
router.get("/find/:id", verifyAdmin, getHotel);
//GET ALL
router.get("/", getHotels);
router.get("/byCity", getHotelsByCity)
router.get("/countByCity", countByCity);
router.get('/hotels/type/:type', getHotelsByType);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/sortbyprice", getHotelsByPrice)

export default router;

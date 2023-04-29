import express from "express";
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingByUser,
  getBooking,
  getAllBookings
} from "../controllers/booking.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyUser, createBooking);
//UPDATE
router.put("/:id", verifyAdmin, updateBooking);
//DELETE
router.delete("/:id", verifyAdmin, deleteBooking);
//GET
router.get("/find/:id", verifyAdmin, getBooking);
//GET ALL
router.get("/getBookingByUser", verifyUser, getBookingByUser);
router.get("/", getAllBookings);

export default router;
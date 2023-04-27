import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", (req,res)=> {
    //Creating a Room
    router.post("/:hotelid", verifyAdmin, createRoom);

    //Updating a Room
    router.put("/:id", verifyAdmin, updateRoom);
    router.put("/availability/:id", verifyAdmin, updateRoomAvailability);

    //Delete a Room
    router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

    //Get a Room
    router.get("/:id", verifyAdmin,getRoom);

    //Get all Rooms
    router.put("/", verifyAdmin, getRooms);
})

export default router
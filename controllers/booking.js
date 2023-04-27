import Booking from "../models/Booking.js";
import { createError } from "../utils/error.js";

export const createBooking = async (req, res, next) => {
    const newBooking = new Booking(req.body);
  
    try {
      const savedBooking = await newBooking.save();
      res.status(200).json(savedBooking);
    } catch (err) {
      next(err);
    }
  };

export const updateBooking = async (req, res, next) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedBooking);
    } catch (err) {
      next(err);
    }
  };

export const deleteBooking = async (req, res, next) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json("Booking has been deleted.");
    } catch (err) {
      next(err);
    }
};

export const getBooking = async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);
      res.status(200).json(booking);
    } catch (err) {
      next(err);
    }
  };

  export const getBookingByUser = async (req, res, next) => {
  try {
    const newBooking = await Booking.find({ userId: req.body.userId });
    res.status(201).json({
      status: "success",
      result: newBooking.length,
      booking: newBooking
    });
  } catch (error) {
    next(new createError(error));
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const getAllBookings = await Booking.find();
    res.status(201).json({
      status: "success",
      result: getAllBookings.length,
      booking: getAllBookings
    });
  } catch (error) {
    next(new createError(error));
  }
};
import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
      },
      date:{
        type: Date,
        required: [true]
      },
      phone:{
        type:String,
        required: [false]
      },
      address: {
        type: String,
        required: [false]
      },
      userId: {
        type: String,
        required: [true]
      },
      city: {
        type: String,
        required: [false]
      },
      hotel: {
        type: String,
        required: [true]
      },
      hotelAddress: {
        type: String,
        required: [true]
      },
      maxPeople: {
        type: Number,
        required: [true],
        min: [1],
        max: [8]
      },
      price: {
        type: Number,
        required: [true]
      },
      roomName: {
        type: String,
        required: [true]
      },
      roomNumbers: {
        type: [Number],
        required: [true]
      }
});

export default mongoose.model('Booking', BookingSchema);
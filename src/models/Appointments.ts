// models/Appointment.ts
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true }, 
  time: { type: String, required: true },
  description:{ type: String, required: true },
   createdAt: {
    type: Date,
    default: Date.now,   
  },
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

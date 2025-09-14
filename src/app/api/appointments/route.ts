import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Appointment from "../../../models/Appointments";

// GET all appointments
export async function GET() {
  await connectDB();
  const appointments = await Appointment.find();
  return NextResponse.json(appointments);
}

// POST create new appointment
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAppointment = await Appointment.create(body);
  return NextResponse.json(newAppointment);
}

// DELETE appointment
export async function DELETE(req: Request) {
  await connectDB();
  const body = await req.json();
  await Appointment.findByIdAndDelete(body._id);
  return NextResponse.json({ message: "Appointment deleted" });
}

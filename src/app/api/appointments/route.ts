import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Appointment from "../../../models/Appointments";

export async function GET() {
  await connectDB();
  const appointments = await Appointment.find();
  return NextResponse.json(appointments);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAppointment = await Appointment.create(body);
  return NextResponse.json(newAppointment);
}

export async function DELETE(req: Request) {
  await connectDB();
  const body = await req.json();
  await Appointment.findByIdAndDelete(body._id);
  return NextResponse.json({ message: "Appointment deleted" });
}

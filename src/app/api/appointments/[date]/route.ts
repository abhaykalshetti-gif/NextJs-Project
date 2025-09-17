import { NextResponse } from "next/server";

import { connectDB } from "../../../../lib/mongodb";
import Appointment from "../../../../models/Appointments";


export async function GET(request: Request, { params }:{ params: { date: string } }) {
  
  await connectDB();


  const date = params.date; 
   

  let appointments;
  if (date) {
    appointments = await Appointment.find({ date:date });
     console.log(appointments);
  } else {
    appointments = await Appointment.find();
  }

  return NextResponse.json(appointments);
}

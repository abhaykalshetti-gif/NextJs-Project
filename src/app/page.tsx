"use client";
import { useEffect, useState } from "react";

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: "", date: "", time: "", description: "" });
  const [message, setMessage] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [finalslots, setFInalSlots] = useState<string[]>([]);

   const fetchAvailableTimeSlots = async (date: string) => {
  
    
    if (!date) return;
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/appointments/${date}`);
      const bookedSlots: string[] = await res.json();
      
      const allSlots = generateTimeSlots();
      const availableSlots = allSlots.filter(
  slot => !bookedSlots.some(booked => booked.time === slot)
);
setFInalSlots(availableSlots);
      
      setForm({ ...form, time: "" }); 
    } catch (err) {
      console.error("Error fetching available slots", err);
    } finally {
      setLoadingSlots(false);
    }
  };
  useEffect(()=>{
     fetchAvailableTimeSlots(form.date);
  },[form.date])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("✅ Appointment Scheduled Successfully!");
      setForm({ name: "", date: "", time: "", description: "" });
    } else {
      setMessage("❌ Error scheduling appointment. Try again.");
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    slots.push("18:00");
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="max-w-lg mx-auto mt-12">
      <div className="bg-white shadow-lg rounded-xl p-8 border">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          📅 Book an Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

     
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Appointment Time
  </label>
  <select
    name="time"
    value={form.time}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none overflow-y-auto max-h-40"
    required
    disabled={!form.date || loadingSlots}
  >
    <option value="">Select Time</option>

    {timeSlots.map((slot) => {
      const isAvailable = finalslots.includes(slot);
      return (
        <option
          key={slot}
          value={slot}
          disabled={!isAvailable}
          className={!isAvailable ? "text-gray-400 line-through" : ""}
        >
          {slot}
        </option>
      );
    })}
  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write a short description (reason for appointment)..."
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Schedule Appointment
          </button>
        </form>

        {message && (
          <p className="mt-5 text-center font-medium text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}

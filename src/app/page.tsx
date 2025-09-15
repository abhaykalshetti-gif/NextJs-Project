"use client";
import { useState } from "react";

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: "", date: "", time: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="max-w-lg mx-auto mt-12">
      <div className="bg-white shadow-lg rounded-xl p-8 border">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          📅 Book an Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
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

          {/* Date */}
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

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Time
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
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

          {/* Submit */}
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

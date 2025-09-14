"use client";
import { useEffect, useState } from "react";

interface Appointment {
  _id?: string;
  name: string;
  date: string;
  time: string;
  createdAt?: string; // new field
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Fetch all appointments
  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then(setAppointments);
  }, []);

  // Delete appointment
  const handleDelete = async (id?: string) => {
    await fetch("/api/appointments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    setAppointments(appointments.filter((a) => a._id !== id));
  };

  // Format createdAt time
  const formatCreatedAt = (createdAt?: string) => {
    if (!createdAt) return "";

    const dateObj = new Date(createdAt);
    const now = new Date();

    const isToday =
      dateObj.getDate() === now.getDate() &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getFullYear() === now.getFullYear();

    if (isToday) {
      // Show time only
      return dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      // Show date only
      return dateObj.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">📋 Admin Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a._id} className="text-center">
              <td className="p-2 border">{a.name}</td>
              <td className="p-2 border">{a.date}</td>
              <td className="p-2 border">{a.time}</td>
              <td className="p-2 border">{formatCreatedAt(a.createdAt)}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(a._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

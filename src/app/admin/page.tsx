"use client";
import { useEffect, useState } from "react";

interface Appointment {
  _id?: string;
  name: string;
  date: string;
  time: string;
  description: string;
  createdAt?: string;
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then(setAppointments);
  }, []);

  const handleDelete = async (id?: string) => {
    await fetch("/api/appointments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    setAppointments(appointments.filter((a) => a._id !== id));
  };

  const formatCreatedAt = (createdAt?: string) => {
    if (!createdAt) return "";

    const dateObj = new Date(createdAt);
    const now = new Date();

    const isToday =
      dateObj.getDate() === now.getDate() &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getFullYear() === now.getFullYear();

    if (isToday) {
      return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
      return dateObj.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📋 Admin Dashboard</h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {appointments.map((a) => (
            <div
              key={a._id}
              className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-blue-700">{a.name}</h2>
                <span className="text-sm text-gray-500">
                  Requested: {formatCreatedAt(a.createdAt)}
                </span>
              </div>

              {/* Details */}
              <p className="text-gray-700">
                📅 <strong>Date:</strong> {a.date}
              </p>
              <p className="text-gray-700">
                ⏰ <strong>Time:</strong> {a.time}
              </p>
              <p className="text-gray-700 mt-2">
                📝 <strong>Description:</strong> {a.description || "No details provided"}
              </p>

              {/* Actions */}
              <button
                onClick={() => handleDelete(a._id)}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                Delete Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

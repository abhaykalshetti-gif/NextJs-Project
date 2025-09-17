"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Book Appointment" },
    { href: "/admin", label: "Admin Dashboard" },
  ];

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="text-xl font-bold tracking-wide">
          🗓️ Scheduler
        </Link>

    
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:text-gray-200 transition ${
                  pathname === item.href ? "font-semibold underline" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

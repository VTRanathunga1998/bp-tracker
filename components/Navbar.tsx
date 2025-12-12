"use client"; // Client component for navigation

import Link from "next/link";
import { Home, BarChart2, Clock, Heart, MoreHorizontal } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 md:hidden">
      {" "}
      {/* Hide on desktop if needed */}
      <Link
        href="/"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <Home size={24} />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        href="/insights"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <BarChart2 size={24} />
        <span className="text-xs">Insights</span>
      </Link>
      <Link
        href="/history"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <Clock size={24} />
        <span className="text-xs">History</span>
      </Link>
      <Link
        href="/primary"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <Heart size={24} />
        <span className="text-xs">Primary</span>
      </Link>
      <Link
        href="/more"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <MoreHorizontal size={24} />
        <span className="text-xs">More</span>
      </Link>
    </nav>
  );
}

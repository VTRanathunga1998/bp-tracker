// app/components/Navbar.tsx  (or wherever you keep it)
"use client"; // Must be client component

import Link from "next/link";
import { usePathname } from "next/navigation"; // ← This detects current page
import { Home, BarChart2, Clock, Heart, MoreHorizontal } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname(); // Gets current URL path

  // Helper to apply active styles
  const getLinkClasses = (href: string) =>
    `flex flex-col items-center transition-colors ${
      pathname === href
        ? "text-blue-600" // Active page: blue
        : "text-gray-600 hover:text-blue-500" // Inactive: gray + hover blue
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 md:hidden">
      <Link href="/" className={getLinkClasses("/")}>
        <Home size={26} strokeWidth={pathname === "/" ? 2.5 : 2} />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link href="/insights" className={getLinkClasses("/insights")}>
        <BarChart2 size={26} strokeWidth={pathname === "/insights" ? 2.5 : 2} />
        <span className="text-xs mt-1">Insights</span>
      </Link>

      <Link href="/history" className={getLinkClasses("/history")}>
        <Clock size={26} strokeWidth={pathname === "/history" ? 2.5 : 2} />
        <span className="text-xs mt-1">History</span>
      </Link>

      <Link href="/primary" className={getLinkClasses("/primary")}>
        <Heart size={26} strokeWidth={pathname === "/primary" ? 2.5 : 2} />
        <span className="text-xs mt-1">Primary</span>
      </Link>

      <Link href="/more" className={getLinkClasses("/more")}>
        <MoreHorizontal
          size={26}
          strokeWidth={pathname === "/more" ? 2.5 : 2}
        />
        <span className="text-xs mt-1">More</span>
      </Link>
    </nav>
  );
}

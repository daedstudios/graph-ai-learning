"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Grid3X3 } from "lucide-react";

const navItems = [
  { href: "/", icon: <Home />, label: "home" },
  { href: "/chat", icon: <MessageSquare />, label: "chat" },
  { href: "/tasks", icon: <Grid3X3 />, label: "tasks" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 bottom-0 w-full md:top-0 md:left-0 md:h-screen md:w-auto bg-background">
      <ul className="flex md:justify-start justify-between mx-auto w-[90%] md:px-4 items-center md:flex-col md:items-center h-full p-5 gap-6">
        {navItems.map(({ href, icon, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex flex-col items-center text-[1rem] ${
                pathname === href ? "text-foreground" : "text-muted-foreground"
              } hover:text-foreground transition`}
            >
              {icon}
              <span className="hidden md:block text-xs mt-1">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

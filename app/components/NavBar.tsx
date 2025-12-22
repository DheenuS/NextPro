"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";

export const publicLinks = [
  { href: "/login?activeTab=login", label: "Login" },
  { href: "/login?activeTab=signup", label: "Signup" },
];

export const privateLinks = [
  { href: "/home", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/learn", label: "Learn" },
  { href: "/profile", label: "Profile" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, userEmail, logout } = useAuth();

  const links = isAuthenticated ? privateLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-50 bg-zinc-50 dark:bg-black border-b font-sans">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href={"/"}>
          <p className="font-bold text-lg">Next JS</p>
        </Link>

        {/* Desktop */}
        <ul className="hidden sm:flex items-center space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}

          {isAuthenticated && (
            <span className="text-md text-muted-foreground">{userEmail}</span>
          )}

          {isAuthenticated && (
            <Button onClick={logout} className="cursor-pointer">
              Logout
            </Button>
          )}
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden p-2">
          ☰
        </button>
      </div>

      {/* Mobile */}
      {isOpen && (
        <div className="sm:hidden bg-gray-100 dark:bg-zinc-900">
          <ul className="flex flex-col px-6 py-4 space-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}

            {isAuthenticated && (
              <button onClick={logout} className="text-left">
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const path = usePathname();

  const showTrigger = path.startsWith("/learn");

  return (
    <nav className="sticky top-0 z-50 bg-zinc-50 dark:bg-black border-b font-sans">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <p className="font-bold text-lg">Next JS</p>
          </Link>
          {showTrigger && <SidebarTrigger />}
        </div>

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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Book, Activity, Settings, BookOpen } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  
  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/courses",
      label: "Courses",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      active: pathname === "/courses" || pathname.startsWith("/courses/"),
    },
    {
      href: "/lectures",
      label: "My Lectures",
      icon: <Book className="mr-2 h-4 w-4" />,
      active: pathname === "/lectures" || pathname.startsWith("/lectures/"),
    },
    {
      href: "/progress",
      label: "Progress",
      icon: <Activity className="mr-2 h-4 w-4" />,
      active: pathname === "/progress",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: pathname === "/settings",
    },
  ];

  return (
    <nav className="flex items-center gap-4 lg:gap-6">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">VidProgress</span>
      </Link>
      <div className="hidden md:flex gap-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
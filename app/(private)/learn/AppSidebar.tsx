"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  LifeBuoy,
  MoreHorizontal,
  Search,
  Send,
  Settings,
  User2,
  Book,
  ShieldCheck,
  GraduationCap,
  BookOpenText,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainItems = [
  { title: "Dashboard", url: "/learn/dashboard", icon: LayoutDashboard },
  { title: "Courses", url: "/learn/courses", icon: Book },
  { title: "Certifications", url: "/learn/certifications", icon: ShieldCheck },
  {
    title: "Your Learnings",
    url: "/learn/your-learnings",
    icon: GraduationCap,
  },
  { title: "Notes", url: "/learn/notes", icon: BookOpenText },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="z-999">
      <SidebarHeader />
      <SidebarContent>
        {/* Main navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-md">
            Welcome to Next JS
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild data-active={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help collapsible */}
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible defaultOpen={pathname.startsWith("/help")} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <span>Help</span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LifeBuoy />
                    <span>Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Send />
                    <span>Feedback</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        {/* Project Collapsible */}
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <span>Project</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuItem>
                  <span>Edit Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer user dropdown */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="group">
                  <User2 />
                  <span>Username</span>
                  <ChevronUp className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[var(--radix-popper-anchor-width)]"
              >
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

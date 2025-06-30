import {
  ChartLine,
  Dumbbell,
  LayoutDashboard,
  MoreVertical,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@gym/ui/components/sidebar";
import { SidebarUser } from "./SidebarUser";
import { auth } from "@gym/trpc/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@gym/ui/components/dropdown-menu";
import type { SidebarItem } from "./types";

const ITEMS: SidebarItem[] = [
  {
    title: "Overview",
    url: "/overview",
    icon: LayoutDashboard,
    section: "MAIN", //ONLY FOR MOBILE
  },
  {
    title: "Record",
    url: "/record",
    icon: ChartLine,
    section: "MAIN", //ONLY FOR MOBILE
  },
  {
    title: "Exercises",
    url: "/exercises",
    icon: Dumbbell,
    section: "MORE", //ONLY FOR MOBILE
  },
];

export const AppSidebar = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden h-full lg:block">
        <Sidebar>
          <SidebarHeader>
            <h1 className="text-center text-2xl">Gym Tracker</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {ITEMS.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarUser
              user={{
                name: session.user.name,
                email: session.user.email,
                avatar: session.user.image,
              }}
            />
          </SidebarFooter>
        </Sidebar>
      </div>
      {/* Mobile bottom nav */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t bg-white shadow lg:hidden">
        {ITEMS.filter((item) => item.section === "MAIN").map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="flex flex-1 flex-col items-center justify-center text-xs text-gray-600 hover:text-black"
          >
            <item.icon className="mb-1 h-6 w-6" />
            {item.title}
          </a>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex flex-1 flex-col items-center justify-center text-xs text-gray-600 hover:text-black focus:outline-none"
              aria-label="More"
              type="button"
            >
              <MoreVertical className="mb-1 h-6 w-6" />
              More
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="end"
            className="mb-2 min-w-56 rounded-lg"
          >
            {ITEMS.filter((item) => item.section === "MORE").map((item) => (
              <DropdownMenuItem
                key={item.title}
                className="flex flex-row items-center gap-3 px-3 py-2 hover:bg-gray-50"
              >
                <a
                  href={item.url}
                  className="flex w-full flex-row items-center gap-3 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </DropdownMenuItem>
            ))}
            <div className="flex h-12 flex-row items-center gap-3 px-3 py-2">
              <SidebarUser
                user={{
                  name: session.user.name,
                  email: session.user.email,
                  avatar: session.user.image,
                }}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
};

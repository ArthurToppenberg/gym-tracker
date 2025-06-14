import { ChartLine, Dumbbell, LayoutDashboard } from "lucide-react";

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
import { useIsMobile } from "@gym/ui/hooks/use-mobile";

const items = [
  {
    title: "Dashboard",
    url: ".",
    icon: LayoutDashboard,
  },
  {
    title: "Track",
    url: ".",
    icon: ChartLine,
  },
  {
    title: "Exercises",
    url: "/exersises",
    icon: Dumbbell,
  },
];

export const AppSidebar = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  // This is a hack to allow useIsMobile in a server component
  // We render both, and hide/show with Tailwind responsive classes

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
                  {items.map((item) => (
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
        {items.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="flex flex-1 flex-col items-center justify-center text-xs text-gray-600 hover:text-black"
          >
            <item.icon className="mb-1 h-6 w-6" />
            {item.title}
          </a>
        ))}
      </nav>
    </>
  );
};

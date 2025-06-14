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

  return (
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
            avatar: session.user.image, // for now just shows the default avatar icon
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

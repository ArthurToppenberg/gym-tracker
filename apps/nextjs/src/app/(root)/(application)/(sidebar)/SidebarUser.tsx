"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gym/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@gym/ui/components/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@gym/ui/components/avatar";
import { CreditCard, MoreVertical, User } from "lucide-react";
import { Bell } from "lucide-react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Skeleton } from "@gym/ui/components/skeleton";

interface User {
  name: string | null | undefined;
  email: string | null | undefined;
  avatar: string | null | undefined;
}

export const SidebarUser = ({ user }: { user: User }) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user.avatar ? (
                  <AvatarImage
                    src={user.avatar ?? undefined}
                    alt={user.name ?? undefined}
                  />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    <User />
                  </AvatarFallback>
                )}
                {!user.avatar && null}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.name ? (
                    user.name
                  ) : (
                    <Skeleton className="inline-block h-4 w-20 align-middle" />
                  )}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email ? (
                    user.email
                  ) : (
                    <Skeleton className="inline-block h-3 w-24 align-middle" />
                  )}
                </span>
              </div>
              <MoreVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user.avatar ? (
                    <AvatarImage
                      src={user.avatar ?? undefined}
                      alt={user.name ?? undefined}
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      <User />
                    </AvatarFallback>
                  )}
                  {!user.avatar && null}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.name ? (
                      user.name
                    ) : (
                      <Skeleton className="inline-block h-4 w-20 align-middle" />
                    )}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email ? (
                      user.email
                    ) : (
                      <Skeleton className="inline-block h-3 w-24 align-middle" />
                    )}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

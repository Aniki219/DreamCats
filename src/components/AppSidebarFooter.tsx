"use client"


import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { doSignOut } from "@/app/lib/actions";
import { ChevronUp, User2 } from "lucide-react";
import { User } from "next-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function AppSidebarFooter({ user }: { user: User }) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <User2 /> {user.name}
                            <ChevronUp className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="top"
                        className="w-[--radix-popper-anchor-width]">
                        <DropdownMenuItem>
                            <span>Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => doSignOut()}>
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
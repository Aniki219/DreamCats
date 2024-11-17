import { Cat, ChevronUp, Coffee, Home, Inbox, LogOut, Search, Settings, Swords, TreeDeciduous, User2 } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { doSignOut } from "@/app/lib/actions"
import AppSidebarFooter from "./AppSidebarFooter"
import { auth } from "@/app/api/auth/[...nextauth]/route"

// Menu items.
const items = [
    {
        title: "Cats",
        url: "/tree/daycare",
        icon: Cat,
    },
    {
        title: "Cafe",
        url: "/tree/cafe",
        icon: Coffee,
    },
    {
        title: "Battle",
        url: "/battle",
        icon: Swords,
    },
    {
        title: "Tree",
        url: "/tree",
        icon: TreeDeciduous,
    },
    {
        title: "Log Out",
        url: "#",
        icon: LogOut,
    },
]

export async function AppSidebar() {
    const session = await auth();
    const user = session?.user;

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Dream Cats</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {user && <AppSidebarFooter user={user} />}
            </SidebarFooter>
        </Sidebar>
    )
}
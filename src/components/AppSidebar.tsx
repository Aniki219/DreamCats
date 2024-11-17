import { Cat, ChevronDown, ChevronUp, Coffee, Egg, Home, Inbox, LogOut, Search, Settings, Swords, TreeDeciduous, User2 } from "lucide-react"

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
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { doSignOut } from "@/app/lib/actions"
import AppSidebarFooter from "./AppSidebarFooter"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useSession } from "next-auth/react"

// Menu items.
const items = [
    {
        title: "Cats",
        url: "/tree/daycare",
        icon: Cat,
    },
    {
        title: "Battle",
        url: "/battle",
        icon: Swords,
    },
]

const treeItems = [
    {
        title: "Daycare",
        url: "/tree/daycare",
        icon: Home,
    },
    {
        title: "Cafe",
        url: "/tree/cafe",
        icon: Coffee,
    },
    {
        title: "Hatchery",
        url: "/tree/hatchery",
        icon: Egg,
    },
]

export async function AppSidebar() {
    const session = await auth();
    const user = session!.user;

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
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <TreeDeciduous />
                                        Tree
                                        <SidebarGroupLabel asChild>
                                            <CollapsibleTrigger>
                                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </CollapsibleTrigger>
                                        </SidebarGroupLabel>
                                    </SidebarMenuButton>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {treeItems.map((item) => (
                                                <SidebarMenuSubItem key={item.title}>
                                                    <SidebarMenuButton asChild>
                                                        <Link href={item.url}>
                                                            <item.icon />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
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
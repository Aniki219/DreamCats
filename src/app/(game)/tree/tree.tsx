"use client"
import { doSignOut } from "@/app/lib/actions";
import { RelativeLink } from "@/app/ui/RelativeLink";
import { getUserByEmail } from "@/services/userService";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserTree() {
    return (
        <>
            <h2>Welcome to the tree</h2>
            <p>Select a destination to explore</p>
            <ul>
                <li><RelativeLink href="/daycare">Daycare</RelativeLink></li>
                <li><RelativeLink href="/cafe">Cafe</RelativeLink></li>
                <li><RelativeLink href="/hatchery">Hatchery</RelativeLink></li>
                <li><Link href="battle">Battle</Link></li>
                <li><Link href="api/cats">Cats Index</Link></li>
            </ul>
            <button onClick={() => doSignOut()}>Sign Out</button>
        </>
    )
}

"use client"
import { signOut } from "@/app/api/auth/[...nextauth]/route";
import { RelativeLink } from "@/app/components/RelativeLink";
import { doSignOut } from "@/app/lib/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Tree() {
    const pathname = usePathname();

    return (
        <>
            <h2>Welcome to the tree</h2>
            <p>Select a destination to explore</p>
            <ul>
                <li><RelativeLink href="/daycare">Daycare</RelativeLink></li>
                <li><RelativeLink href="/cafe">Cafe</RelativeLink></li>
                <li><Link href="battle">Battle</Link></li>
                <li><Link href="api/cats">Cats Index</Link></li>
            </ul>
            <button onClick={() => doSignOut()}>Sign Out</button>
        </>
    )
}
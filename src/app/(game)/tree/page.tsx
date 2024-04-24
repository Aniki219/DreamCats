"use client"
import { signOut } from "@/app/api/auth/[...nextauth]/route";
import { doSignOut } from "@/app/lib/actions";
import Link from "next/link";

export default function Tree() {

    return (
        <>
            <h2>Welcome to the tree</h2>
            <p>Select a destination to explore</p>
            <ul>
                <li><Link href="daycare">Daycare</Link></li>
                <li><Link href="cafe">Cafe</Link></li>
                <li><Link href="battle">Battle</Link></li>
                <li><Link href="cats">Cats Index</Link></li>
            </ul>
            <button onClick={() => doSignOut()}>Sign Out</button>
        </>
    )
}
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
        </>
    )
}

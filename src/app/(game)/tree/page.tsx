"use server"
import { useSession } from "next-auth/react";
import UserTree from "./tree";
import { getTreeByUserId, getUserByEmail } from "@/services/userService";
import { useState } from "react";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";


export default async function Tree() {
    const session = await auth();

    if (session?.user?.email) {
        const user = await getUserByEmail(session.user.email);
        if (!user) return (
            <p>no user</p>
        )
        const tree = await getTreeByUserId(user.id);

        if (!tree) {
            return (
                <>
                    <h2>It looks like you don't belong to any tree</h2>
                    <button>Create a New tree</button>
                </>
            )
        }

        return (
            <>
                {/* <p>{user.username}</p> */}
                <p>{tree.name}</p>
                <UserTree />
            </>
        )
    }
    return (
        <>
            <p>Please sign in to access this page.</p>
            <Link href="login">Go to sign in page</Link>
        </>
    )
}
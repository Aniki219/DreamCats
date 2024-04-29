import { UserMinimum } from "@/app/lib/definitions";
import { createUser, findTreeByUserId, findUserByEmail, findUserById, findUserByUsername } from "@/repos/userRepo";
import { Tree, User } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod"

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await findUserByEmail(email);
    return user;
}

export async function getUserByUsername(username: string): Promise<User | null> {
    const user = await findUserByUsername(username);
    return user;
}

export async function getUserById(id: string): Promise<User | null> {
    const user = await findUserById(id);
    return user;
}

export async function saveUser(newUser:UserMinimum) {
    if(!newUser.username) {
        throw new NextResponse('Missing Field: Username', { status: 400 })
    } else {
        const existingUser = await getUserByUsername(newUser.username);
        if (existingUser) {
            throw new NextResponse('Username Taken', { status: 400 });
        }
    }

    if(!newUser.email) {
        throw new NextResponse('Missing Field: Email', { status: 400 })
    } else if (!z.object({email: z.string().email()}).safeParse(newUser).success) {
        throw new NextResponse('Invalid Email', { status: 400 })
    } else {
        const existingUser = await getUserByEmail(newUser.email);
        if (existingUser) {
            throw new NextResponse('Email already associated with an existing account', { status: 400 });
        }
    }

    if (!newUser.password) {
        throw new NextResponse('Missing Field: Password', { status: 400 })
    } 

    return await createUser(newUser);
}

export async function getTreeByUserId(userId: string): Promise<Tree | null> {
    const tree = await findTreeByUserId(userId);
    return tree;
}
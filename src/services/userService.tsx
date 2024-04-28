import { Tree, User } from "@/app/lib/definitions";
import { createUser, findTreeByUserId, findUserByEmail, findUserById, findUserByUsername } from "@/repos/userRepo";
import { NextResponse } from "next/server";

export async function getUserByEmail(email: string): Promise<User> {
    const user = await findUserByEmail(email);
    return user;
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
    const user = await findUserByUsername(username);
    return user;
}

export async function getUserById(id: string): Promise<User | undefined> {
    const user = await findUserById(id);
    return user;
}

export async function saveUser(newUser:User) {
    if(!newUser.username) {
        throw new NextResponse('Missing Field: Username', { status: 400 })
    } else {
        const existingUser = await getUserByUsername(newUser.username);
        if (existingUser !== undefined) {
            throw new NextResponse('Username Taken', { status: 400 });
        }
    }

    if(!newUser.email) {
        throw new NextResponse('Missing Field: Email', { status: 400 })
    } else {
        const existingUser = await getUserByEmail(newUser.email);
        if (existingUser !== undefined) {
            throw new NextResponse('Email already associated with an existing account', { status: 400 });
        }
    }

    if (!newUser.password) {
        throw new NextResponse('Missing Field: Password', { status: 400 })
    } 

    return await createUser(newUser);
}

export async function getTreeByUserId(userId: string): Promise<Tree> {
    const tree = await findTreeByUserId(userId);
    return tree;
}
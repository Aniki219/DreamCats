import { UserMinimum } from "@/app/lib/definitions";
import { NextResponse } from "next/server";
import { z } from "zod"
import { PrismaClient, User, Tree, Role, Prisma } from "@prisma/client";
import email from "next-auth/providers/email";

const prisma = new PrismaClient()

export async function getUsers() {
    try {
        const user = prisma.user.findMany();
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const user = prisma.user.findUnique({
            where: { email: email }
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserByUsername(username: string): Promise<User | null> {
    try {
        const user = prisma.user.findUnique({
            where: { username: username }
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserById(id: string): Promise<User | null> {
    try {
        const user = prisma.user.findUnique({
            where: { id: id }
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user.');
    }
}

export async function saveUser(newUser: Prisma.UserUncheckedCreateInput) {
    if (!newUser.username) {
        throw new NextResponse('Missing Field: Username', { status: 400 })
    } else {
        const existingUser = await getUserByUsername(newUser.username);
        if (existingUser) {
            throw new NextResponse('Username Taken', { status: 400 });
        }
    }

    if (!newUser.email) {
        throw new NextResponse('Missing Field: Email', { status: 400 })
    } else if (!z.object({ email: z.string().email() }).safeParse(newUser).success) {
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

    try {
        const user = prisma.user.create({
            data: {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                tree: {
                    create: {
                        name: newUser.username + "'s tree",
                    }
                },
                roles: newUser.roles || [Role.USER],
            }
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create user.');
    }
}

export async function getTreeByUserId(userId: string): Promise<Tree | null> {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                tree: true
            }
        }) as { tree: Tree }
        return data.tree;
    } catch (error) {
        console.log(error);
        throw new Error('No Tree Found for user: ' + userId);
    }
}

export async function getTreeByUserName(username: string): Promise<Tree | null> {
    try {
        const data = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                tree: true
            }
        }) as { tree: Tree }
        return data.tree;
    } catch (error) {
        console.log(error);
        throw new Error('No Tree Found for username: ' + username);
    }
}
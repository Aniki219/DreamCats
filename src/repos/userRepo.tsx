import { UserMinimum } from "@/app/lib/definitions";
import { PrismaClient, User, Tree, Role } from "@prisma/client";
import email from "next-auth/providers/email";



const prisma = new PrismaClient()

export async function findUserById(id:string) {
    try {
        const user = prisma.user.findUnique({
            where: {id: id}
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user.');
    }
}

export async function findUserByEmail(email:string) {
    try {
        const user = prisma.user.findUnique({
            where: {email: email}
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user.');
    }
}

export async function findUserByUsername(username:string) {
    try {
        const user = prisma.user.findUnique({
            where: {username: username}
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user.');
    }
}

export async function createUser(minUser:UserMinimum) {
    try {
        const user = prisma.user.create({
            data: {
                ...minUser,
                tree: {
                    create: {
                        name: minUser.username +"'s tree",
                    }
                },
                roles: [Role.USER]
            }
        })
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create user.');
    }
}

export async function findTreeByUserId(userId:string) {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                tree: true
            }
        }) as {tree:Tree}
        return data.tree;
    } catch (error) {
        console.log(error);
        throw new Error('No Tree Found for user: ' + userId);
    }
}
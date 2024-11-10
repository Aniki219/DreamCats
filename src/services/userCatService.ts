import { Cat, Prisma, PrismaClient, User, UserCat } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUserCat({ user, cat, name }: { user: User, cat: Cat, name?: string }) {
    try {
        const newUserCat = prisma.userCat.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                },
                cat: {
                    connect: {
                        id: cat.id
                    }
                },
                name: name || cat.species,
            }
        })
        return newUserCat;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create UserCat")
    }
}
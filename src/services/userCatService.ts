import { Cat, Prisma, PrismaClient, User, UserCat } from "@prisma/client";
import { getUserById } from "./userService";
import { getCatById } from "./catService";

const prisma = new PrismaClient();

export async function createUserCat(user: User, cat: Cat, name = null) {
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
        });

        if (newUserCat) return newUserCat;
        throw new Error(`No UserCat was created for userId: ${user.id}, catId: ${cat.id}`);
    } catch (error) {
        throw new Error(`Failed to create UserCat: ${error}`);
    }
}
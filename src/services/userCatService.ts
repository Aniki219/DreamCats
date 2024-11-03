import { Cat, Prisma, PrismaClient, User, UserCat } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUserCat(input: Prisma.UserCatUncheckedCreateInput) {
    try {
        const newUserCat = prisma.userCat.create({
            data: {
                user: {
                    connect: {
                        id: input.userId
                    }
                },
                cat: {
                    connect: {
                        id: input.catId
                    }
                },
                name: input.name,
            }
        })
        return newUserCat;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create UserCat")
    }
}
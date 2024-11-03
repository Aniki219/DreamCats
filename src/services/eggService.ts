import { Nest, PrismaClient, UserCat, Prisma, Egg } from "@prisma/client";

const prisma = new PrismaClient()

export async function createEgg(data: Prisma.EggUncheckedCreateInput): Promise<Egg> {
    try {
        const newEgg: Egg = await prisma.egg.create({
            data: {
                parent: {
                    connect: {
                        userCatId: {
                            userId: data.parentUserId,
                            catId: data.parentCatId
                        }
                    }
                }
            }
        }) as Egg;
        return newEgg;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create egg.');
    }
}

export async function getEgg(id: string): Promise<Egg> {
    try {
        const egg: Egg = await prisma.egg.findUnique({
            where: {
                id: id
            }
        }) as Egg;

        return egg;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch egg.');
    }
}

export async function getEggsByUserId(userId: string): Promise<Egg[]> {
    try {
        const eggs: Egg[] = await prisma.egg.findMany({
            where: {
                parentUserId: userId
            }
        }) as Egg[];

        return eggs;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch egg.');
    }
}

export async function deleteEgg(id: string): Promise<void> {
    try {
        await prisma.egg.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch egg.');
    }
}
import { Nest, PrismaClient, UserCat, Prisma, Egg, Hatchery } from "@prisma/client";

const prisma = new PrismaClient();

export async function createHatchery(treeId: string): Promise<Hatchery> {
    try {
        const hatchery: Hatchery = await prisma.hatchery.create({
            data: {
                tree: {
                    connect: {
                        id: treeId
                    }
                },
                nests: {
                    create: [
                        {}
                    ]
                }
            }
        }) as Hatchery;
        return hatchery;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to create Hatchery!`);
    }
}
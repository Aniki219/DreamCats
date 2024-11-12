import { Nest, PrismaClient, UserCat, Prisma, Egg, Hatchery, User } from "@prisma/client";

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

export async function getHatcheryByTreeId(treeId: string): Promise<Hatchery | null> {
    try {
        const hatchery = await prisma.hatchery.findUnique({
            where: {
                treeId: treeId
            }
        })

        return hatchery;
    } catch (error) {
        console.log(error);
        throw Error(`Error getting hatchery for tree with id ${treeId}!`);
    }
}

export async function getHatcheryByUser(user: User): Promise<Hatchery | null> {
    try {
        if (!user || !user.id) {
            throw Error("Invalid user");
        }

        const tree = await prisma.tree.findUnique({
            where: {
                id: user.treeId!
            }
        });

        if (!tree) {
            throw Error(`No tree found for user with id: ${user.id}`);
        }
        const hatchery = await prisma.hatchery.findUnique({
            where: {
                treeId: tree.id
            }
        })

        return hatchery;
    } catch (error) {
        console.log(error);
        throw Error(`Error getting hatchery for user with id ${user.id}!`);
    }
}
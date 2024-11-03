import { Nest, PrismaClient, UserCat, Prisma, Egg } from "@prisma/client";

const prisma = new PrismaClient();

export async function createNest(hatcheryId: string): Promise<Nest> {
    try {
        const nest: Nest = await prisma.nest.create({
            data: {
                hatchery: {
                    connect: {
                        id: hatcheryId
                    }
                }
            }
        }) as Nest;

        return nest;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to create Nest for Hatchery: ${hatcheryId}!`);
    }
}

export async function getNestById(nestId: string) {
    try {
        const nest: Nest = await prisma.nest.findUnique({
            where: {
                id: nestId
            }
        }) as Nest;
        return nest;
    } catch (error) {
        console.log(error);
        throw new Error(`Could not find Nest with id ${nestId}!`);
    }
}

export async function getNestsByHatcheryId(hatcheryId: string) {
    try {
        const nests: Nest[] = await prisma.nest.findMany({
            where: {
                hatcheryId: hatcheryId
            }
        }) as Nest[];
        return nests;
    } catch (error) {
        console.log(error);
        throw new Error(`Could not find Nests from Hatchery with id ${hatcheryId}!`);
    }
}

export async function addEggToNest(nestId: string, eggId: string): Promise<Nest> {
    try {
        const nest: Nest = await prisma.nest.update({
            where: {
                id: nestId
            },
            data: {
                egg: {
                    connect: {
                        id: eggId
                    }
                }
            }
        }) as Nest;

        return nest;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to add Egg with id: ${eggId} to Nest with id: ${nestId}!`);
    }
}

export async function removeEggFromNest(nestId: string): Promise<Nest> {
    try {
        const nest: Nest = await prisma.nest.update({
            where: {
                id: nestId
            },
            data: {
                egg: {
                    disconnect: true
                }
            }
        }) as Nest;

        return nest;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to remove Egg from Nest with id ${nestId}!`);
    }
}

export async function addHatcherToNest(nestId: string, hatcher: UserCat): Promise<Nest> {
    try {
        const nest: Nest = await prisma.nest.update({
            where: {
                id: nestId
            },
            data: {
                hatcher: {
                    connect: {
                        userCatId: {
                            userId: hatcher.userId,
                            catId: hatcher.catId
                        }
                    }
                }
            }
        }) as Nest;

        return nest;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to add Hatcher (UserCat) with userId: ${hatcher.userId}
            and catId: ${hatcher.catId} to Nest with id: ${nestId}!`);
    }
}

export async function removeHatcherFromNest(nestId: string): Promise<Nest> {
    try {
        const nest: Nest = await prisma.nest.update({
            where: {
                id: nestId
            },
            data: {
                hatcher: {
                    disconnect: true
                }
            }
        }) as Nest;

        return nest;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to remove Hatcher from Nest with id ${nestId}!`);
    }
}
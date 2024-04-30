import { PrismaClient, Cat } from "@prisma/client";

const prisma = new PrismaClient()

export async function findCats() {
    try {
        const cats = prisma.cat.findMany()
        return cats;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch cat.');
    }
}

export async function findCatById(id:string) {
    try {
        const cat = prisma.cat.findUnique({
            where: {id: id}
        })
        return cat;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch cat.');
    }
}

export async function findCatByType(type:string) {
    try {
        const cat = prisma.cat.findUnique({
            where: {type: type}
        })
        return cat;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch cat.');
    }
}
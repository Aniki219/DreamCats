import { PrismaClient, Cat } from "@prisma/client";

const prisma = new PrismaClient()

export async function findTrees() {
    try {
        const trees = prisma.tree.findMany()
        return trees;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch trees.');
    }
}

export async function findTreeById(id:string) {
    try {
        const tree = prisma.tree.findUnique({
            where: {id: id}
        })
        return tree;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch tree.');
    }
}
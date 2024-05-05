import { findTreeById, findTrees } from "@/repos/treeRepo";

export async function getTreeById(id: string) {
    const user = await findTreeById(id);
    return user;
}

export async function getTrees() {
    const user = await findTrees();
    return user;
}
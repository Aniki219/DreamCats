export type UserMinimum = {
    username: string;
    email: string;
    password: string;
};

export type CatMinimum = {
    type: string;
    strength: number;
    defense: number;
    magicDefense: number;
    intelligence: number;
    speed: number;
    health: number;
    mana: number;
};

// export type Tree = {
//     treeId: string,
//     name: string,
//     hasGarden: boolean
// }

export type EntitySearchObject = {
    id?: string,
    email?: string,
    type?: string,
}
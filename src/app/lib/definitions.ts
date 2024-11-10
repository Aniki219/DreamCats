export type UserMinimum = {
    username: string;
    email: string;
    password: string;
};

export type CatMinimum = {
    species: string;
    strength: string;
    defense: string;
    magicDefense: string;
    intelligence: string;
    speed: string;
    health: string;
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
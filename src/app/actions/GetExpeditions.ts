"use server"

import fs from 'fs/promises'
import YAML from 'yaml'

export type Enemy = {
    name : string,
    hp : number
}

export type Expedition = {
    name : string,
    description : string,
    maxCats : number,
    enemies : Enemy[],
}

export default async function GetExpeditions() {
    const itemsRaw = await fs.readFile("src/data/Expeditions.yaml", 'utf-8')
    const items : Expedition[] = YAML.parse(itemsRaw)

    return items;
}
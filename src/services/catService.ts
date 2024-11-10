import { NextResponse } from "next/server";
import { PrismaClient, Cat, Prisma } from "@prisma/client";
import { CatMinimum, EntitySearchObject } from "@/app/lib/definitions";
import { getAuthToken, getSpreadSheetValues } from "./googleSheetsService";

const prisma = new PrismaClient()

export async function getCats(): Promise<Cat[]> {
    try {
        const cats = await prisma.cat.findMany() as Cat[];
        return cats;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch cat.');
    }
}

export async function getCatById(id: string) {
    try {
        const cat = prisma.cat.findUnique({
            where: { id: id }
        })
        return cat;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch cat.');
    }
}

export async function getCatBySpecies(species: string) {
    try {
        const cat = prisma.cat.findUnique({
            where: { species: species }
        })
        return cat;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch cat.');
    }
}

export async function createCat(data: CatMinimum): Promise<Cat> {
    try {
        const cat: Cat = await prisma.cat.upsert({
            where: {
                species: data.species,
            },
            update: {
                strength: data.strength,
                defense: data.defense,
                magicDefense: data.magicDefense,
                intelligence: data.intelligence,
                speed: data.speed,
                health: data.health,
            },
            create: {
                species: data.species,
                strength: data.strength,
                defense: data.defense,
                magicDefense: data.magicDefense,
                intelligence: data.intelligence,
                speed: data.speed,
                health: data.health,
            },
        }) as Cat;
        return cat;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to upsert cat");
    }
}

export async function getCatGoogleSheetData() {
    const spreadsheetId = process.env.CAT_DATA_SS_ID as string;
    const sheetName = "CatData";

    async function testGetSpreadSheetValues() {
        try {
            const auth = await getAuthToken();
            const response = await getSpreadSheetValues({
                spreadsheetId,
                sheetName,
                auth
            })
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    const rawSheetRowValues = await testGetSpreadSheetValues();

    const catsTableRows = rawSheetRowValues?.values as string[][];
    const headers = catsTableRows[0];
    const records =
        catsTableRows
            .slice(1)
            .filter(row => row[0]);

    const catDataMaps = records.map((record, i) => {
        const cat = new Map<string, string | number>()
        for (let col = 0; col < record.length; col++) {
            const header = headers[col].toLowerCase();
            const value = record[col];
            cat.set(header, value);
        }
        return cat;
    })

    const cats = catDataMaps.map(data => {
        return {
            species: data.get("species") as string,
            strength: data.get("strength") as string,
            defense: data.get("defense") as string,
            intelligence: data.get("intelligence") as string,
            magicDefense: data.get("magic resist") as string,
            health: data.get("health") as string,
            speed: data.get("speed") as string,
            attributes: data.get("attributes"),
        } as Prisma.CatCreateManyInput
    })

    return cats;
}
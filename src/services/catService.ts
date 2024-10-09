import { NextResponse } from "next/server";
import { PrismaClient, Cat } from "@prisma/client";
import { CatMinimum, EntitySearchObject } from "@/app/lib/definitions";
import { getAuthToken, getSpreadSheetValues } from "./googleSheetsService";

const prisma = new PrismaClient()

export async function getCats() {
    try {
        const cats = prisma.cat.findMany()
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

export async function upsertCat(cat: CatMinimum) {
    try {
        const upsertCat = await prisma.cat.upsert({
            where: {
                species: cat.species,
            },
            update: {
                strength: cat.strength,
                defense: cat.defense,
                magicDefense: cat.magicDefense,
                intelligence: cat.intelligence,
                speed: cat.speed,
                health: cat.health,
                mana: cat.mana,
            },
            create: {
                species: cat.species,
                strength: cat.strength,
                defense: cat.defense,
                magicDefense: cat.magicDefense,
                intelligence: cat.intelligence,
                speed: cat.speed,
                health: cat.health,
                mana: cat.mana,
            },
        })
        return upsertCat;
    } catch (e) {
        console.log(e);
        throw new Error("Failed to upsert cat");
    }
}

export async function getCatGoogleSheetData() {
    const spreadsheetId = process.env.CAT_DATA_SS_ID as string;
    const sheetName = "Sheet1";

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
            strength: parseInt(data.get("strength") as string),
            defense: parseInt(data.get("defense") as string),
            intelligence: parseInt(data.get("intelligence") as string),
            magicDefense: parseInt(data.get("magic resist") as string),
            health: parseInt(data.get("health") as string),
            mana: parseInt(data.get("mana") as string),
            speed: parseInt(data.get("speed") as string),
        } as CatMinimum
    })

    return cats;
}
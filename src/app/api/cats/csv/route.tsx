import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

import { getAuthToken, getSpreadSheet, getSpreadSheetValues } from '@/services/googleSheetsService'
import { CatData } from '@/components/Cat';
import { CatMinimum } from '@/app/lib/definitions';
import { getCats, createCat } from '@/services/catService';

export async function GET(
    req: NextApiRequest,
    context: { params: { id: string } }
) {
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
    const records = catsTableRows.slice(1);

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
            type: data.get("type") as string,
            strength: parseInt(data.get("strength") as string),
            defense: parseInt(data.get("defense") as string),
            intelligence: parseInt(data.get("intelligence") as string),
            magicDefense: parseInt(data.get("magic resist") as string),
            health: parseInt(data.get("health") as string),
            mana: parseInt(data.get("mana") as string),
            speed: parseInt(data.get("speed") as string),
        } as CatMinimum
    })

    return NextResponse.json(cats);
}
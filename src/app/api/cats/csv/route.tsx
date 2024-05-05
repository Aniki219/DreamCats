import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

import { getAuthToken, getSpreadSheet, getSpreadSheetValues } from '@/services/googleSheetsService'

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
    const values = await testGetSpreadSheetValues();

    return NextResponse.json({ data: values?.values });
}
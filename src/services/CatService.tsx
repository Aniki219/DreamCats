import { CatData } from "@/models/Cat";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function fetchCats() {
    try {
        const data = await sql<CatData>`SELECT * FROM cats;`;
        return data.rows;
    } catch(e) {
        console.log(new NextResponse('Internal Error' + e));
    }
}

export async function fetchCatById(id:string):Promise<CatData> {
    try {
        const data = await sql<CatData>`SELECT * FROM cats WHERE id=${id};`;
        return data.rows[0];
    } catch(e) {
        console.log('Database Error:' + e);
        throw new NextResponse(`No cat found with id: ${id}`, {status: 404});
    }
}
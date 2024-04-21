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

export async function fetchCatById(id:string) {
    try {
        const data = await sql<CatData>`SELECT * FROM cats WHERE id=${id};`;
        if (!data.rows[0]) {
            throw new NextResponse(`No cat found with id: ${id}`, {status: 404});
        }
        return data.rows[0];
    } catch(e) {
        console.log('Internal Error:' + e);
    }
}
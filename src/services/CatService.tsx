import { CatData } from "@/models/Cat";
import { sql } from "@vercel/postgres";

export async function fetchCats() {
    try {
        const data = await sql<CatData>`SELECT * FROM cats;`;
        return data.rows;
    } catch(e) {
        throw e;
    }
}
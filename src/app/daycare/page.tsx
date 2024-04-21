import Link from "next/link"
import { sql } from "@vercel/postgres"
import { CatData } from "@/models/Cat";

export async function fetchCats() {
    try {
        const data = await sql<CatData>`SELECT * FROM cats;`;
        return data.rows;
    } catch(e) {
        console.error(e);
    }
}

export default async function DayCare() {
    const cats = await fetchCats();

    if (!cats) {
        return (
            <p>
                Fetching Cats List...
            </p>
        )
    }
    
    return (
        <div>
            <h2>Daycare</h2>
            <p>Select a Cat to adopt</p>
            {cats.map((cat) => (
                <p>{cat.name}</p>
            ))}
            <p>Choose one</p>

            <Link href="./tree">Return to the Tree</Link>
        </div>
    )
}
import Link from "next/link"
import { sql } from "@vercel/postgres"
import { CatData } from "@/models/Cat";
import { fetchCats } from "@/services/CatService";

export default async function CatsIndex() {
    const cats = await fetchCats();
    
    if (!cats) {
        return (
            <>
            <h2>Cats Index</h2>
            <p>
                Fetching Cats List...
            </p>
            </>
        )
    } else {
        return (
            <>
            <h2>Cats Index</h2>
            <ul>
                {cats.map((cat) => (
                    <li>
                        <Link href={`cats/${cat.id}`}>{cat.name}</Link>
                    </li>
                ))}
            </ul>
            <Link href={`tree`}>Return to Tree</Link>
            </>
        )
    }
}
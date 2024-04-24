import Link from "next/link"
import { sql } from "@vercel/postgres"
import { CatData } from "@/components/Cat";
import { fetchCats } from "@/services/CatService";



export default async function DayCare() {
    const cats = await fetchCats();

    const catsList = () => {
        if (!cats) {
            return (
                <p>
                    Fetching Cats List...
                </p>
            )
        } else {
            return (
                <ul>
                    {cats.map((cat) => (
                        <li>{cat.name}</li>
                    ))}
                </ul>
            )
        }
    }
    
    return (
        <div>
            <h2>Daycare</h2>
            <p>Select a Cat to adopt</p>
            {catsList()}
            <p>Choose one</p>

            <Link href="./tree">Return to the Tree</Link>
        </div>
    )
}
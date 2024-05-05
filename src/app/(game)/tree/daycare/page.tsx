import Link from "next/link"
import { sql } from "@vercel/postgres"
import { CatData } from "@/components/Cat";
import { getCats } from "@/services/catService";



export default async function DayCare() {
    const cats = await getCats();

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
                        <li>{cat.type}</li>
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

            <Link href="../tree">Return to the Tree</Link>
        </div>
    )
}
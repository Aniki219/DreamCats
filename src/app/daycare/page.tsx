import Link from "next/link"
import { CatData } from "@/models/Cat";
import axios from "axios";
import getUrl from "../lib/utils/getUrl";

const getCats = async () => {
    const {data} = await axios.get(getUrl(`/api/cats`), {method:"GET"});
    return data;
}

export default async function DayCare() {
    const {cats} = await getCats();

    const catsList = () => {
        if (!cats) {
            return (
                <p>
                    Fetching Cats List...
                </p>
            )
        } else {
            console.log(cats);
            return (
                <ul>
                    {cats.map((cat:CatData, i:number) => (
                        <li key={i}>
                            <button>{cat.name}</button>
                        </li>
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
import Link from "next/link"
import { sql } from "@vercel/postgres"
import { CatData } from "@/components/Cat";
import { getCats } from "@/services/catService";
import CatCarousel from "@/app/components/CatCarousel";

export default async function CatsIndex() {
    const cats = await getCats();

    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    const catImages:{url:string}[] = await response.json();

    if (!cats || !catImages) {
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
            <CatCarousel catList={cats} catImages={catImages}/>
            <Link href={`../tree`}>Return to Tree</Link>
            </>
        )
    }
}
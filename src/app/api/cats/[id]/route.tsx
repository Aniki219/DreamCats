import Link from "next/link"
import { sql } from "@vercel/postgres"
import { CatData } from "@/components/Cat";
import { fetchCatById } from "@/services/CatService";


export default async ({params} : {params: {id:string}}) => {
    const cat = await fetchCatById(params.id);

    if (!cat) {
        return (
            <p>
                Fetching Cat...
            </p>
        )
    } else {
        return (
            <>
            <h2>{cat.name}</h2>
            <Link href={'../cats'}>Back to Index</Link>
            </>
        )
    }
    
}
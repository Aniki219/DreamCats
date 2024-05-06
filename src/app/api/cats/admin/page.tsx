import { CatMinimum } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import { getCatGoogleSheetData, getCats, upsertCat } from "@/services/catService";
import CatTable from "./CatTable";

export default async function CatsIndex() {
    const newCats = await getCatGoogleSheetData();
    const oldCats = await getCats();

    const oldCatsMinimum = oldCats.map(oldCat => {
        return { ...oldCat } as CatMinimum
    });

    return (
        <>
            <CatTable newCats={newCats} oldCats={oldCatsMinimum} />
        </>
    )

}
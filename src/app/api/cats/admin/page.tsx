import { CatMinimum } from "@/app/lib/definitions";
import { getCatGoogleSheetData, getCats } from "@/services/catService";
import CatDiffsTable from "./CatDiffsTable";

export default async function CatsIndex() {
    const newCats = await getCatGoogleSheetData();
    const oldCats = await getCats();

    console.log(newCats);
    console.log(oldCats);


    const typesToNewCatMinimums = new Map<string, CatMinimum>(
        newCats.map(cat => {
            return [cat.species, cat]
        })
    );

    const typesToOldCatMinimums = new Map<string, CatMinimum>(
        oldCats.map(cat => {
            return [cat.species, cat]
        })
    );

    return (
        <>
            <CatDiffsTable old={typesToOldCatMinimums} new={typesToNewCatMinimums} />
        </>
    )

}
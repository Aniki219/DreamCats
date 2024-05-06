"use client"
import { upsertCats } from "@/app/lib/actions";
import { CatMinimum } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import { upsertCat } from "@/services/catService";
import { useState } from "react";

export default function CatTable({ newCats, oldCats }: { newCats: CatMinimum[], oldCats: CatMinimum[] }) {
    const [pending, setPending] = useState(false);

    function callServerAction() {
        setPending(true);
        upsertCats(newCats).then(data => {
            setPending(false);
        });
    }

    const getStatDiff = (newStat: number, oldStat: number) => {
        const val = newStat - oldStat;
        if (val === 0) {
            return <>{newStat}</>;
        }
        const clr = val > 0 ? "green" : "red";
        const sign = val > 0 ? "+" : "-";
        return (<>
            {newStat}{" ("}<span style={{ color: clr }}>{`${sign}${Math.abs(val)}`}</span>{")"}
        </>)
    }

    return (
        <>
            <table>
                <thead>
                    <tr key={"header"}>
                        <th key={200}>Type</th>
                        <th key={210}>Health</th>
                        <th key={220}>Mana</th>
                        <th key={230}>Strength</th>
                        <th key={240}>Defense</th>
                        <th key={250}>Intelligence</th>
                        <th key={260}>Magic Resist</th>
                        <th key={270}>Speed</th>
                    </tr>
                </thead>
                <tbody>
                    {newCats.map((newCat, i) => {
                        const k = i * 10;
                        const oldCat = oldCats[i];
                        return (
                            <tr key={`row-${i + 1}`}>
                                <td key={`data-${k + 0}`}>{newCat.type}</td>
                                <td key={`data-${k + 1}`}>{getStatDiff(newCat.health, oldCat.health)}</td>
                                <td key={`data-${k + 2}`}>{getStatDiff(newCat.mana, oldCat.mana)}</td>
                                <td key={`data-${k + 3}`}>{getStatDiff(newCat.strength, oldCat.strength)}</td>
                                <td key={`data-${k + 4}`}>{getStatDiff(newCat.defense, oldCat.defense)}</td>
                                <td key={`data-${k + 5}`}>{getStatDiff(newCat.intelligence, oldCat.intelligence)}</td>
                                <td key={`data-${k + 6}`}>{getStatDiff(newCat.magicDefense, oldCat.magicDefense)}</td>
                                <td key={`data-${k + 7}`}>{getStatDiff(newCat.speed, oldCat.speed)}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>

            <Button onClick={callServerAction} disabled={pending}>Update Cat Database</Button>
        </>
    )
}
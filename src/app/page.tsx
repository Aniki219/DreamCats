"use client"

import Image from "next/image";
import { useState } from "react";
import NavArrow from "./components/game/NavArrow";
import { Direction } from "@/types/NavArrowOrientation";

export default function Home() {
    const [treeIndex, setTreeIndex] = useState(1);

  return (
    <div className="game-window">
        <Image 
            src={`/tree${treeIndex}.png`}
            alt={`Tree floor ${treeIndex}`}
            width={800}
            height={600}
            draggable="false"
        />
        {getNavArrows(treeIndex, setTreeIndex)}
    </div>
  );
}

function getNavArrows(treeIndex : number, setTreeIndex : (i : number) => void) {
     switch(treeIndex) {
        case 0: //Outside
            return (
                <div>
                    <NavArrow onClick={setTreeIndex} toIndex={1} top={400} left={380} orientation={Direction.UP}/>
                </div>
            )
        case 1: //Quest hub
            return (
                <div>
                    <NavArrow onClick={setTreeIndex} toIndex={2} top={320} left={7} orientation={Direction.LEFT}/>
                    <NavArrow onClick={setTreeIndex} toIndex={3} top={10} left={540} orientation={Direction.UP}/>
                    <NavArrow onClick={setTreeIndex} toIndex={0} top={523} left={367} orientation={Direction.DOWN}/>
                </div>
            )
        case 2: //Kitchen
            return (
                <div>
                    <NavArrow onClick={setTreeIndex} toIndex={1} top={320} left={700} orientation={Direction.RIGHT}/>
                </div>
            )
        case 3: //Mid section
            return (
                <div>
                    <NavArrow onClick={setTreeIndex} toIndex={5} top={280} left={700} orientation={Direction.RIGHT}/>
                    <NavArrow onClick={setTreeIndex} toIndex={4} top={220} left={160} orientation={Direction.UP}/>
                    <NavArrow onClick={setTreeIndex} toIndex={1} top={250} left={540} orientation={Direction.DOWN}/>
                </div>
            )
        case 4: //Hatchery
            return (
                <div>
                    <NavArrow onClick={setTreeIndex} toIndex={3} top={300} left={440} orientation={Direction.DOWN}/>
                </div>
            )
        case 5: //Farm
            return (
                <div>
                    <NavArrow onClick={setTreeIndex} toIndex={3} top={320} left={7} orientation={Direction.LEFT}/>
                </div>
            )
    }
}

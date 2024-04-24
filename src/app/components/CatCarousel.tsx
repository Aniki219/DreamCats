"use client"
import { CatData } from "@/models/Cat";
import { useState } from "react";
import { circleIndex } from "../lib/utils/helpers";
import styles from "./CatCarousel.module.css"

interface CatCarouselData {
    catList: CatData[],
    catImages: {url: string}[]
}

export default function CatCarousel({catList, catImages}:CatCarouselData) {
    const [index, setIndex] = useState(0);
    const len = catList.length;

    const incIndex = (inc:number) => {
        setIndex(circleIndex(index + inc, len));
    }

    return (
        <div className="carousel">
            <div className="wheel">
                <div className="name-plate">
                    <h3>{catList[index].name}</h3>
                    <p><i>{catList[index].id}</i></p>
                </div>
                <div className={styles.thumbnail}>
                    <img src={catImages[circleIndex(index-1, len)].url}></img>
                </div>
                <div className={styles.thumbnail}>
                    <img src={catImages[index].url}></img>
                </div>
                <div className={styles.thumbnail}>
                    <img src={catImages[circleIndex(index+1, len)].url}></img>
                </div>
                <button onClick={() => {incIndex(-1)}}>Prev</button>
                <button onClick={() => {incIndex(1)}}>Next</button>
            </div>
            <div className="statsPage">
            
            </div>
        </div>
    )
}
"use client"
import { useState } from "react";
import { circleIndex } from "../lib/utils/helpers";
import styles from "./CatCarousel.module.css"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { CatData } from "@/components/Cat";

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
        <div className={styles.carousel}>
            <div className={styles.wheel}>
                <div className={styles.namePlate}>
                    <h3>{catList[index].type}</h3>
                    <p><i>{catList[index].id}</i></p>
                </div>
                <div className={styles.thumbnail}>
                    <img style={{left: "-25%"}} 
                            src={catImages[circleIndex(index-1, len)].url}></img>
                </div>
                <div className={styles.thumbnail}>
                    <img style={{left: "25%", zIndex: "1"}} 
                            src={catImages[index].url}></img>
                </div>
                <div className={styles.thumbnail}>
                    <img style={{right: "-25%"}} 
                            src={catImages[circleIndex(index+1, len)].url}></img>
                </div>
                <button style={{left:0}} onClick={() => {incIndex(-1)}}>
                    <ArrowBigLeft/>
                </button>
                <button style={{right:0}} onClick={() => {incIndex(1)}}>
                    <ArrowBigRight/>
                </button>
            </div>
            <div className="statsPage">
            
            </div>
        </div>
    )
}
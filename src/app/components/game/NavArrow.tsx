import { Direction } from "@/types/NavArrowOrientation";
import Image from "next/image";

type NavArrowProps = {
    toIndex: number,
    onClick: (i : number) => void,
    top? : number,
    left? : number,
    orientation : Direction
}

export default function NavArrow(props : NavArrowProps) {
    return (
        <Image
            src={`/arrow${props.orientation.toString()}.png`}
            alt={`Navigate ${props.orientation}`}
            width={70}
            height={70}
            className="navArrow"
            style={
                {
                    position: 'absolute',
                    top: `${props.top || 0}px`,
                    left: `${props.left || 0}px`,
                }
            }
            onClick={() => props.onClick(props.toIndex)}
        />
    )
}
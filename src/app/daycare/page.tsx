import Link from "next/link"

export default function DayCare() {
    const catList = () => {
        return (
            <>
                <p>cat1</p>
            </>
        )
    }
    return (
        <div>
            <h2>Daycare</h2>
            <p>Select a Cat to adopt</p>
            {catList()}
            <p>Choose one</p>

            <Link href="./tree">Return to the Tree</Link>
        </div>
    )
}
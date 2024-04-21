import Link from "next/link";

export default function Tree() {
    return (
        <>
            <h2>Welcome to the tree</h2>
            <p>Select a destination to explore</p>
            <ul>
                <li><Link href="daycare">Daycare</Link></li>
                <li><Link href="cafe">Cafe</Link></li>
            </ul>
        </>
    )
}
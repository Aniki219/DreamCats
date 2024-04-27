import Link from "next/link";

export default function Cafe() {
    return (
        <>
            <h2>Welcome to the Cafe</h2>
            <p>Grab a drink and chat with friends</p>
            <p>Bond with your cats and buy them drinks</p>
            <Link href="../tree">Return to the tree</Link>
        </>
    )
}
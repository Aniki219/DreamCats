import Link from "next/link";
export default async function AccountCreated() {
    return (
            <>
            <h2>Account Creation Successful</h2>
            <p>Return to <Link href="/login">Log In</Link> to continue.</p>
        </>
    )
}
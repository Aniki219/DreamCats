export default function NavbarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <h1>Nav Layout</h1>
            <section>{children}</section>
        </>
    )
}
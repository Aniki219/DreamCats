"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function RelativeLink({children, href}:{children: React.ReactNode, href: string}) {
    const pathname = usePathname();
    return (
        <Link href={pathname + href}>
            {children}
        </Link>
    )
}
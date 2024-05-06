import styles from './CatDiffsTable.module.css'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section className={styles.dashboard}>{children}</section>
}
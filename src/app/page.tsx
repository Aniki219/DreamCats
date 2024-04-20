import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div>
        <h1>Home Page</h1>
        <Link href="other">Other Page</Link>
    </div>
  );
}

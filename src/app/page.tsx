import Image from "next/image";
import styles from "./page.module.css";
import Accueil from "./accueil/index";
import Article from "./articles/[id]/page";

export default function Home() {
  return (
    <main>
      <Accueil />
    </main>
  );
}

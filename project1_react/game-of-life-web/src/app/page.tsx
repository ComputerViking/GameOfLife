import Image from "next/image";
import styles from "./page.module.css";
import GameBoard from "@/components/GameOfLife/GameBoard";



export default function Home() {
  return (
    <main >
        <GameBoard></GameBoard>
    </main>
  );
}

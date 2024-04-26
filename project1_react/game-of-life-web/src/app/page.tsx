import Image from "next/image";
import styles from "./page.module.css";

function Square({ }) {
  return (
    <button className="square" >
      X
    </button>
  );
}

export default function Home() {
  return (
    <main >
      <Square></Square>
      <Square></Square>
      <Square></Square>
      <Square></Square>
    </main>
  );
}

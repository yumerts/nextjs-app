"use client";

import { title } from "@/components/primitives";
import GridGame from "../../components/board"

export default function GamePage() {
  return (
    <div>
      <h1 className={title()}>Game board</h1>
      <GridGame></GridGame>
    </div>
  );
}

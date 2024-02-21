"use client";
import { useEffect, useState } from "react";

import { Column } from "./Column";
import { BurnBarrel } from "./BurnBarrel";

export const Board = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("cards");
    if (data) {
      setCards(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex flex-wrap  w-full gap-3 overflow-auto  p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="must"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Must Have TO"
        column="must2"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-red-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} cards={cards} />
    </div>
  );
};

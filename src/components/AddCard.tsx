"use client";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export const AddCard = ({ column, setCards, cards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const findHighestId = () => {
    const highestId = cards.reduce(
      (maxId, card) => Math.max(maxId, card.id),
      0
    );
    return highestId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newId = findHighestId() + 1;

    const newCard = {
      title: text.trim(),
      id: newId.toString(),
      column,
    };
    const add = () => {
      try {
        localStorage.setItem("cards", JSON.stringify([...cards, newCard]));
      } catch (error) {
        console.error("Error writing data to data.json:", error);
      }
    };
    try {
      setCards([...cards, newCard]);
      setAdding(false);
      add();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

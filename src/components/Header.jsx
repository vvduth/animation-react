import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button onClick={handleStartAddNewChallenge}
        // i will not use animate here
        // cuz it would mean i would have to listen to 
        // onHoverStart and onHoverEnd event for the button to pop out libit
        // that alot of work for a small effect

        // use whileHover instead for simplicity
        whileHover={{
          scale: 1.1
        }}
        // transition will controll all the animation behavior applyon this element
        transition={{
          type: "spring",
          stiffness: 400,
          mass: 0.5,
        }}
        className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}

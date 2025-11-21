import { createPortal } from "react-dom";
import { motion } from "motion/react";


// modal is a anccestoer copmpoent heree that wrap childern componets
// in my case it will ne NewChallenge component
// all the variant  set in Modal compoent will be inherited by children componets
// so in NewChallenge we dont need to set animate, initial, exit again
export default function Modal({ title, children, onClose }) {
  
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
      // useful for defining and resueing animation states
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
        open
        className="modal"
        animate="visible"
        initial="hidden"
        exit="hidden"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}

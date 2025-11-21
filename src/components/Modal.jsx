import { createPortal } from "react-dom";
import { motion } from "motion/react";
export default function Modal({ title, children, onClose }) {
  // we have so prop or statre in here, we doesnt need them cuz framer
  // have some prop to handle animation without state
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        open
        className="modal"
        animate={{ opacity: 1, y: 0 }} // animate prop to set the final state of the animation
        initial={{ opacity: 0, y: 30 }} // inital prop to set the initial state of the animation
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}

import { useContext, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        {/*  use stagger children to animate list items */}
        <motion.ul
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          id="new-challenge-images"
        >
          {images.map((image) => (
            <motion.li
              // just have to definr variants, no need to define animate, initial, exit again
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                // we can use array as value to define keyframes
                visible: { opacity: 1, scale: [0.8,1.3,1] },
                transition: { type: "spring" }, // Add the transition here
              }}
              // add exist visible to prevent flicker when modal close
              // it override the exit in Modal component,
              // if we dont do this, when modal close, it will wait to all the items in li exit first
              // then modal exit, causing flicker effect
              // you muest not use varant name in this case because in
              // Modal component we already set animate, initial, exit with varant names
              // have to use value directly
              // exit={ { opacity: 1, scale: 1 }}

              // UPDATE: in the later version of motion, if we keep the exit annd
              // transition: { type: 'spring' } to the whole motion.li
              // after closing the modal  my backdrop would not go away.

              // Setting the transition attribute in the motion.li element means that
              // that element will enter AND EXIT using those transition properties.
              // The added bounce that is created by the "spring" animation (which looks great on entry) is what is c
              // ausing the delay on the backdrop's
              // disappearance. We can't see it happening, but Framer Motion is waiting
              // for the children elements to finish bouncing before removing the backdrop.

              // So instead of adding transition: { type: 'spring' } to the whole motion.li attribute, simply add it to the visible variant (as shown in the code below). That means motion.li elements will only "spring" on entry. Then you can simply delete the exit={{ opacity: 1, scale: 1 }} which for some reason is breaking the backdrop.

              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}

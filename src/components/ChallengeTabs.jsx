import Badge from './Badge.jsx';
import { motion } from 'motion/react';
function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        {/* key here will act as a unique identifier for the Badge component */}
        {/*  when the value of the key changes, react will destroy the old component and render a new one
          triggering the animation each time the badgeCaption changes
        */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {/*  add layout id for framer motion to enable shared layout animations */}
      {/*  it will auto detach whenever the app is rendering a elem with the same layoutId in a diff of ur page 
      anbd palce a smooth animation  */}
      {isSelected && <motion.div  layoutId="tab-indicator" className="active-tab-indicator" />}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Container, Floating, Item } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import MenuToggle from "./hamburger";

const rotations = {
  "3": [[3 * Math.PI / 2, Math.PI], [0, Math.PI / 2]],
  "6": [[Math.PI, Math.PI], [0, 0]]
};

function FloatingButton({ backgroundColor, color, size, top, right, children }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  let number = React.Children.count(children);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  function getAngle(i) {
    const angle = number <= 3 ? Math.PI / 2 : number <= 6 ? Math.PI : 2 * Math.PI;
    const rotate = rotations[number <= 3 ? "3" : "6"][Number(top)][Number(right)];
    return {
      angle: rotate + (number <= 6 ? i * angle / (number - 1) : i * angle / number),
      distance: number <= 6 ? size / Math.sin(angle / (number - 1)) + size / 2 : size / Math.sin(angle / number) + size / 2
    };
  }

  return (
    <motion.div
      onClick={() => setExpanded(!expanded)}
      initial={false}
      animate={{ rotate: expanded ? 180 : 0 }}
      ref={ref}
    >
      <Container size={size} style={{ backgroundColor: backgroundColor || "none" }}>
        <MenuToggle expanded={expanded} color={color} size={size} />
      </Container>
      <AnimatePresence>
        {expanded && (
          React.Children.map(children, (child, i) => (
            <Item
              key={i}
              i={getAngle(i).angle}
              size={size}
              distance={getAngle(i).distance}
              style={{ backgroundColor: child.props.backgroundColor }}
              onClick={child.props.onClick}
            >
              <img
                src={child.props.imgSrc}
                style={{ height: size / 2, width: size / 2 }}
                alt={`icon-${i}`}
              />
            </Item>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
}

FloatingButton.defaultProps = {
  color: "#dbdbdb",
  backgroundColor: "#8f1d30",
  size: 60,
  top: false,
  right: true,
  children: {}
};

FloatingButton.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  size: PropTypes.number,
  top: PropTypes.bool,
  right: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default FloatingButton;
export { Item };

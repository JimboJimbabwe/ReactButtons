import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ToggleWrapper = styled.span`
  cursor: pointer;
  display: flex;
  size: ${(props) => props.size / 2}px;
  position: relative;
  width: ${(props) => props.size / 2}px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Line = styled(motion.div)`
  size: ${(props) => props.size * 0.05}px;
  width: ${(props) => props.size * 0.5}px;
  border: white;
  border-radius: ${(props) => props.size * 0.05}px;
  background-color: ${(props) => props.color};
`;

const animationVariants = {
  open: {
    y: (size) => size / 6,
    rotate: 45,
    width: (size) => size * 0.5
  },
  closed: {
    y: 0,
    rotate: 0,
    width: (size) => size * 0.5
  },
  hidden: {
    rotate: 0,
    width: 0
  }
};

const MenuToggle = ({ size, color, expanded }) => {
  return (
    <ToggleWrapper size={size}>
      <Line
        variants={animationVariants}
        animate={expanded ? "open" : "closed"}
        custom={size}
        style={{ backgroundColor: color }}
      />
      <Line
        variants={animationVariants}
        animate={expanded ? "hidden" : "closed"}
        custom={size}
        style={{ backgroundColor: color }}
      />
      <Line
        variants={animationVariants}
        animate={expanded ? "open" : "closed"}
        custom={size}
        style={{ backgroundColor: color }}
      />
    </ToggleWrapper>
  );
};

MenuToggle.defaultProps = {
  size: 60,
  color: "white"
};

MenuToggle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  expanded: PropTypes.bool.isRequired
};

export default MenuToggle;

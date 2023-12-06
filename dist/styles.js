import styled from "styled-components";
import { motion } from "framer-motion";

export const Floating = styled(motion.div)`
  position: absolute;
  top: ${(props) => (props.top ? "50px" : "none")};
  bottom: ${(props) => (!props.top ? "50px" : "none")};
  right: ${(props) => (props.right ? "50px" : "none")};
  left: ${(props) => (!props.right ? "50px" : "none")};
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled(motion.div)`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
  background-color: #8f1d30;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Item = styled(motion.div)`
  position: absolute;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
  background-color: #dbdbdb;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

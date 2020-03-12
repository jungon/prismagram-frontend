import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getSize = size => {
  let number;
  if ("sm" === size) {
    number = 30;
  } else if ("md" === size) {
    number = 50;
  } else if ("lg" === size) {
    number = 150;
  } else {
    number = 30;
  }
  return `
        width:${number}px;
        height:${number}px;
        `;
};

const Container = styled.div`
  ${props => getSize(props.size)};
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ className, size = "sm", url }) => (
  <Container className={className} size={size} url={url} />
);

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  url: PropTypes.string.isRequired
};

export default Avatar;

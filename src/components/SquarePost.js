import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { CommentFull, HeartFull } from "./Icons";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  background-image: url(${props => props.bg});
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  resize: both;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 20px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const Post = ({ likeCount, commentCount, file }) => {
  return (
    <Container bg={file}>
      <Overlay>
        <Number>
          <HeartFull />
          <NumberText>{likeCount}</NumberText>
        </Number>
        <Number>
          <CommentFull />
          <NumberText>{commentCount}</NumberText>
        </Number>
      </Overlay>
    </Container>
  );
};

Post.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired
};

export default Post;

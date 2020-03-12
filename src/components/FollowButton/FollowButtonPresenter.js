import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const FollowButtonPresenter = ({ onClick, isFollowing }) => {
  return (
    <Button onClick={onClick} text={isFollowing ? "Unfollow" : "Follow"} />
  );
};

FollowButtonPresenter.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired
};

export default FollowButtonPresenter;

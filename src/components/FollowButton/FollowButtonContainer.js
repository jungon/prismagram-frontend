import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ id, isFollowing }) => {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [followMutationFn] = useMutation(FOLLOW, { variables: { id } });
  const [unFollowMutationFn] = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingState) {
      setIsFollowingState(false);
      unFollowMutationFn();
    } else {
      setIsFollowingState(true);
      followMutationFn();
    }
  };

  return (
    <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingState} />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;

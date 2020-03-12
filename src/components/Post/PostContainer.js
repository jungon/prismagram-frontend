import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";
import PostPresenter from "./PostPresenter";
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostQueries";

const PostContainer = ({
  id,
  location,
  caption,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt
}) => {
  const [likeCountState, setLikeCountState] = useState(likeCount);

  const [isLikedState, setIsLikedState] = useState(isLiked);

  const [selfComments, setSelfComments] = useState([]);

  const newComment = useInput("");

  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const totalFiles = files.length;
      if (currentItem === totalFiles - 1) {
        setCurrentItem(0);
      } else {
        setCurrentItem(currentItem + 1);
      }
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentItem, files.length]);

  const [toggleLikeMutationFn] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  const [addCommentMutationFn] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: newComment.value }
  });

  const toggleLike = () => {
    let previousIsLiked = isLikedState;
    let previousLikeCount = likeCountState;
    setIsLikedState(!previousIsLiked);
    setLikeCountState(
      !previousIsLiked ? previousLikeCount + 1 : previousLikeCount - 1
    );

    try {
      toggleLikeMutationFn();
    } catch {
      setIsLikedState(previousIsLiked);
      setLikeCountState(previousLikeCount);
      toast.error("Can't toggle like");
    }
  };

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      newComment.setValue("");
      try {
        const {
          data: { addComment }
        } = await addCommentMutationFn();
        setSelfComments([...selfComments, addComment]);
      } catch {}
    }
  };

  return (
    <PostPresenter
      id={id}
      location={location}
      caption={caption}
      user={user}
      files={files}
      likeCount={likeCountState}
      isLiked={isLikedState}
      comments={comments}
      selfComments={selfComments}
      newComment={newComment}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      createdAt={createdAt}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;

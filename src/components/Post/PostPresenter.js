import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import FatText from "../FatText";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 750px;
  margin-bottom: 25px;
  use-select: none;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.img`
  position: absolute;
  top: 0;
  max-width: 100%;
  width: 100%;
  height: 560px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  font-size: 12px;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGrayColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const PostPresenter = ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  comments,
  selfComments,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  createdAt
}) => {
  return (
    <Post>
      <Header>
        <Avatar url={avatar} />
        <UserColumn>
          <FatText text={username} />
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files.map((file, idx) => (
          <File
            key={file.id}
            id={file.id}
            src={file.url}
            showing={idx === currentItem}
          />
        ))}
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={1 === likeCount ? "1 like" : `${likeCount} likes`} />
        {comments && (
          <Comments>
            {[...comments, ...selfComments].map((comment, index) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}

        <Timestamp>{createdAt}</Timestamp>
        <Textarea
          placeholder="Add a comment..."
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyPress={onKeyPress}
        />
      </Meta>
    </Post>
  );
};

export default PostPresenter;

import React from "react";
import PropTypes from "prop-types";
import FatText from "../../components/FatText";
import styled from "styled-components";
import Loader from "../../components/Loader";
import UserCard from "../../components/UserCard";
import Post from "../../components/Post";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-tempate-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-tempate-rows: 200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({ term, loading, data }) => {
  if (!term) {
    return (
      <Wrapper>
        <FatText text="Search for something"></FatText>
      </Wrapper>
    );
  } else if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && (!!data.searchUser || !!data.searchPost)) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No users found"></FatText>
          ) : (
            data.searchUser.map((user, idx) => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No posts found"></FatText>
          ) : (
            data.searchPost.map((post, idx) => (
              <Post
                key={idx}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0].url}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  term: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;

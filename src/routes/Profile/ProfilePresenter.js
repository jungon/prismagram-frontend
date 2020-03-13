import React from "react";
import Loader from "../../components/Loader";
import styled from "styled-components";
import Avatar from "../../components/Avatar";
import FatText from "../../components/FatText";
import FollowButton from "../../components/FollowButton";
import Helmet from "react-helmet";
import SquarePost from "../../components/SquarePost";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.span`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  margin-bottom: 10px;
  display: block;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-tempate-rows: 200px;
  grid-auto-rows: 200px;
`;

const ProfilePresenter = ({ loading, data }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        username,
        avatar,
        fullname,
        bio,
        isSelf,
        isFollowing,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;

    return (
      <>
        <Helmet>
          <title>{username} | prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={postsCount} /> posts
              </Count>
              <Count>
                <FatText text={followersCount} /> followers
              </Count>
              <Count>
                <FatText text={followingCount} /> following
              </Count>
            </Counts>
            <FullName text={fullname} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map((post, idx) => (
              <SquarePost
                key={idx}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0].url}
              />
            ))}
        </Posts>
      </>
    );
  }
};

export default ProfilePresenter;

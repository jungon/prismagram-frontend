import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      username
      avatar
      fullname
      bio
      isSelf
      isFollowing
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const ProfileContainer = ({
  match: {
    params: { username }
  }
}) => {
  const { loading, data } = useQuery(GET_USER, { variables: { username } });

  return <ProfilePresenter loading={loading} data={data} />;
};

export default withRouter(ProfileContainer);

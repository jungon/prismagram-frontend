import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
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

const LOG_OUT = gql`
  mutation {
    logUserOut @client
  }
`;

const ProfileContainer = ({
  match: {
    params: { username }
  }
}) => {
  const { loading, data } = useQuery(GET_USER, { variables: { username } });
  const [logOutFn] = useMutation(LOG_OUT);

  return <ProfilePresenter loading={loading} data={data} logOut={logOutFn} />;
};

export default withRouter(ProfileContainer);

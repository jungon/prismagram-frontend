import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { HashRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Theme from "../styles/Theme";
import Footer from "./Footer";
import Header from "./Header";
import Routes from "./Routes";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            <Header />
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
              <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
            </Wrapper>
          </>
        </Router>
      </>
    </ThemeProvider>
  );
};

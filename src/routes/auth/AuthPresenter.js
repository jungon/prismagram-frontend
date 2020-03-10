import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Helmet from "react-helmet";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox};
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  setAction,
  username,
  firstname,
  lastname,
  email,
  secret,
  onSubmit
}) => (
  <Wrapper>
    <Form>
      {"logIn" === action && (
        <>
          <Helmet>
            <title>Log In | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"Log in"} />
          </form>
        </>
      )}
      {"signUp" === action && (
        <>
          <Helmet>
            <title>Sign Up | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder="First name" {...firstname} />
            <Input placeholder="Last name" {...lastname} />
            <Input placeholder="Email" {...email} type="email" />
            <Input placeholder="Username" {...username} />
            <Button text="Sign up" />
          </form>
        </>
      )}
      {"confirm" === action && (
        <>
          <Helmet>
            <title>Confirm Secret | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder="Secret" required {...secret} />
            <Button text="Confirm" />
          </form>
        </>
      )}
    </Form>
    {"confirm" !== action && (
      <StateChanger>
        {"logIn" === action ? (
          <>
            "Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>"
          </>
        ) : (
          <>
            "Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>"
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);

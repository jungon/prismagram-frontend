import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { LOG_IN } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const onLogin = e => {
    e.preventDefault();
    if (!!email.value) {
      requestSecret();
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      firstname={firstname}
      lastname={lastname}
      email={email}
      onLogin={onLogin}
    />
  );
};

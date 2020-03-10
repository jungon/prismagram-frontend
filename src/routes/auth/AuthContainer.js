import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import {
  CREATE_ACCOUNT,
  LOG_IN,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value
    }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: secret.value,
      email: email.value
    }
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if ("logIn" === action) {
      if (!!email.value) {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("You don't have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("Check you inbox for your login secret");
            setAction("confirm");
          }
        } catch (e) {
          toast.error("Can't request secret, try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if ("signUp" === action) {
      if (
        !!email.value &&
        !!username.value &&
        !!firstname.value &&
        !!lastname.value
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error("Can't create account, try again");
        }
      } else {
        toast.error("All field are required");
      }
    } else if ("confirm" === action) {
      if (!!email.value && !!secret.value) {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          if (!!token) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch (e) {
          toast.error("Can't confirm secret, check again");
        }
      }
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
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};

import React from "react";

import { Box, Button } from "@chakra-ui/react";
import { useAuth } from "../contexts/Auth";
import { useUserLoginForm } from "../forms/user";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import SubmitButton from "../components/Common/forms/SubmitButton";

const Login = () => {
  /**
   * ----- Hook Initialization -----
   */

  const router = useRouter();

  const {
    login,
    state: { user },
  } = useAuth();

  const [loginMutation, { loading: loginLoading }] = useLoginMutation();

  const { FormComponents: LoginFormComponents, setError: setLoginError } =
    useUserLoginForm();

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!!user) router.push("/");
  }, [router, user]);

  return (
    <Box
      m="auto"
      p={6}
      w={["75%", "50%", "50%", "25%"]}
      backgroundColor="white"
      mt="10%"
      border="1px solid lightgray"
      borderRadius={6}
    >
      <LoginFormComponents.Form
        submitHandler={async (data) => {
          try {
            const result = await loginMutation({
              variables: { data },
            });

            if (result.data?.login) login(result.data.login);
          } catch (e: any) {
            setLoginError(
              "email",
              { message: e.message },
              { shouldFocus: true }
            );
          }
        }}
      >
        <LoginFormComponents.Email isLoading={loginLoading} />
        <LoginFormComponents.Password isLoading={loginLoading} />
        <LoginFormComponents.RememberMe isLoading={loginLoading} />
        <SubmitButton isLoading={loginLoading} />
      </LoginFormComponents.Form>
    </Box>
  );
};

export default Login;

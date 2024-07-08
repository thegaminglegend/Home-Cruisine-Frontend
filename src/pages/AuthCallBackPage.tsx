import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "../api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//AuthCallBack page so that it could be under auth0 provider to get token
const AuthCallBackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  //Stores state value, does not rerender when state changes
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    //If user is logged in with auth0 and not created user
    //send request to backend to create new user in DB
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    //navigate to home page
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallBackPage;

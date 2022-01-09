import React, { useEffect, useContext } from "react";

import AuthContext from "../../contexts/AuthContext";

const signout = () => {
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    logoutUser();
  }, []);

  return <></>;
};

export default signout;

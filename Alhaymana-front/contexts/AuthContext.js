import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { API_URL } from "../utils/urls";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // setUser(usr);
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    const jwt = localStorage.getItem("jwt");
    // console.log("");
    // console.log("jwt:", jwt);

    if (jwt === null) {
      console.log("you are not logged in");
      return;
    }

    try {
      const url = `${API_URL}/users/me`;
      const userRes = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
      const user = await userRes.data;
      const userWithJwt = {
        jwt,
        user,
      };

      // console.log("user checking:", userWithJwt);
      setUser(userWithJwt);
    } catch (e) {
      console.log(e);
      console.log("error while checking if the user is logged in");
    }
  };

  const loginUser = async (email, password) => {
    const url = `${API_URL}/auth/local`;
    const data = { identifier: email, password };

    const userRes = await axios.post(url, data);
    const user = await userRes.data;
    setUser(user);

    // write to local storage
    localStorage.setItem("jwt", user.jwt);
    localStorage.setItem("username", user.user.username);
    router.push("/");
  };

  const logoutUser = async () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    setUser(null);
    router.push("/auth/signin");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

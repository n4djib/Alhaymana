import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const profile = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Profile</h1>
      <Button onClick={() => router.push("/auth/signout")}>Sign out</Button>
    </div>
  );
};

export default profile;

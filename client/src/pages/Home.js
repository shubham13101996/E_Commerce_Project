import React from "react";
import Layouts from "../components/Layout/Layouts";
import { useAuth } from "../context/auth";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layouts title={"Best Offer - shop now!!"}>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layouts>
  );
};

export default Home;

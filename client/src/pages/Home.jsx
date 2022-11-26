import React from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("getting axios");
    testAxios();
  }, []);

  const testAxios = async () => {
    try {
      // const payload = JSON.stringify({ user: "user" });
      const res = await axios.get("/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Homepage</h1>

      <Navbar />
    </div>
  );
};

export default Home;

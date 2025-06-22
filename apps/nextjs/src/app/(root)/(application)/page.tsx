"use client";

import { redirect } from "next/navigation";

const Home = () => {
  return redirect("/overview");
};

export default Home;

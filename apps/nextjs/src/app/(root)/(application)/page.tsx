"use client";

import { SidebarUser } from "./(sidebar)/SidebarUser";
import { useSession } from "next-auth/react";

const Home = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="flex h-screen flex-col items-center justify-center px-[50%]">
      <SidebarUser
        user={{
          name: user?.name ?? "",
          email: user?.email ?? "",
          avatar: user?.image ?? "",
        }}
      />
    </div>
  );
};

export default Home;

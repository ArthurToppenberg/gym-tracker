import { Button } from "@gym/ui/components/button";
import { signOut } from "next-auth/react";

export default async function Home() {
  return (
    <div>
      <Button
        onClick={() => {
          signOut;
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

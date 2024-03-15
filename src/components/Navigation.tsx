import { Link } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav>
      <Link href="/">
        <Button variant="ghost">Home</Button>{" "}
      </Link>
    </nav>
  );
};

export default Navigation;

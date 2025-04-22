"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Grid3X3 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  selectedPoint:
    | { id: string | number; name: string; description: string }
    | undefined;
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Nav({
  selectedPoint,
  setChatOpen,
  setTaskOpen,
}: Props) {
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 bottom-0 w-full md:top-0 md:left-0 md:h-screen md:w-auto bg-foreground">
      <ul className="flex md:justify-start justify-between mx-auto w-[90%] md:px-2 items-center md:flex-col md:items-center h-full p-5 gap-6">
        <li>
          <Link href="/">
            <Button
              className={`flex flex-col items-center text-[1rem] h-auto bg-foreground text-foreground hover:bg-foreground shadow-none hover:text-muted-foreground transition cursor-pointer`}
            >
              <Home className="text-background hover:text-muted-foreground" />
              <span className="hidden md:block text-xs mt-1">home</span>
            </Button>
          </Link>
        </li>
        <li>
          <Button
            className={`flex flex-col items-center text-[1rem] h-auto bg-foreground text-foreground hover:bg-foreground shadow-none hover:text-muted-foreground transition cursor-pointer`}
            disabled={!selectedPoint}
            onClick={() => setChatOpen((prev) => !prev)}
          >
            <MessageSquare className="text-background" />
            <span className="hidden md:block text-xs mt-1">chat</span>
          </Button>
        </li>{" "}
        <li>
          <Button
            className={`flex flex-col items-center text-[1rem] h-auto bg-foreground text-foreground hover:bg-foreground shadow-none hover:text-muted-foreground transition cursor-pointer`}
            disabled={!selectedPoint}
            onClick={() => setTaskOpen((prev) => !prev)}
          >
            <Grid3X3 className="text-background" />
            <span className="hidden md:block text-xs mt-1">tasks</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

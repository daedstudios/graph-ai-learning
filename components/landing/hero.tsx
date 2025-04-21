import React from "react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col items-center mx-auto w-[90%] md:max-w-[45rem] pt-[12rem]">
        <h1 className="md:text-[4rem] text-[3rem] text-center leading-[100%] pb-[1.5rem]">
          Discover new interests, learn fast
        </h1>
        <p className="text-[1rem] text-center leading-[125%] max-w-[33rem] pb-[1.5rem]">
          explore your knowledge in a graph, see connected topics and let Ai
          assist you in your personal learning journey
        </p>
        <div className="flex  flex-row w-full gap-4 justify-center ">
          <Button className=" w-[7.5rem] bg-foreground hover:bg-muted-foreground hover:text-background dark:bg-primary border border-muted-foreground text-background text-[1rem]  dark:hover:bg-background dark:text-card-foreground rounded-[2rem] cursor-pointer">
            try now
          </Button>
          <Button className=" w-[7.5rem]  bg-secondary dark:bg-primary border border-muted-foreground text-primary text-[1rem] hover:bg-muted-foreground hover:text-background dark:hover:bg-background dark:text-card-foreground rounded-[2rem] cursor-pointer">
            github
          </Button>
        </div>
      </div>
    </>
  );
}

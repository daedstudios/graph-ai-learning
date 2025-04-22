"use client";
import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createRef, useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Cta() {
  const arrowRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Link
        href="/graph"
        className="flex flex-wrap p-[3rem] justify-between gap-[1rem] mx-auto w-[90%] md:max-w-[70rem] bg-foreground rounded-[2rem] mb-[6rem]"
        onMouseEnter={() => {
          gsap.to(arrowRef.current, {
            duration: 0.2,
            scale: 1.8,
            ease: "power2.out",
          });
          gsap.to(textRef.current, {
            duration: 0.2,
            scale: 0.9,
            ease: "power2.out",
          });
        }}
        onMouseLeave={() => {
          gsap.to(arrowRef.current, {
            duration: 0.2,
            scale: 1,
            ease: "power2.out",
          });
          gsap.to(textRef.current, {
            duration: 0.2,
            scale: 1,
            ease: "power2.out",
          });
        }}
      >
        <div className="flex flex-col gap-[1rem]" ref={textRef}>
          <div className="text-background text-[3rem] max-w-[30rem] leading-[125%]">
            Ready to start learning 2x faster?
          </div>
          <div className="text-muted text-[1rem] max-w-[30rem] leading-[125%]">
            {" "}
            try for free{" "}
          </div>
        </div>{" "}
        <Image
          src="/arrow_white.svg"
          alt="plus"
          width={36}
          height={36}
          className="mb-auto cursor-pointer items-end"
          ref={arrowRef}
        />
      </Link>
    </>
  );
}

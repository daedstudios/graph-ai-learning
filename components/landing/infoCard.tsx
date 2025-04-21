"use client";
import Image from "next/image";
import info_data from "@/data/info_data";
import { div } from "three/tsl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createRef, useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Info() {
  const imgRefs = useRef(
    Array(info_data.length)
      .fill(null)
      .map(() => createRef<HTMLImageElement>())
  );
  const ArrowRefs = useRef(
    Array(info_data.length)
      .fill(null)
      .map(() => createRef<HTMLImageElement>())
  );

  return (
    <>
      <div className="flex flex-wrap gap-12 justify-center mx-auto max-w-[70rem] py-[12rem] items-start cursor-pointer">
        {info_data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-[1.5rem] bg-background border justify-between border-muted w-[90%] md:w-[21rem] rounded-[2rem] h-[31rem]"
            onMouseOver={() => {
              gsap.to(imgRefs.current[index].current, {
                duration: 0.2,
                scale: 1.1,
                filter: "blur(0px)",
                ease: "power2.out",
              });
              gsap.to(ArrowRefs.current[index].current, {
                duration: 0.2,
                scale: 1.5,
                ease: "power2.out",
              });
            }}
            onMouseLeave={() => {
              gsap.to(imgRefs.current[index].current, {
                duration: 0.5,
                scale: 1,
                filter: "blur(5px)",
                ease: "power2.out",
              });
              gsap.to(ArrowRefs.current[index].current, {
                duration: 0.2,
                scale: 1,
                ease: "power2.out",
              });
            }}
          >
            <div className="flex flex-row justify-between items-start">
              <div className="text-[1.5rem] leading-[125%] font-medium text-foreground w-[60%]">
                {item.heading}
              </div>
              <Image
                src="/arrow_outward.svg"
                alt="plus"
                width={36}
                height={36}
                className="cursor-pointer"
                ref={ArrowRefs.current[index]}
              />
            </div>

            <Image
              src={`/${item.image}`}
              alt="visual"
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-auto blur-sm cursor-pointer"
              ref={imgRefs.current[index]}
            />

            <p className="text-[1rem] text-muted-foreground whitespace-pre-line">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

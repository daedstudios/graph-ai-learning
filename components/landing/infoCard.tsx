import Image from "next/image";
import info_data from "@/data/info_data";
import { div } from "three/tsl";

export default function Info() {
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mx-auto max-w-[70rem] py-[12rem] items-start">
        {info_data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-[1.5rem] bg-background border justify-between border-muted w-[21rem] rounded-[2rem] h-[31rem]"
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
              />
            </div>

            <Image
              src={`/${item.image}`}
              alt="visual"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
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

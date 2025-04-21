import Image from "next/image";

export default function Cta() {
  return (
    <>
      <div className="flex flex-wrap p-[3rem] justify-between gap-[1rem] mx-auto w-[90%] md:max-w-[70rem] bg-foreground rounded-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          <div className="text-background text-[3rem] max-w-[30rem] leading-[125%]">
            Ready to start learning 2x faster?
          </div>
          <div className="text-muted text-[1rem] max-w-[30rem] leading-[125%]">
            {" "}
            try for free{" "}
          </div>
        </div>
        <div className="">
          {" "}
          <Image
            src="/arrow_white.svg"
            alt="plus"
            width={48}
            height={48}
            className="hover:w-[4rem] cursor-pointer items-end"
          />
        </div>
      </div>
    </>
  );
}

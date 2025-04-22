import Link from "next/link";
import steps_data from "@/data/steps_data";

export default function Steps() {
  return (
    <>
      <div className="flex flex-wrap gap-12 justify-center mx-auto max-w-[70rem] pt-[0rem] pb-[6rem] md:pt-[4rem] md:pb-[12rem] items-start">
        {steps_data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col max-w-[21rem] p-[1rem] gap-[2rem] cursor-pointer"
          >
            <div className="flex flex-row border-b items-end justify-between ">
              <h1 className="text-[3rem] "> {item.step}</h1>
              <h1 className=" text-[1.5rem] font-medium pb-3">
                {" "}
                {item.heading}
              </h1>
            </div>
            <p className="px-1 text-[1rem] text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

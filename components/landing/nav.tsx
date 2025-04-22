import Image from "next/image";
import Link from "next/link";

export default function LandingNav() {
  return (
    <>
      <div className="flex justify-center mx-auto p-[1rem] fixed w-full z-10">
        <Link href="/graph">
          <Image
            src="/graph.svg"
            alt="logo"
            width={0}
            height={0}
            className="w-[2rem] h-[2rem]"
          ></Image>
        </Link>
      </div>
    </>
  );
}

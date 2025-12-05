/*
2025-12-06 01:04:36

Usage:

<LandoNorrisText>TIKTOK</LandoNorrisText>
<LandoNorrisText enableLetterDown={false}>YOUTUBE</LandoNorrisText>
<LandoNorrisText enableLetterDown={false}>INSTAGRAM</LandoNorrisText>
<LandoNorrisText style={{ fontSize: "20px" }}>FACEBOOK</LandoNorrisText>
<LandoNorrisText>GITHUB</LandoNorrisText>

*/
import Image from "next/image";
import ThemeSelector from "./components/ThemeSelector";
import LandoNorrisText from "./components/LandoNorrisText";

export default function Home() {
  return (
    <>
      <ThemeSelector />
      <div className="flex min-h-screen items-center justify-center font-sans">
        <main
          className="flex min-h-screen w-full max-w-3xl flex-col 
        items-center justify-between py-32 px-16 sm:items-start"
        >
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div
            className="flex flex-col items-center gap-6 text-center 
          sm:items-start sm:text-left"
          >
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight ">
              To get started, edit the page.tsx file.
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 ">
              lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
          <div className=" flex flex-col gap-4 ">
            <LandoNorrisText enableLetterDown={false}>TIKTOK</LandoNorrisText>
            <LandoNorrisText enableLetterDown={false}>YOUTUBE</LandoNorrisText>
            <LandoNorrisText enableLetterDown={true}>INSTAGRAM</LandoNorrisText>
            <LandoNorrisText style={{ fontSize: "20px" }}>
              FACEBOOK
            </LandoNorrisText>
            <LandoNorrisText
              style={{ fontSize: "40px" }}
              enableLetterDown={false}
            >
              전혜진❤강우성
            </LandoNorrisText>
            <LandoNorrisText>GITHUB</LandoNorrisText>
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full  px-5  transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
              Deploy Now
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>
        </main>
      </div>
    </>
  );
}

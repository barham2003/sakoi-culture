import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex flex-col gap-5">
      <section className="relative flex h-full flex-col items-center justify-center lg:pt-72">
        <h1 className="z-10 w-full bg-myblue p-4 py-10  text-center text-4xl leading-10 text-white  lg:text-6xl">
          بەخێربێت بۆ{" "}
          <span className="block font-bold lg:inline">سەکۆی کولتور</span>
        </h1>
        <Image
          src="/hero-kurds.jpeg"
          alt="Hero Image - some kurds in sako"
          width={400}
          height={400}
          className="left-0 top-0 -z-10 w-screen opacity-60 lg:absolute lg:rounded-b-md"
        />
        <h2 className="w-full bg-white px-[5px] py-6 text-center text-lg text-myblue lg:w-3/4">
          شوێنێك بۆ کۆکردنەوە و بەکاربردنی هونەر و ئەدەبە کولتوریەکان کورد،
          زیندووکردنەوەیان
        </h2>
      </section>
      <section className="space-y-10 rounded-md bg-white py-10 pl-2 lg:rounded-none">
        <article className="flex w-full items-center gap-2  lg:flex-col">
          <Button
            asChild
            className=" w-1/2 rounded-none lg:w-[120px] lg:rounded-md"
          >
            <Link href="/quote">پەندی پێشینان</Link>
          </Button>
          <p className="w-1/2 text-center text-base text-myblue lg:w-full">
            لێرەدا دەتوانیت بگەڕێیت، بەنێو پەندی پێشینانی کوردا، ڕوونکردنەوەیان
            لەسەر بخوێنیتەوە
          </p>
        </article>
        <article className="flex w-full items-center gap-2 lg:flex-col">
          <Button
            asChild
            className=" w-1/2 rounded-none lg:w-[120px] lg:rounded-md"
          >
            <Link href="/poetry">شیعرەکان</Link>
          </Button>
          <p className=" w-1/2 text-center text-myblue lg:w-full">
            لێرەدە شیعر بدۆزەرەوە، بخوێنەوە، زانیاریان لەسەردا بخوێنەوە
          </p>
        </article>

        <article className="flex w-full items-center gap-2 lg:flex-col">
          <Button
            asChild
            className=" w-1/2 rounded-none lg:w-[120px] lg:rounded-md"
          >
            <Link href="/about">زانیاری</Link>
          </Button>
          <p className=" w-1/2 text-center text-myblue lg:w-full">
            لێرەدا زانیاری لەسەر وێبسایتەکەدا بخوێنەوە
          </p>
        </article>
      </section>
    </main>
  );
}

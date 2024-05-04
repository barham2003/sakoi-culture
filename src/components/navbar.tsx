import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between  bg-white px-2  py-2">
      <Link href="/" className="text-xl font-bold text-myblue">
        سەکۆ
      </Link>
      <ul>
        <li className=" flex justify-center gap-4 ">
          <Link href="/quote" className=" text-myblue">
            پەندی پێشینان
          </Link>
          <Link href="/poetry" className=" text-myblue">
            شیعر
          </Link>
          <Link href="/about" className=" text-myblue">
            دەربارە
          </Link>
        </li>
      </ul>
    </nav>
  );
}

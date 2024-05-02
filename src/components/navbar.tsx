import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white">
      <ul>
        <li className=" flex justify-center gap-4 px-4 py-2">
          <Link href="/about" className=" text-myblue">
            دەربارە
          </Link>
          <Link href="/poet" className=" text-myblue">
            شیعر
          </Link>
          <Link href="/" className=" text-myblue">
            پەندی پێشینان
          </Link>
        </li>
      </ul>
    </nav>
  );
}

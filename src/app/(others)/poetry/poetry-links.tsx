import Link from "next/link";
import React from "react";

export default function PoetryLinks() {
  return (
    <aside className="flex justify-between text-xs text-blue-900">
      <Link href="/poetry/list">بگەڕێ بۆ شیعر</Link>
      <Link href="/poetry/new">شیعر زیاد بکە</Link>
    </aside>
  );
}

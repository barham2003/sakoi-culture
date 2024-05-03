import Link from "next/link";
import React from "react";

export default function OtherLinks() {
  return (
    <aside className="flex justify-between text-xs text-blue-900">
      <Link href="/add-quote">پەند زیاد بکە</Link>
      <Link href="/search-quotes">بگەڕێ بۆ پەند</Link>
    </aside>
  );
}

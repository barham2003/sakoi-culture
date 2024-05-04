import Link from "next/link";
import React from "react";

export default function OtherLinks() {
  return (
    <aside className="flex justify-between text-xs text-blue-900">
      <Link href="/quote/search-quotes">بگەڕێ بۆ پەند</Link>
      <Link href="/quote/add-quote">پەند زیاد بکە</Link>
    </aside>
  );
}

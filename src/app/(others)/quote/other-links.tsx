import Link from "next/link";
import React from "react";

export default function OtherLinks() {
  return (
    <aside className="flex justify-between text-xs text-blue-900">
      <Link href="/quote/list">بگەڕێ بۆ پەند</Link>
      <Link href="/quote/new">پەند زیاد بکە</Link>
    </aside>
  );
}

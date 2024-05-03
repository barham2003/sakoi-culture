import React from "react";
import PoetryComponent from "./poetery-component";
import PoetryLinks from "./poetry-links";

export default function page() {
  return (
    <main>
      <PoetryLinks />
      <PoetryComponent />
    </main>
  );
}

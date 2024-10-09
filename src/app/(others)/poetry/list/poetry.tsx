import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PRE from "@/components/ui/pre";
import { Poetry } from "@/db/schema";
import Audio from "@/components/audio";

export default function PoetryItem({ poetry }: { poetry: Poetry }) {
  return (
    <div className="my-4">
      <Accordion collapsible type="single">
        <AccordionItem value="item-1" className="border-0  px-2">
          <AccordionTrigger>
            <h3 className=" font-bold">{poetry.title}</h3>
          </AccordionTrigger>
          <AccordionContent>
            {poetry.voice && <Audio audioFile={poetry.voice} />}

            <PRE className="overflow-x-auto overflow-y-hidden text-[0.8em] lg:text-lg">
              {poetry.text}
            </PRE>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="
  my-4 flex flex-wrap justify-start gap-4 border border-myblue p-2 text-sm
  "
    >
      {children}
    </li>
  );
}

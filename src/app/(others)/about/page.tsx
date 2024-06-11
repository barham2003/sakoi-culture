import { headers } from "next/headers";
import CopyQuoteApi from "./CopyQuoteApi";

export default function page() {
  return (
    <main className="space-y-3">
      <h1 className="text-center text-4xl font-bold text-myblue lg:text-6xl">
        دەربارە
      </h1>
      <div className="space-y-4 rounded-md bg-white p-4 text-myblue">
        <Section title="ئامانج">
          ئامانجی ئەم وێب ئاپە زیندووکردەوەی فۆلکلۆر و ئەدەب و هونەری کوردییە،
          لە ڕێگەی ئاسانکاری کردن بۆ دۆزینەوەیان و بەکاربردنیان، چ لەلایەن
          بەکارهێنەران و خوازیارانیەوە، چ لەلایەن پڕۆگرامسازانی دیکەوە کە
          دەتوانن سوود لە کردارەکانی وێبسایتەکەوە
        </Section>
        <Section title="بەکارهێنان">
          لەم وێبسایتەدا، تاکو ئێستە تەنها دوو بەشی سەرەکی هەن، یەکەمیان پەندی
          پێشینان و دووەمیان شیعرەکان، ئەم دوو بەشە هەردووکیان بە هەمان شێوە
          یارمەتی بەکارهێنەر دەدەن بۆ دۆزینەوە و گەڕان و دەرهێنانی نموونەیەك
        </Section>
        <Section title="بۆ بەرنامەسازەکان">
          بەرنامەسازەکان دەتوانن APIـەکەمان بەکاربێنن و سوودی لێ وەرگرن بۆ
          درووستکردن و بنیاتنانی بەرهەمەکانی خۆیان و ڕەنگداری بکەن بە فۆلکلۆری
          کوردی و پەندی پێشینان و شیعرە کوردیەکان
        </Section>
        <ul className="space-y-2 text-black">
          <li>
            بۆ شیعر: {"  "}
            <br />
            <CopyQuoteApi url={headers().get("host") + "/api/poetry"} />
          </li>{" "}
          <li>
            بۆ پەندی پێشینان: {"  "}
            <CopyQuoteApi url={headers().get("host") + "/api/quote"} />
          </li>
        </ul>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-right text-xl font-bold text-myblue underline underline-offset-8 lg:text-4xl">
        {title}
      </h2>
      <p>{children}</p>
    </section>
  );
}

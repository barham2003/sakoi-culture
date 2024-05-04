import { headers } from "next/headers";
import { hostname } from "os";

function myFunction() {
  // Get the text field
  let copyText = document.getElementById("myInput") as HTMLParagraphElement;

  // Select the text field
  copyText.innerText;

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.innerText);

  // Alert the copied text
  alert("Copied the text: " + copyText);
}

export default function page({}) {
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
        <ul className="text-black">
          <li>
            بۆ شیعر: {"  "}
            <span>{headers().get("host") + "/api/poetry"}</span>
          </li>{" "}
          <li>
            بۆ پەندی پێشینان: {"  "}
            <span>{headers().get("host") + "/api/quote"}</span>
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

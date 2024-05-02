import Image from "next/image";
import AddQuoteForm from "./add-quote/add-quote-form";
import OtherLinks from "./other-links";
import QuoteComponent from "./quote-component";
import QuotesList from "./quotes-list";

export default function Home() {
  return (
    <main className="py-20">
      {/* <AddQuoteForm /> */}
      <Image src="/piramerd.png" alt="" width={200} height={400} />
      <QuoteComponent />
      <OtherLinks />
      <QuotesList />
    </main>
  );
}

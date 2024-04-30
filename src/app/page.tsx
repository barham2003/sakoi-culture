import Image from "next/image";
import AddQuoteForm from "./add-quote-form";
import QuoteComponent from "./quote-component";

export default function Home() {
  return (
    <main>
      <AddQuoteForm />
      <QuoteComponent />
    </main>
  );
}

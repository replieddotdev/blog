import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "replied.dev" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <Header />
    </main>
  );
}

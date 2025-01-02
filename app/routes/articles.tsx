import { Outlet } from "@remix-run/react";
import { Header } from "~/components/Header";

export default function ArticlesLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

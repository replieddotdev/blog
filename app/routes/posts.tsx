import { Outlet } from "@remix-run/react";
import { Header } from "~/components/Header";

export default function PostsLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

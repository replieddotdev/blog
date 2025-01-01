import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/Header";
import { getTheme } from "~/lib/theme.server";

export const meta: MetaFunction = () => {
  return [
    { title: "replied.dev" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { theme } = await getTheme(request)
  return Response.json({
    theme,
  });
};

export default function Index() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <main>
      <Header theme={theme} />
    </main>
  );
}

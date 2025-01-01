import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/Header";
import { getTheme } from "~/lib/theme.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { theme } = await getTheme(request);
  return Response.json({
    theme,
  });
}

export default function PostsLayout() {
  const { theme } = useLoaderData<typeof loader>(); // Usa el tipo correctamente.

  return (
    <main>
      <Header theme={theme.theme} /> {/* theme está dentro del objeto retornado */}
      <Outlet />
    </main>
  );
}

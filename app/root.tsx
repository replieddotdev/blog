import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import "./tailwind.css";
import { getTheme } from "./lib/theme.server";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { useEffect, useState } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const headers = () => {
  return {
    "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const { theme, colorSchema } = await getTheme(request);
  return Response.json({ theme, colorSchema });
};

export function Layout({ children }: { children: React.ReactNode }) {
  // @TODO: move the color schema logic to a wrapper component
  const { theme, colorSchema: systemColorSchema } = useLoaderData<typeof loader>();

  const isDarkModeInTheBrowser = useMediaQuery('(prefers-color-scheme: dark)');
  const [colorSchema, setColorSchema] = useState(theme === "system" ? systemColorSchema : theme)


  useEffect(() => {
    if (theme === "system") {
      setColorSchema(isDarkModeInTheBrowser ? "dark" : "light")
    } else {
      setColorSchema(theme)
    }
  }, [theme, isDarkModeInTheBrowser])

  return (
    <html lang="es" className={colorSchema}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

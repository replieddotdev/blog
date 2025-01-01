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
import { ReactNode } from "react";
import { ThemeProvider, useTheme } from "./providers/Theme";

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
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;400;600&family=Inter:wght@100;400;500;600&display=swap"
  }
];

export const headers = () => {
  return {
    "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const { theme } = await getTheme(request);
  return Response.json({ theme });
};

function ThemeApplyWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme()
  return (
    <html lang="es" className={theme}>
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
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useLoaderData<typeof loader>() || {};

  return (
    <ThemeProvider preferredTheme={theme}>
      <ThemeApplyWrapper>
        {children}
      </ThemeApplyWrapper>
    </ThemeProvider>
  );
}

export default function App() {
  return <Outlet />;
}

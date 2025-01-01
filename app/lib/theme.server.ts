import { createCookieSessionStorage } from "@remix-run/node";

export type Theme = "light" | "dark" | "system";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    secure: process.env.NODE_ENV === "production",
    secrets: ["sUp3r-s3cr3t"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export async function getTheme(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  const theme = session.get("theme") as Theme | null;
  const colorSchema = request.headers.get("sec-ch-prefers-color-scheme");
  return {
    theme,
    colorSchema,
  };
}

export async function setTheme(request: Request, theme: Theme) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  session.set("theme", theme);
  return await themeStorage.commitSession(session);
}

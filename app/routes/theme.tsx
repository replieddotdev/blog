import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { setTheme, Theme } from "~/lib/theme.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const theme = formData.get("theme") as Theme | null;

  if (!theme || !["light", "dark", "system"].includes(theme)) {
    return Response.json({ error: "Theme must be light, dark, or system" }, { status: 400 });
  }

  const cookie = await setTheme(request, theme);
  return redirect(request.headers.get("Referer") ?? "/", {
    headers: { "Set-Cookie": cookie },
  });
};

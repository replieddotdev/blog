import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";

export default function Logo() {
  return (
    <Link
      to="/"
      className={cn(
        "font-mono text-xl text-black dark:text-white",
        "flex items-center gap-2",
        "hover:opacity-90 transition-opacity",
        "after:content-['|'] after:font-thin",
        "after:absolute after:right-[-0.5rem]",
        "after:top-1/2 after:-translate-y-1/2",
        "after:opacity-50 after:animate-blink",
        "relative"
      )}
    >
      <span className="text-blue-600">{'>'}</span>
      replied.dev
    </Link>
  );
}

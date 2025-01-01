import Logo from "~/components/Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
  return (
    <header className="border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a
              href="https://github.com/replieddotdev"
              className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

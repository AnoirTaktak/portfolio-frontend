import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition hover:scale-110 duration-300"
    >
      {theme === "light" ? (
        <Moon className="text-yellow-400 w-6 h-6" />
      ) : (
        <Sun className="text-yellow-300 w-6 h-6" />
      )}
    </button>
  );
}

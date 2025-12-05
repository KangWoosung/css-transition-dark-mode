"use client";
import { useEffect, useCallback, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeSelector = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = (newTheme: "light" | "dark", e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty("--x", x + "px");
    document.documentElement.style.setProperty("--y", y + "px");
    document.documentElement.style.setProperty("--r", endRadius + "px");

    setTheme(newTheme);
  };

  const updateTheme = useCallback((currentTheme: "light" | "dark") => {
    // for css properties
    document.documentElement.style.removeProperty("--theme");
    document.documentElement.style.setProperty("--theme", currentTheme);
    // for tailwind classes
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(currentTheme);
  }, []);

  // 초기 마운트 시 테마 설정
  useEffect(() => {
    updateTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // for old browsers
    if (!document.startViewTransition) {
      updateTheme(theme);
      return;
    }
    document.startViewTransition(() => {
      updateTheme(theme);
    });
  }, [theme, updateTheme]);

  return (
    <div className="flex gap-md items-center justify-center">
      <div className="flex gap-md items-center justify-center rounded-full dark:bg-gray-800 bg-gray-200  p-2 cursor-pointer">
        {theme === "dark" ? (
          <Moon onClick={(e) => toggleTheme("light", e)} />
        ) : (
          <Sun onClick={(e) => toggleTheme("dark", e)} />
        )}
      </div>
    </div>
  );
};

export default ThemeSelector;

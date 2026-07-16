import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

function Navbar() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode | null;
    const existingTheme = document.documentElement.getAttribute("data-theme") as ThemeMode | null;
    const preferredTheme = savedTheme || existingTheme || "dark";
    setTheme(preferredTheme);
    document.documentElement.setAttribute("data-theme", preferredTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("themeMode", nextTheme);
  };

  return (
    <div>
    <div id="Header">
      <p id="nameNav">Omair</p>
      <nav>
        <ul>
          <li><a href="#intro">home</a></li>
          <li><a href="#about">about</a></li>
          <li><a href="#experience">experience</a></li>
          <li><a href="#projects">projects</a></li>
          <li><a href="#contactContainer">contact</a></li>
        </ul>
      </nav>
      <button className="themeToggle" onClick={toggleTheme} type="button">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
    </div>
  );
}

export default Navbar;

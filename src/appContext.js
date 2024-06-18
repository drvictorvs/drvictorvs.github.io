import React from "react";
import { ThemeContext } from "styled-components";

import { Link, useLocation } from "react-router-dom";
import { scrollSpy } from "react-scroll";

const AppContext = React.createContext();

const AppProvider = function ({ children }) {
  const [themeName, setTheme] = React.useState("light");
  const [lang, setLang] = React.useState("en");
  const [isExpanded, setExpanded] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("Home");

  const toggleTheme = () => setTheme(themeName === "light" ? "dark" : "light");
  const toggleLang = () => setLang(lang === "en" ? "pt" : "en");

  const toggleExpanded = () => setExpanded((prevState) => !prevState);

  const closeExpanded = function () {
    setTimeout(function () {
      setExpanded(false);
    }, 250);
  };

  return (
    <AppContext.Provider
      value={{
        themeName,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
        isExpanded,
        toggleExpanded,
        closeExpanded,
        activeSection,
        setActiveSection
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

export const useTheme = () => React.useContext(ThemeContext);

export { AppContext, AppProvider };

import React from "react";

const AppContext = React.createContext();

const AppProvider = function ({ children }) {
  const [theme, setTheme] = React.useState("light");
  const [lang, setLang] = React.useState("en");
  const [isExpanded, setExpanded] = React.useState(false);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
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
        theme,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
        isExpanded,
        toggleExpanded,
        closeExpanded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

export { AppContext, AppProvider };

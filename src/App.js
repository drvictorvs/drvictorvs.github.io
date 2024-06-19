import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Element } from "react-scroll";
import { ThemeProvider } from "styled-components";
import { useAppContext } from "./appContext";
import { fetchGitHubRepos } from "./pages/allRepositoriesSlice";
import {
  fetchGitHubInfo,
  selectError,
  selectIsLoading,
} from "./pages/homeSlice";
// Components
import { Container } from "react-bootstrap";
import GlobalStyles from "./components/GlobalStyles";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import { Loading } from "./components/globalStyledComponents";
// Pages
import AllRepositories from "./pages/AllRepositories";
import FullPage from "./pages/FullPage";
import NotFound from "./pages/NotFound";
import { lightTheme, darkTheme } from "./ThemeClass";
import LangEN from './translations/LangEN';
import LangPT from './translations/LangPT';

const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;


export default function App() {
  const { themeName, setTheme, setLang, lang } = useAppContext();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const strings = lang === "en" ? LangEN.misc : LangPT.misc;

  if (!localStorage.getItem("langPref")) {
    if (navigator.languages.some((x) =>
      (x.match("pt")))) {
        setLang("pt")
    }
  }
  
  React.useEffect(
    function () {
      const updateTheme = () =>
        darkMode ? setTheme("dark") : setTheme("light");
      updateTheme();
      localStorage.setItem('themePref', themeName);
      dispatch(fetchGitHubInfo());
      dispatch(fetchGitHubRepos());
    },
    [setTheme, dispatch]
  );

  React.useEffect(
    function () {
      const updateLang = () =>
        lang === "en" ? setLang("pt") : setLang("en");
      updateLang();
      // document.title = strings.webpage;
      localStorage.setItem('langPref', lang);
    },
    [setLang, dispatch]
  );
  
  window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) =>
    e.matches ? setTheme("dark") : setTheme("light")
  );

  

  if (isLoading) {
    return (
      <ThemeProvider theme={themeName === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container className="d-flex vh-100 align-items-center">
      <Loading />
      </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <HashRouter>
      <ThemeProvider theme={themeName === "light" ? lightTheme : darkTheme}>
      <ScrollToTop />
      <GlobalStyles />
      <Element name={"Home"} id="home">
      <NavBar />
      </Element>
      <Routes>
      <Route exact path="/" element={<FullPage />} />
      <Route path="/AllRepositories" element={<AllRepositories />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
      </ThemeProvider>
      </HashRouter>
    );
  }
}

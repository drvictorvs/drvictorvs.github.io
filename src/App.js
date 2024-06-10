import React from "react";
import { useAppContext } from "./appContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGitHubInfo,
  selectError,
  selectIsLoading,
} from "./pages/homeSlice";
import { fetchGitHubReops } from "./pages/allRepositoriesSlice";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Element } from "react-scroll";
import { ThemeProvider } from "styled-components";
// Components
import { Container } from "react-bootstrap";
import { Loading } from "./components/globalStyledComponents";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyles from "./components/GlobalStyles";
import NavBar from "./components/NavBar";
// Pages
import Home from "./pages/Home";
import AllRepositories from "./pages/AllRepositories";
import NotFound from "./pages/NotFound";

import LangEN from './translations/LangEN';
import LangPT from './translations/LangPT';

import LightBG from "./images/theme-light.jpg";
import DarkBG from "./images/theme-dark.jpg";

const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const themes = {
  light: {
    name: "light",
    primary: "#FFBFAA",
    zeroary: "#FFD9CC",
    secondary: "#FF8F6A",
    color: "#45413C",
    imgColors: "#45413C",
    background: "#F5F2E8",
    overlay: "rgba(255, 255, 255, 0.6)",
    gradient: "linear-gradient(to left, #FFBFAA, #FF5722)",
    card: {
      bg: "transparent",
      shadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      footer: "transparent",
      link: "#45413C",
      linkHover: "#FFD9CC"
    },
    bgImg: LightBG,
  },
  dark: {
    name: "dark",
    primary: "#FF5722",
    zeroary: "#FF5722",
    secondary: "#F03D00",
    color: "#FBFDFF",
    imgColors: "#797B7B",
    background: "#27272A",
    overlay: "rgba(0, 0, 0, 0.6)",
    gradient: "linear-gradient(to right, #FF5722, #FFBFAA)",
    card: {
      bg: "#797B7B",
      shadow: "0 3px 10px rgb(255 255 255 / 0.2)",
      footer: "#404040",
      link: "#FBFDFF",
      linkHover: "#FF5722"
    },
    bgImg: DarkBG,
  },
};

export default function App() {
  const { theme, setTheme, lang } = useAppContext();
  const translations = lang === 'en' ? LangEN : LangPT;
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  
  React.useEffect(
    function () {
      const updateTheme = () =>
        darkMode ? setTheme("dark") : setTheme("light");
      updateTheme();
      dispatch(fetchGitHubInfo());
      dispatch(fetchGitHubReops());
    },
    [setTheme, dispatch]
  );
  
  window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) =>
    e.matches ? setTheme("dark") : setTheme("light")
);

if (isLoading) {
  return (
    <ThemeProvider theme={themes[theme]}>
    <GlobalStyles />
    <Container className="d-flex vh-100 align-items-center">
    <Loading />
    </Container>
    </ThemeProvider>
  );
} else if (error) {
  return (
    <ThemeProvider theme={themes[theme]}>
    <GlobalStyles />
    <Container className="d-flex vh-100 align-items-center justify-content-center">
    <h2>{error}</h2>
    </Container>
    </ThemeProvider>
  );
} else {
  return (
    <HashRouter>
    <ThemeProvider theme={themes[theme]}>
    <ScrollToTop />
    <GlobalStyles />
    <Element name={"Home"} id="home">
    <NavBar />
    </Element>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/All-Projects" element={<AllRepositories />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    </ThemeProvider>
    </HashRouter>
  );
}
}

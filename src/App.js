import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Element } from "react-scroll";
import { ThemeProvider } from "styled-components";
import { useAppContext } from "./appContext";
import { fetchGitHubReops } from "./pages/allRepositoriesSlice";
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
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import LangEN from './translations/LangEN';
import LangPT from './translations/LangPT';

import DarkBG from "./images/theme-dark.jpg";
import LightBG from "./images/theme-light.jpg";

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
      fg: "#404040",
      shadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      footer: "transparent",
      link: "#45413C",
      linkHover: "#FFD9CC"
    },
    bgImg: LightBG,
    filter: "invert(53%) sepia(85%) saturate(3345%) hue-rotate(341deg) brightness(96%) contrast(113%)",
    filterShadow: "drop-shadow(1px 1px 0px #45413C)",
    filterShadowHover: "drop-shadow(1px 1px 0px #FF5722)"
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
      bg: "#404040",
      fg: "#FBFDFF",
      shadow: "0 3px 10px rgb(255 255 255 / 0.2)",
      footer: "#303030",
      link: "#FBFDFF",
      linkHover: "#FF5722"
    },
    bgImg: DarkBG,
    filter: "invert(89%) sepia(88%) saturate(4248%) hue-rotate(293deg) brightness(98%) contrast(135%)",
    filterShadow: "drop-shadow(1px 1px 0px #45413C)",
    filterShadowHover: "drop-shadow(1px 1px 0px #FF5722)"
  },
};

export default function App() {
  const { themeName, setTheme, lang } = useAppContext();
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
    <ThemeProvider theme={themes[themeName]}>
    <GlobalStyles />
    <Container className="d-flex vh-100 align-items-center">
    <Loading />
    </Container>
    </ThemeProvider>
  );
} else if (error) {
  return (
    <ThemeProvider theme={themes[themeName]}>
    <GlobalStyles />
    <Container className="d-flex vh-100 align-items-center justify-content-center">
    <h2>{error}</h2>
    </Container>
    </ThemeProvider>
  );
} else {
  return (
    <HashRouter>
    <ThemeProvider theme={themes[themeName]}>
    <ScrollToTop />
    <GlobalStyles />
    <Element name={"Home"} id="home">
    <NavBar />
    </Element>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/AllRepositories" element={<AllRepositories />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    </ThemeProvider>
    </HashRouter>
  );
}
}

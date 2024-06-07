import React from "react";
import { useSelector } from "react-redux";
import { selectData } from "../pages/homeSlice";
// Components
import Theme from "../components/Theme";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { BackToTop } from "../components/globalStyledComponents";
import Footer from "../components/Footer";

import { useAppContext } from "./appContext";

import LangEN from './translations/LangEN';
import LangPT from './translations/LangPT';

export default function Home() {
  const { name } = useSelector(selectData);
  const lang = useAppContext();
  const strings = lang === "en" ? LangEN : LangPT;

  React.useEffect(
    function () {
      document.title = `${name} | ${strings.portfolio}`;
    },
    [name]
  );

  return (
    <>
      <Theme />
      <main>
        <AboutMe />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <BackToTop home={"Home"} />
      <Footer />
    </>
  );
}

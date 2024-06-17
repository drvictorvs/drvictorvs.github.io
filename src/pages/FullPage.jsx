import React from "react";
import { useSelector } from "react-redux";
import { useAppContext } from "../appContext";
import AboutMe from "../components/AboutMe";
import Activities from "../components/Activities";
import ContactMe from "../components/ContactMe";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Publications from "../components/Publications";
import Repositories from "../components/Repositories";
import LangEN from '../translations/LangEN';
import LangPT from '../translations/LangPT';
import { selectData } from "./homeSlice";

export default function FullPage() {
  const { name } = useSelector(selectData);
  const lang = useAppContext();
  const strings = lang === "en" ? LangEN.misc : LangPT.misc;

  React.useEffect(
    function () {
      document.title = `${strings.webpage}`;
    },
    [name, strings.webpage]
  );

  return (
    <>
      <Home />
      <main>
        <AboutMe />
        <Activities />
        <Publications />
        <Repositories />
        <ContactMe />
      </main>
      <Footer />
    </>
  );
}

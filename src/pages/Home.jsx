import React from "react";
import { useSelector } from "react-redux";
import { useAppContext } from "../appContext";
import AboutMe from "../components/AboutMe";
import Activities from "../components/Activities";
import ContactMe from "../components/ContactMe";
import Footer from "../components/Footer";
import Publications from "../components/Publications";
import Repositories from "../components/Repositories";
import Theme from "../components/Theme";
import { BackToTop } from "../components/globalStyledComponents";
import { selectData } from "../pages/homeSlice";
import LangEN from '../translations/LangEN';
import LangPT from '../translations/LangPT';

export default function Home() {
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
      <Theme />
      <main>
        <AboutMe />
        <Activities />
        <Publications />
        <Repositories />
        <ContactMe />
      </main>
      <BackToTop home={"Home"} />
      <Footer />
    </>
  );
}

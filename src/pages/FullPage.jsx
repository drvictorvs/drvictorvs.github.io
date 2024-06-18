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
import { selectData } from "./homeSlice";
import NavButtons from "../components/NavButtons";

export default function FullPage() {

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
      <NavButtons/>
    </>
  );
}

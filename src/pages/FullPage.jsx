import React from "react";
import About from "../components/About";
import Activities from "../components/Activities";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Publications from "../components/Publications";
import Repositories from "../components/Repositories";
import NavButtons from "../components/NavButtons";

export default function FullPage() {

  return (
    <>
      <Home />
      <main>
        <About />
        <Activities />
        <Publications />
        <Repositories />
        <Contact />
      </main>
      <NavButtons />
      <Footer />
    </>
  );
}

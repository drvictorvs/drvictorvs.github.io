import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
// Components
import { Container } from "react-bootstrap";
import { Title } from "./globalStyledComponents";
import ContactForm from "./ContactForm";
import { useAppContext } from "../appContext";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";

export const formspreeUrl = "https://formspree.io/f/drvictorvs";

const StyledSection = styled.section`
  min-height: 89vh;
  padding-bottom:var(--nav-height);
`;

export default function Contact() {
  const { lang } = useAppContext();
  const strings = lang === "en" ? LangEN.navMenu : LangPT.navMenu;

  return (
    <Element name={"Contact"} id="Contact">
      <StyledSection className="d-flex flex-column justify-content-center" >
        <Container className="d-flex">
          <Title>
            <h2>{strings.contact ? strings.contact : ""}</h2>
            <div className="underline"></div>
          </Title>
        </Container>
        <Container>
          <ContactForm />
        </Container>
      </StyledSection>
    </Element>
  );
}

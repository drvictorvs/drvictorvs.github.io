import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styled from "styled-components";
import { useAppContext, useTheme } from "../appContext";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Container, Nav, Navbar } from "react-bootstrap";
// import { FixedNavSpacer, ToggleSwitch } from "./globalStyledComponents";
// Images
// import Logo from "../images/logo.svg";
import { FlagENG, FlagPTB, Logo } from "./Resources";

import LangEN from '../translations/LangEN';
import LangPT from '../translations/LangPT';


// Theme Toggle
const StyledSwitch = styled.label`
  /* Slider pill */
  display: flex;
  width: 3.2rem;
  font-size: 1.5rem;
  border-radius: 30px;
  transition: var(--transition);
  border: 2px solid;
  cursor: pointer;

  /* Hide default checkbox */
  input[type="checkbox"] {
    height: 0;
    width: 0;
    opacity: 0;
  }

  /* Move span when checked */
  input[type="checkbox"]:checked + div {
    transform: translateX(100%);
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition);
  }
`;

const StyledPick = styled.label`
  display: flex;
  font-size: 1rem;
  border: 0px;
  margin-right: 2vw;
  cursor: pointer;

  /* Hide default checkbox */
  input[type="checkbox"] {
    height: 0;
    width: 0;
    opacity: 0;
  }

  #langSwitcher {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: var(--transition);
    width:5vw;
    height: max-content;
    flex-grow: 1;
    gap: 0.5rem;

    .flagContainer {
    }

    .langText {
    margin-left: 0.5vw;
    border-bottom: 1pt dotted;
    }
  }
`;

// Spacer for fixed Navigation bar
const FixedNavSpacer = styled.div`
  height: var(--nav-height);
`;

function ThemeToggle() {
  const { themeName, toggleTheme, closeExpanded } = useAppContext();

  return (
    <StyledSwitch onClick={closeExpanded}>
      <input
        type="checkbox"
        aria-label={`Toggle theme, currently ${themeName}.`}
        onClick={toggleTheme}
      />
      <div id="themeSwitcher">
        {themeName === "light" ? (
          <Icon icon="game-icons:sunflower" />
        ) : (
          <Icon icon="game-icons:moon" />
        )}
      </div>
    </StyledSwitch>
  );
}

function LangToggle() {
  const { lang, toggleLang, closeExpanded } = useAppContext();

  const msgStrings = lang === 'en' ? LangEN.messages : LangPT.messages;

  return (
    <StyledPick onClick={closeExpanded}>
      <input
        id="lang"
        type="checkbox"
        aria-label={`${msgStrings.langToggle} ${lang}.`}
        onClick={toggleLang}
      />
      <div id="langSwitcher">
        {lang === "en" ? (
          <><FlagPTB style={{height:"2rem", width:"2rem", background:"none"}} />
          <div className="langText">{LangPT.id.toUpperCase()}</div></>
        ) : (
          <><FlagENG style={{height:"2rem", width:"2rem", background:"none"}} /><div className="langText">{LangEN.id.toUpperCase()}</div></>
        )}
        
      </div>
    </StyledPick>
  );
}

export default function NavBar() {
  const { themeName, lang, isExpanded, closeExpanded, toggleExpanded } = useAppContext();
  const { pathname } = useLocation();
  const theme = useTheme();

  const navStrings = lang === 'en' ? LangEN.navmenu : LangPT.navmenu;

  const navLinks = {
    routes: [
      { id: "1R", name: navStrings.home, route: "/" },
      { id: "2R", name: navStrings.allRepositories, route: "/AllRepositories" },
    ],
    to: [
      { id: "1T", name: navStrings.home, to: "Home" },
      { id: "2T", name: navStrings.about, to: "AboutMe" },
      { id: "3T", name: navStrings.activities, to: "Activities" },
      { id: "4T", name: navStrings.publications, to: "Publications" },
      { id: "5T", name: navStrings.repositories, to: "Repositories" },
      { id: "6T", name: navStrings.contactMe, to: "ContactMe" },
    ],
};

  return (
    <>
      <FixedNavSpacer />
      <Navbar
        id="nav"
        collapseOnSelect={true}
        expand="lg"
        expanded={isExpanded}
        bg={themeName === "light" ? "light" : "dark"}
        variant={themeName === "light" ? "light" : "dark"}
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <Logo theme={theme} />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={toggleExpanded}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav navbarScroll className="me-auto">
              {pathname === "/"
                ? navLinks.to.map((el) => {
                    return (
                      <Nav.Item key={el.id}>
                        <ScrollLink
                          to={el.to}
                          spy={true}
                          activeClass="active"
                          className="nav-link"
                          onClick={closeExpanded}
                        >
                          {el.name}
                        </ScrollLink>
                      </Nav.Item>
                    );
                  })
                : navLinks.routes.map((el) => {
                    return (
                      <Nav.Item key={el.id}>
                        <Link
                          to={el.route}
                          className={
                            pathname === el.route
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={closeExpanded}
                        >
                          {el.name}
                        </Link>
                      </Nav.Item>
                    );
                  })}
            </Nav>
            <Nav>
              <LangToggle />
              <ThemeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

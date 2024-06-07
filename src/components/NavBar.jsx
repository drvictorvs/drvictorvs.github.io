import React from "react";
import { useAppContext } from "../appContext";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Container, Nav, Navbar } from "react-bootstrap";
// import { FixedNavSpacer, ToggleSwitch } from "./globalStyledComponents";
// Images
import Logo from "../images/logo.svg";
import { FlagUS, FlagBR } from "./Resources";

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

  /* Hide defualt checkbox */
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

// Spacer for fixed Navigation bar
const FixedNavSpacer = styled.div`
  height: var(--nav-height);
`;

function ThemeToggle() {
  const { theme, toggleTheme, closeExpanded } = useAppContext();

  return (
    <StyledSwitch onClick={closeExpanded}>
      <input
        type="checkbox"
        aria-label={`Toggle theme, currently ${theme}.`}
        onClick={toggleTheme}
      />
      <div>
        {theme === "light" ? (
          <svg icon="game-icons:sunflower" />
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
    <StyledSwitch onClick={closeExpanded}>
      <input
        type="checkbox"
        aria-label={`${msgStrings.langToggle} ${lang}.`}
        onClick={toggleLang}
      />
      <div>
        {lang === "en" ? (
          <FlagUS />
        ) : (
          <FlagBR />
        )}
      </div>
    </StyledSwitch>
  );
}

export default function NavBar() {
  const { theme, lang, isExpanded, closeExpanded, toggleExpanded } = useAppContext();
  const { pathname } = useLocation();

  const navStrings = lang === 'en' ? LangEN.navmenu : LangPT.navmenu;

  const navLinks = {
    routes: [
      { id: "1R", name: navStrings.home, route: "/" },
      { id: "2R", name: navStrings.allProjects, route: "/All-Projects" },
    ],
    to: [
      { id: "1T", name: navStrings.home, to: "Home" },
      { id: "2T", name: navStrings.about, to: "About" },
      { id: "3T", name: navStrings.skills, to: "Skills" },
      { id: "4T", name: navStrings.projects, to: "Projects" },
      { id: "4T", name: navStrings.publications, to: "Publications" },
      { id: "4T", name: navStrings.research, to: "Research" },
      { id: "5T", name: navStrings.contact, to: "Contact" },
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
        bg={theme === "light" ? "light" : "dark"}
        variant={theme === "light" ? "light" : "dark"}
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <img
              alt="Website Logo"
              src={Logo}
              width="35"
              height="35"
              className="rounded-circle"
            />
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

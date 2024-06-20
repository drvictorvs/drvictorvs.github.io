import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styled from "styled-components";
import { useAppContext, useTheme } from "../appContext";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Container, Nav, Navbar } from "react-bootstrap";
import LangEN from '../translations/LangEN';
import LangPT from '../translations/LangPT';
import { FlagENG, FlagPTB, Logo } from "./Resources";


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
  .langText {
      margin-left: 0.5vw;
      border-bottom: 1pt dotted;

      &:hover {
        filter:unset;
      } 
}
    display: flex;
    align-items: center;
    transition: var(--transition);
    width:5vw;
    margin-top: auto;
    margin-bottom: auto;
    flex-grow: 1;
    gap: 0.5rem;

    &:hover {
      color: ${({theme}) => theme.primary};

      svg {
    transition: var(--transition);
        filter:sepia(1);
        
        }
    }

    
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
        id="themeToggle"
        type="checkbox"
        aria-label={`Toggle theme, currently ${themeName}.`}
        onClick={toggleTheme}
      />
      <div id="themeSwitcher" >
        {themeName === "light" ? (
          <Icon icon="game-icons:sunflower" />
        ) : (
          <Icon icon="game-icons:moon" />
        )}
      </div>
    </StyledSwitch>
  );
}

const LangText = styled.div.attrs({className: "langText nav-item"})`
margin-right: 3vw;`

function LangToggle() {
  const { lang, toggleLang, closeExpanded } = useAppContext();

  const msgStrings = lang === 'en' ? LangEN.messages : LangPT.messages;

  return (
    <StyledPick onClick={closeExpanded}>
      <input
        id="langToggle"
        type="checkbox"
        aria-label={`${msgStrings.langToggle} ${lang}.`}
        onClick={toggleLang}
      />
      <div id="langSwitcher">
        {lang === "en" ? (
          <>
            <FlagPTB style={{height:"2rem", width:"2rem", background:"none"}} />
            <LangText>{LangPT.id.toUpperCase()}</LangText>
          </>
        ) : (
          <>
            <FlagENG style={{height:"2rem", width:"2rem", background:"none"}} />
            <LangText>{LangEN.id.toUpperCase()}</LangText>
          </>
        )}
        
      </div>
    </StyledPick>
  );
}

const StyledNavbar = styled(Navbar)`
.navbar-toggler {
  margin-right: var(--bs-gutter-x)
  }
`;

export default function NavBar() {
  const { themeName, isExpanded, closeExpanded, toggleExpanded, setActiveSection } = useAppContext();
  const { pathname } = useLocation();
  const theme = useTheme();

  const handleSetActive = (to) => {
    setActiveSection(to);
  };


  const navLinks = MakeNavLinks();

  return (
    <>
      <FixedNavSpacer />
      <StyledNavbar
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
                          onSetActive={handleSetActive}
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
              <LangToggle/>
              <ThemeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </>
  );
}

export function MakeNavLinks(){
  const { lang } = useAppContext();
  const navStrings = lang === 'en' ? LangEN.navMenu : LangPT.navMenu;

  return {
    routes: [
      { id: "1R", name: navStrings.home, route: "/" },
      { id: "2R", name: navStrings.allRepositories, route: "/AllRepositories" },
    ],
    to: [
      { id: "1T", name: navStrings.home, to: "Home" },
      { id: "2T", name: navStrings.about, to: "About" },
      { id: "3T", name: navStrings.activities, to: "Activities" },
      { id: "4T", name: navStrings.publications, to: "Publications" },
      { id: "5T", name: navStrings.repositories, to: "Repositories" },
      { id: "6T", name: navStrings.contact, to: "Contact" },
    ],

};
}
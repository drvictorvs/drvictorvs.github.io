import React from "react";
import { Link } from "react-scroll/modules";
import styled, { keyframes } from "styled-components";
// Icons
import { Icon } from "@iconify/react";
import { useAppContext } from "../appContext";
import { MakeNavLinks } from "./NavBar";
import { Tooltip } from "@mui/material";
import LangEN from '../translations/LangEN';
import LangPT from '../translations/LangPT';


// Back to top link
const StyledDiv = styled.div`
  position: fixed;
  bottom: calc(var(--min-footer-height) + 1.5rem);
  right: 1.5rem;
  visibility: hidden;

  .link-icons {
    color: ${({ theme }) => (theme.color)};
    margin-left: 1rem;
  }

  &.show-up {
    visibility: visible;
  }
`;

export default function NavigationButtons() {
  const [scrollY, setScrollY] = React.useState("");
  const up = React.useRef(null);
  const down = React.useRef(null);
  const [nextSection, setNextSection] = React.useState('AboutMe');
  const { activeSection } = useAppContext();
  const navLinks = MakeNavLinks();
  const { lang } = useAppContext();
  const navStrings = lang === 'en' ? LangEN.navmenu : LangPT.navmenu;

  
  React.useEffect(() => {
    // Function to calculate the next section based on the current active section
    const getNextSection = (navLinks, activeSection) => {
      const index = navLinks.to.findIndex((dict) => dict.to === activeSection);
      // Ensure we have a valid index and the next section exists
      const nextIndex = index >= 0 && index < navLinks.to.length - 1 ? index + 1 : 0;
      return navLinks.to[nextIndex].to;
    };// Update the nextSection state whenever the activeSection changes
    setNextSection(getNextSection(navLinks, activeSection));
  }, [activeSection, navLinks]);

  var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );


  React.useEffect(
    function () {
      function updateScrollY() {
        setScrollY(window.scrollY);

        if (scrollY) {
          up.current.classList.add("show-up");;
        } else if (scrollY === limit | scrollY !== 0 | nextSection === "Home") {
          up.current.classList.remove("show-up");
        }
        if (nextSection === "Home") {
          up.current.classList.remove("show-up");
        }
      }

      window.addEventListener("scroll", updateScrollY);

      return () => window.removeEventListener("scroll", updateScrollY);
    },
    [scrollY, nextSection]
  );

  return (
    <StyledDiv ref={up}>
      <Link to="Home" className="link-icons" >
      <Tooltip title={navStrings.home}>
        <Icon icon="fa6-solid:circle-chevron-up" />
        </Tooltip>
      </Link>
      <Link to={nextSection} className="link-icons">
      <Tooltip title={navStrings[nextSection.toLowerCase()]}>
        <Icon icon="fa6-solid:circle-chevron-down" />
        </Tooltip>
      </Link>
    </StyledDiv>
  );
}

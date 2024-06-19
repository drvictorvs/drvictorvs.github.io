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
  bottom: 4rem;
  right: 2rem;
  visibility: visible;
  
  display: flex;
  flex-direction: row;
  gap: 2vw;

  .link-icons {
    color: ${({ theme }) => (theme.color)};

  }

`;

export default function NavigationButtons() {
  const [scrollY, setScrollY] = React.useState("");
  const [nextSection, setNextSection] = React.useState('About');
  const [prevSection, setPrevSection] = React.useState('Contact');
  const [nextIcon, setNextIcon] = React.useState("fa6-solid:circle-chevron-down");
  const [prevIcon, setPrevIcon] = React.useState("fa6-solid:circle-arrow-down");
  const { activeSection } = useAppContext();
  const up = React.useRef(null);
  const navLinks = MakeNavLinks();
  const { lang } = useAppContext();
  const navStrings = lang === 'en' ? LangEN.navMenu : LangPT.navMenu;

  
  React.useEffect(() => {
    // Function to calculate the next section based on the current active section
    const getSomeSection = (navLinks, which, activeSection) => {
      const index = navLinks.to.findIndex((dict) => dict.to === activeSection);
      // Ensure we have a valid index and the next section exists
      if (which === "next") {
      const nextIndex = index >= 0 && index < navLinks.to.length - 1 ? index + 1 : 0;
      return navLinks.to[nextIndex].to;
    } else if (which === "prev") {
      const prevIndex = index === 0 ? navLinks.to.length - 1 : index - 1;
      return navLinks.to[prevIndex].to;
    }
    };// Update the nextSection state whenever the activeSection changes
    setPrevSection(getSomeSection(navLinks, "prev", activeSection));
    setNextSection(getSomeSection(navLinks, "next", activeSection));
  }, [activeSection, navLinks]);

  var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );


  React.useEffect(
    function () {
      function updateScrollY() {
        setScrollY(window.scrollY);
      }

      window.addEventListener("scroll", updateScrollY);

      return () => window.removeEventListener("scroll", updateScrollY);
    },
    [scrollY, prevSection, nextSection]
  );

  return (
    <StyledDiv ref={up}>
      <Link to={prevSection} className="link-icons up">
      <Tooltip title={navStrings[prevSection.toLowerCase()]}>
        <Icon icon="fa6-solid:circle-chevron-up" className="hidden" />
        </Tooltip>
      </Link>
      <Link to={nextSection} className="link-icons down">
      <Tooltip title={navStrings[nextSection.toLowerCase()]}>
        <Icon icon={nextIcon}/>
        </Tooltip>
      </Link>
    </StyledDiv>
  );
}

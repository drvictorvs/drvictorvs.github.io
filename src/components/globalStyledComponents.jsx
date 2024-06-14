import React from "react";
import { Link } from "react-scroll/modules";
import styled, { keyframes } from "styled-components";
// Icons
import { Icon } from "@iconify/react";
import { MakeNavLinks } from "./NavBar";

// Animations
export function NavigationButtons({ home, activeSection }) {
  const [scrollY, setScrollY] = React.useState("");
  const up = React.useRef(null);
  const [nextSection, setNextSection] = React.useState('AboutMe');
  const navLinks = MakeNavLinks();

  
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


  React.useEffect(
    function () {
      function updateScrollY() {
        setScrollY(window.scrollY);

        if (scrollY > 500) {
          up.current.classList.add("show-up");
        } else {
          up.current.classList.remove("show-up");
        }
      }

      window.addEventListener("scroll", updateScrollY);

      return () => window.removeEventListener("scroll", updateScrollY);
    },
    [scrollY]
  );

  return (
    <StyledDiv ref={up}>
      <Link to={home} className="link-icons">
        <Icon icon="fa6-solid:circle-chevron-up" />
      </Link>
      {nextSection !== "Home" && (
      <Link to={nextSection} className="link-icons">
        <Icon icon="fa6-solid:circle-chevron-down" />
      </Link>)}
    </StyledDiv>
  );
}


export const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinner = keyframes`
    to {
        transform: rotate(360deg)
    }
`;

// Loading Spinner
export const Loading = styled.div`
  display: inline-block;
  width: 5rem;
  height: 5rem;
  border: 5px solid;
  border-radius: 50%;
  border-top-color: ${({theme}) => theme.primary};
  margin: 1rem auto;
  animation: ${spinner} 0.6s linear infinite;
`;

// Titles
export const Title = styled.div`
  display: inline-block;
  margin: 0 auto;
  font-family: var(--secondary-font);
  text-align: center;

  .underline {
    height: 0.25rem;
    width: 75%;
    min-width: 3rem;
    border-radius: 0.25rem;
    background: var(--clr-primary-5);
    margin: 0 auto 1.5rem auto;
    background: ${({ theme }) => theme.gradient };
  }
`;

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

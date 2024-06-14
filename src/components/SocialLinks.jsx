import React from "react";
import styled from "styled-components";
import { useAppContext } from "../appContext";

import { ReactComponent as GScholarSVG } from "../images/g-scholar.svg";
import { ReactComponent as LattesSVG } from "../images/lattes.svg";
import { ReactComponent as OrcidSVG } from "../images/orcid-id.svg";

const StyledSocialLinks = styled.div.attrs({className: "d-flex align-items-center justify-content-center"})`
  gap: 1vw;

  svg {
    margin: 0 1rem;
    transition: .5s;
  }

  .social-icon {
    height: 5vh;
    width: 5vh;
    color: ${({theme}) => theme.color};

    &:hover {
      color: ${({theme}) => theme.primary};
    }
  }

`;



const LattesIcon = ({href}) => {
  return(
  <div className="social-icon">
    <a href={href} rel="noopener" className="social-icon">
      <LattesSVG className="social-icon" />
    </a>
  </div>);
}

const GScholarIcon = ({href}) => {
  return(
  <div className="social-icon">
    <a href={href} rel="noopener" className="social-icon">
      <GScholarSVG className="social-icon" />
    </a>
  </div>);
}

const OrcidIcon = ({href}) => {
  return(
  <div className="social-icon">
    <a href={href} rel="noopener" className="social-icon">
      <OrcidSVG className="social-icon" />
    </a>
  </div>);
}

export default function SocialLinks() {
  const { lang } = useAppContext();
  return (
    <StyledSocialLinks id="socialLinks">
      <LattesIcon href={"https://lattes.cnpq.br/2672621453842181"} />
      <GScholarIcon href={"https://scholar.google.com/citations?user=P6yJUbYAAAAJ&hl=" + lang}/>
      <OrcidIcon href={"https://orcid.org/0000-0001-9786-8217"}/>
    </StyledSocialLinks>
  );
}
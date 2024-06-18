import { Tooltip } from "@mui/material";
import React from "react";
import styled, { useTheme } from "styled-components";
import { useAppContext } from "../appContext";
import { ReactComponent as GScholarSVG } from "../images/g-scholar.svg";
import { ReactComponent as LattesSVG } from "../images/lattes.svg";
import { ReactComponent as OrcidSVG } from "../images/orcid-id.svg";

const SocialLinksBox = styled.div.attrs({className: "d-flex align-items-center justify-content-center", id:"socialLinks"})`
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
      <Tooltip title={"Lattes"} id="LattesIcon" arrow>
      <LattesSVG className="social-icon" />
      </Tooltip>
    </a>
  </div>);
}

const GScholarIcon = ({href}) => {
  return(
  <div className="social-icon">
    <a href={href} rel="noopener" className="social-icon">
      <Tooltip title={"Google Scholar"} id="GScholarIcon" arrow>
      <GScholarSVG className="social-icon" />
      </Tooltip>
    </a>
  </div>);
}

const OrcidIcon = ({href}) => {
  return(
  <div className="social-icon">
    <a href={href} rel="noopener" className="social-icon">
      <Tooltip title={"orcid iD"} id="OrcidIcon" arrow>
      <OrcidSVG className="social-icon" />
      </Tooltip>
    </a>
  </div>);
}

export default function SocialLinks() {
  const { lang } = useAppContext();
  const theme = useTheme();

  return (
    <SocialLinksBox>
      <style dangerouslySetInnerHTML={{__html: `
        .MuiTooltip-tooltip { 
        background: ${theme.background}; 
        color:${theme.color}
      }
        .MuiTooltip-arrow {
        color: ${theme.background}; 
        }`}}></style>
      <LattesIcon href={"https://lattes.cnpq.br/2672621453842181"} />
      <GScholarIcon href={"https://scholar.google.com/citations?user=P6yJUbYAAAAJ&hl=" + lang} />
      <OrcidIcon href={"https://orcid.org/0000-0001-9786-8217"}/>
    </SocialLinksBox>
  );
}
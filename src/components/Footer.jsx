import styled from "styled-components";
// Components
import SocialLinks from "./SocialLinks";

const StyledFooter = styled.footer`
  min-height: var(--min-footer-height);
  background: ${({theme}) => theme.imgColors };

  a {
    color: ${({theme}) => theme.primary };

    &:hover {
      color: ${({theme}) => theme.tertiary };
    }
  }

  @media screen and (max-width:700px) {
    #footer {
      }
  }
`;

export default function Footer() {
  return (
    // <Element name={"Footer"} id="Footer">
    <StyledFooter className="d-flex align-items-center justify-content-center p-2">
      {/* <SocialLinks /> */}
    </StyledFooter>
    // </Element>
  );
}

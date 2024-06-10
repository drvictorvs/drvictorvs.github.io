import styled from "styled-components";
// Components
import SocialLinks from "./SocialLinks";

const StyledFooter = styled.footer`
  min-height: var(--min-footer-height);
  background: ${({theme}) => theme.background };

  a {
    color: ${({theme}) => theme.card.link };

    &:hover {
      color: ${({theme}) => theme.card.linkHover };
    }
  }
`;

export default function Footer() {
  return (
    <StyledFooter className="d-flex align-items-center justify-content-center p-2">
      <SocialLinks />
    </StyledFooter>
  );
}

import styled from "styled-components";
// Components
import SocialLinks from "./SocialLinks";
import { Container } from "react-bootstrap";
import { Title } from "./globalStyledComponents";
import { useAppContext } from "../appContext";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";

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
  const { lang } = useAppContext();
  const strings = lang === "en" ? LangEN : LangPT;
  return (
    <section className="section">
    <Container className="text-center">
    <Title>
    <h2>{strings.navMenu.footer}</h2>
    <div className="underline"></div>
    </Title>
    <StyledFooter className="d-flex align-items-center justify-content-center p-2" id="footer">
      <SocialLinks />
    </StyledFooter>
    </Container>
    </section>
  );
}

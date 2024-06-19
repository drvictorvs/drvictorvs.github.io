import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import styled from "styled-components";
import { useAppContext } from "../appContext";
import { selectData } from "../pages/homeSlice";
// Icons
import { Icon } from "@iconify/react";
// Media
import DarkBG from "../images/theme-dark.jpg";
import LightBG from "../images/theme-light.jpg";
// Components
import { Col, Container, Row } from "react-bootstrap";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";
import { BigLogo } from "./Resources";
import SocialLinks from "./SocialLinks";
import { Title } from "./globalStyledComponents";


const StyledTheme = styled.header`
  position: relative;
  display: grid;
  place-items: center;
  max-width: 1920px;
  margin: 0 auto;
  min-height: calc(100vh - var(--nav-height));

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradient };
    z-index: -2;
  }

  /* Overlay for contrast */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.overlay };
    z-index: -1;
  }

  .down-container {
    height: 10rem;
  }

  h1, h2, svg.logo-img > g > path {
    transition: 0.5s ease-in;
  }

  h1:hover, h2:hover {
    color: ${({ theme }) => theme.primary };
  }

  svg.logo-img:hover > g > path {
    color: ${({ theme }) => theme.secondary };
  }

  @media screen and (min-width: 1180px) {
    &::before {
      background: ${({ theme }) => theme.name === "light"
          ? `url(${LightBG}) center center fixed no-repeat`
          : `url(${DarkBG}) center center fixed no-repeat`};
      background-size: 100vw auto;
    }
  }

  @media screen and (min-width: 1367px) {
    &::before {
      background: ${({ theme }) => theme.name === "light"
          ? `url(${LightBG}) center center fixed no-repeat`
          : `url(${DarkBG}) center center fixed no-repeat`};
      background-size: cover;
    }
  }
`;


export default function Theme() {
  const { name } = useSelector(selectData);
  // const { theme } = useTheme();
  const { lang } = useAppContext();
  const strings = lang === "en" ? LangEN.misc : LangPT.misc;

  return (
    <StyledTheme>
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1 className="mb-1 display-3 title">{name ? name : "Dr. Victor Vasconcelos"}</h1>
            <Title>
              <h2 style={{marginBottom: "3vh", fontFamily: "var(--primary-font)"}}>{strings.desc}</h2>
            </Title>
            <SocialLinks />
          </Col>
          <Col className="d-md-block d-none">
            <BigLogo />
          </Col>
        </Row>
        <Row className="align-items-end down-container">
          <Col className="m-4 text-center">
            {/* <Link to={"About"} className="link-icons">
              <Icon icon="fa6-solid:circle-chevron-down" />
            </Link> */}
          </Col>
        </Row>
      </Container>
    </StyledTheme>
  );
}

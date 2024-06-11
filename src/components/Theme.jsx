import { useSelector } from "react-redux";
import { useAppContext, useTheme } from "../appContext";
import { ThemeContext } from "styled-components";
import { selectData } from "../pages/homeSlice";
import { Link } from "react-scroll";
import styled from "styled-components";
// Icons
import { Icon } from "@iconify/react";
// Media
import LightBG from "../images/theme-light.jpg";
import DarkBG from "../images/theme-dark.jpg";
// Components
import { Col, Container, Row } from "react-bootstrap";
import SocialLinks from "./SocialLinks";
import { BigLogo } from "./Resources"


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
  const { theme } = useTheme();

  return (
    <StyledTheme>
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1 className="mb-3 display-3 title">{name}</h1>
            <div className="d-flex align-items-center justify-content-center">
              <SocialLinks />
            </div>
          </Col>
          <Col className="d-none d-md-block">
            <BigLogo />
          </Col>
        </Row>
        <Row className="align-items-end down-container">
          <Col className="m-4 text-center">
            <Link to={"AboutMe"} className="link-icons">
              <Icon icon="fa6-solid:circle-chevron-down" />
            </Link>
          </Col>
        </Row>
      </Container>
    </StyledTheme>
  );
}

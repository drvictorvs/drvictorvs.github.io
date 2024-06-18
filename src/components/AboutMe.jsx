import { useSelector } from "react-redux";
import { Element } from "react-scroll";
import styled from "styled-components";
import { useAppContext } from "../appContext";
import { selectData } from "../pages/homeSlice";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";
// Data
// import { moreInfo } from "../data";
// Components
import { Col, Container, Row } from "react-bootstrap";
import { Title } from "./globalStyledComponents";
import EqualityImg from "../images/equality.svg";
import fallbackAvatar from "../images/fallback-avatar.png";

const StyledAboutMe = styled.section`

  p {
    font-size: 1.25rem;
  }
  .img {
    width: 18rem;
    height: 18rem;
  }

  @media screen and (max-width: 700px) {
    p {
      font-size: 1rem;
    }

    .mt-5 {
      margin-top: 1vh !important;
    }
  }

  a {
    color: ${({theme}) => theme.color};
  }

`;

export default function AboutMe() {
  const { avatar_url } = useSelector(selectData);
  const { lang } = useAppContext();
  const strings = lang === "en" ? LangEN.misc : LangPT.misc;

  return (
    <Element name={"AboutMe"} id="aboutMe">
      <StyledAboutMe className="section">
        <Container>
          <Container className="d-flex">
            <Title>
              <h2>{strings.aboutMe}</h2>
              <div className="underline"></div>
            </Title>
          </Container>
          <Row className="">
            <Col className="text-center">
              <Container>
                {strings.moreInfo && <p>{strings.moreInfo}</p>}
              </Container>
            </Col>
            <Col className="d-none d-md-block text-center">
            
          <Container className="d-flex" style={{flexDirection:"column",
            alignContent: "center",
            justifyContent: "center",
            flexWrap: "wrap"}}>
              <img
                src={avatar_url ? avatar_url : fallbackAvatar}
                alt=""
                loading="lazy"
                className="mx-auto rounded-circle"
                style={{ width: "15rem", height: "max-content", marginBottom: "3vh" }}
              />

              <a 
              href="https://www.un.org/en/about-us/universal-declaration-of-human-rights" 
              target="_blank" 
              rel="noopener">
                <img src={EqualityImg} height={"40px"} width={"185px"} style={{alignSelf:"center"}}/>
              </a>
                </Container>
            </Col>
          </Row>
        </Container>
      </StyledAboutMe>
    </Element>
  );
}

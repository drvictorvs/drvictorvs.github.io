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
import DOMPurify from 'dompurify';
import { Col, Container, Row } from "react-bootstrap";
import fallbackAvatar from "../images/fallback-avatar.png";
import { Title } from "./globalStyledComponents";

const StyledAbout = styled.section`
  p {
      font-size: 1.25rem;
      padding: 0 0 0 0;
  }
  .img {
    width: 18rem;
    height: 18rem;
  }
  .about-pic {
    flex-direction: column;
  }
  #aboutPic {
    flex-direction: column;
  }

    

  a {
    color: ${({theme}) => theme.primary};
    transition: 0.5s ease-in;
    text-decoration: underline;
    text-decoration-style: dotted;
    text-decoration-thickness: from-font;

    &:hover {
    color: ${({theme}) => theme.secondary};
    }
  }

  
  @media screen and (max-width: 1179px) {
    p {
      font-size: 2.1vh;
      max-height:60vh;
      padding: 0 0 0 0;
      margin-bottom: 0;
      text-wrap: pretty;
    }

    .mt-5 {
      margin-top: 1vh !important;
    }

    #aboutPic {
      flex-flow: row;
    }
  }


`;


export default function About() {
  const { avatar_url } = useSelector(selectData);
  const { lang } = useAppContext();
  const strings = lang === "en" ? LangEN.misc : LangPT.misc;
  const cleanInfo = DOMPurify.sanitize(strings.moreInfo);

  return (
    <Element name={"About"} id="about">
      <StyledAbout className="section">
        <Container style={{
            justifyContent: 'space-evenly',
            display: 'flex',
            flexDirection: 'column',
            height: "calc(100vh - var(--nav-height) - var(--min-footer-height))"}}
        >
          <Container className="d-flex">
            <Title>
              <h2>{strings.about}</h2>
              <div className="underline"></div>
            </Title>
          </Container>
          <Row className="d-flex" style={{rowGap: "2vh"}}>
            <Col className="text-center">
              <Container className="text-center" style={{alignSelf: "center"}}>
                {strings.moreInfo && <p dangerouslySetInnerHTML={{__html: cleanInfo}}/>}
              </Container>
            </Col>
            <Col className="d-flex text-center" id="aboutPic"
            style={{
              flexWrap: 'nowrap',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              rowGap: "2vh" }}>
              <div className="d-flex about-pic" style={{
                alignItems: "center",
                justifyContent: "center" }}>
                  <img
                    src={avatar_url ? avatar_url : fallbackAvatar}
                    alt=""
                    loading="lazy"
                    className="rounded-circle"
                    style={{ width: "25vw", height: "25vw", maxHeight: "275px", maxWidth: "275px", alignSelf:"center", flexShrink: 1 }}
                  />
                  </div>
            {/* </Col> */}
            {/* <Col className="d-md-block text-center"> */}
                  {/* </Container> */}
            </Col>
          </Row>
        </Container>
      </StyledAbout>
    </Element>
  );
}

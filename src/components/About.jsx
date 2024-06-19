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
import EqualityImg from "../images/equality.svg";
import fallbackAvatar from "../images/fallback-avatar.png";
import { Title } from "./globalStyledComponents";

const StyledAbout = styled.section`
  height:100vh;
  text-size-adjust:60%;
  p {
      font-size: 1.25rem;
      text-size-adjust:60%;
      padding: 0 0 0 0;
  }
  .img {
    width: 18rem;
    height: 18rem;
  }
    .about-pic {
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

  
  @media screen and (max-width: 700px) {
    p {
      font-size: 2.1vh;
      text-size-adjust:60%;
      max-height:60vh;
      padding: 0 0 0 0;
      margin-bottom: 0;
    }

    .mt-5 {
      margin-top: 1vh !important;
    }

    .about-pic {
    flex-direction: row;
    }
  }


`;

const equalityImgStyle = {
    maxHeight: '40px',
    maxWidth: '180px',
    borderRadius: '3pt',
    border: '2pt solid black'
  };

export default function About() {
  const { avatar_url } = useSelector(selectData);
  const { lang } = useAppContext();
  const strings = lang === "en" ? LangEN.misc : LangPT.misc;
  const cleanInfo = DOMPurify.sanitize(strings.moreInfo);

  return (
    <Element name={"About"} id="about">
      <StyledAbout className="section">
        <Container style={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column'}}
        >
          <Container className="d-flex">
            <Title>
              <h2>{strings.about}</h2>
              <div className="underline"></div>
            </Title>
          </Container>
          <Row className="d-flex">
            <Col className="text-center">
              <Container>
                {strings.moreInfo && <p dangerouslySetInnerHTML={{__html: cleanInfo}}/>}
              </Container>
            </Col>
            <Col className="d-md-block text-center">
              <Container className="d-flex about-pic" style={{
                alignItems: "center",
                justifyContent: "center",
                gap: "2vh",
                marginTop: "2vh"}}>
                  <img
                    src={avatar_url ? avatar_url : fallbackAvatar}
                    alt=""
                    loading="lazy"
                    className="rounded-circle"
                    style={{ width: "15vw", height: "15vw", alignSelf:"center" }}
                  />

                  <a 
                  href="https://www.un.org/en/about-us/universal-declaration-of-human-rights" 
                  target="_blank" 
                  rel="noopener">
                    <img src={EqualityImg} style={equalityImgStyle}/>
                  </a>
                  </Container>
            </Col>
          </Row>
        </Container>
      </StyledAbout>
    </Element>
  );
}

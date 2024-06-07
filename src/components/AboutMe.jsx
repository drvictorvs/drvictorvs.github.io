import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectData } from "../pages/homeSlice";
import { Element } from "react-scroll";
import { useAppContext } from "../appContext"
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";
// Data
// import { moreInfo } from "../data";
// Components
import { Col, Container, Row } from "react-bootstrap";
import { Title } from "./globalStyledComponents";

const StyledAboutMe = styled.section`
  p {
    font-size: 1.25rem;
  }
  .img {
    width: 18rem;
    height: 18rem;
  }
`;

export default function AboutMe() {
  const { avatar_url, bio } = useSelector(selectData);
  const lang = useAppContext();
  const strings = lang === "en" ? LangEN : LangPT;
  
  const moreInfo =
    "Licensed neuropsychologist and a University of Brasilia alumnus. Doctorate and Master's degree were both sought under the guidance of Prof. Dr. Cristiane Faiad in the Psychological Assessment and Instrumentation concentration of the Post-Graduate Program of Social, Work and Organizational Psychology—also at the University of Brasília. Specialized in the use of programming resources in Education and Psychometrics (Statistical Modeling, Psychological and Educational Assessment). Experience in statistical analysis in biomedical sciences, neurosciences and psychology. Worked for two years in psychopharmacology labs, using either oral or intrahypocampal perfusion methodology. Currently working as a psychometrician at the National Institute of Study and Research in Education.";

  return (
    <Element name={"About"} id="about">
      <StyledAboutMe className="section">
        <Container>
          <Container className="d-flex">
            <Title>
              <h2>${strings.aboutMe}</h2>
              <div className="underline"></div>
            </Title>
          </Container>
          <Row className="align-items-center mt-5">
            <Col className="d-flex flex-column text-center">
              <Container>
                <p>{bio}</p>
                {moreInfo && <p>{moreInfo}</p>}
              </Container>
            </Col>
            <Col className="d-none d-md-block text-center">
              <img
                src={avatar_url}
                alt="GitHub Avatar"
                loading="lazy"
                className="mx-auto rounded-circle"
                style={{ width: "15rem", height: "15rem" }}
              />
            </Col>
          </Row>
        </Container>
      </StyledAboutMe>
    </Element>
  );
}

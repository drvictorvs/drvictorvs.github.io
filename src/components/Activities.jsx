import { Element } from "react-scroll";
import styled from "styled-components";
import { useAppContext, useTheme } from "../appContext";
// Components
import { Col, Container, Row } from "react-bootstrap";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";
import {
  EmotionalIntellectualAssessment as EIAssessment,
  IntellectualAssessment,
  Neuropsychology,
  Psychometrics,
  Psychopharmacology,
  Python,
  R,
  ResearchDesign,
  StatisticalModeling
} from "./Resources";
import { Title } from "./globalStyledComponents";

export default function Activities() {
  const { themeName, lang } = useAppContext();
  const theme = useTheme();
  const strings = lang === "en" ? LangEN : LangPT;
  const s = lang === "en" ? LangEN.skills : LangPT.skills;

  
  const skillData = [
  {
    id: 1,
    skill: <Neuropsychology theme={theme} />,
    name: s.neuropsychology,
  },
  {
    id: 2,
    skill: <Psychometrics theme={theme} />,
    name: s.psychometrics,
  },
  {
    id: 3,
    skill: <Psychopharmacology theme={theme} />,
    name: s.psychopharmacology,
  },
  {
    id: 4,
    skill: <IntellectualAssessment theme={theme} />,
    name: s.intellectualAssessment,
  },
  {
    id: 5,
    skill: <EIAssessment theme={theme} />,
    name: s.emotionalIntellectualAssessment,
  },
  {
    id: 6,
    skill: <ResearchDesign theme={theme} />,
    name: s.researchDesign,
  },
  {
    id: 7,
    skill: <Python theme={theme} />,
    name: s.python,
  },
  {
    id: 8,
    skill: <StatisticalModeling theme={theme} />,
    name: s.statisticalModeling,
  },
  {
    id: 9,
    skill: <R theme={theme} />,
    name: s.langR,
  },
];

const Activities = styled(Element)`
@media screen and (max-width: 600px) {
  figure {
  }
  figcaption {
    font-size: max(0.8em,0.8vw);
  }
}
  figcaption 
`

  return (
    <Activities name={"Activities"} id="activities">
      <section className="section">
        <Container className="text-center">
          <Title>
            <h2>{strings.navmenu.activities}</h2>
            <div className="underline"></div>
          </Title>
          <Row className="mt-3 align-items-center">
            {skillData.map((skills) => {
              return (
                <Col xs={4} key={skills.id} className="my-md-5">
                  <figure>
                    {skills.skill}
                    <figcaption style={{ marginTop: "2vh"}}>{skills.name}</figcaption>
                  </figure>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </Activities>
  );
}

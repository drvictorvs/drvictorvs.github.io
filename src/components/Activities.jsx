import { Element } from "react-scroll";
import styled from "styled-components";
import { useAppContext, useTheme } from "../appContext";
// Components
import { Col, Container, Row } from "react-bootstrap";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";
import {
  EIAssessment as EIAssessment,
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

const ActivitiesStyle = styled(Element)`
  @media screen and (max-width: 600px) {
    
    figcaption {
      font-size: max(0.8em,0.8vw);
      text-overflow:ellipsis;
      max-width: 33vw;
      cursor: pointer;
      margin-top: 2vh;
    }
    
  }

  figure.activities-img > svg {
    flex-grow: 1;
    height: 15vh;
    width: 15vw;
    transition: 0.5s ease-in-out;
  }

  figure.activities-img svg path:hover {
    color: ${(theme) => theme.primary} !important;
  }

  figcaption.activities-caption {
      margin-top: 2vh;
  }

  .activities-box {
    // border: 2pt solid currentColor;
    // border-radius: 5px;
    // border-style: outset;
    flex-grow: 1;
    height: 25vh;
    align-content: center;
  }
`;

export default function Activities() {
  const { lang } = useAppContext();
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
      name: s.EIAssessment,
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
  
  
  
  return (
    <ActivitiesStyle name={"Activities"} id="activities">
    <section className="section">
    <Container className="text-center">
    <Title>
    <h2>{strings.navMenu.activities}</h2>
    <div className="underline"></div>
    </Title>
    <Row className="align-items-center">
    {skillData.map((skills) => {
      return (
        <Col xs={4} key={skills.id} className="my-md-1 activities-box">
        <figure className="activities-img">
        {skills.skill}
        <figcaption className="activities-caption">{skills.name}</figcaption>
        </figure>
        </Col>
      );
    })}
    </Row>
    </Container>
    </section>
    </ActivitiesStyle>
  );
}

import { Element } from "react-scroll";
import { useAppContext } from "../appContext";
// Components
import { Button, Col, Container, Row } from "react-bootstrap";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";
import {
  EmotionalIntellectualAssessment, IntellectualAssessment,
  Neuropsychology,
  Psychometrics, Psychopharmacology,
  Python, R,
  ResearchDesign, StatisticalModeling
} from "./Resources";
import { Title } from "./globalStyledComponents";

const resume = null;

export default function Activity() {
  const { theme, lang } = useAppContext();
  const strings = lang === "en" ? LangEN.skills : LangPT.skills;

  
  const skillData = [
  {
    id: 1,
    skill: <Neuropsychology />,
    name: strings.neuropsychology,
  },
  {
    id: 2,
    skill: <Psychometrics />,
    name: strings.psychometrics,
  },
  {
    id: 3,
    skill: <Psychopharmacology />,
    name: strings.psychopharmacology,
  },
  {
    id: 4,
    skill: <IntellectualAssessment />,
    name: strings.intellectualAssessment,
  },
  {
    id: 5,
    skill: <EmotionalIntellectualAssessment />,
    name: strings.emotionalIntellectualAssessment,
  },
  {
    id: 6,
    skill: <ResearchDesign/>,
    name: strings.researchDesign,
  },
  {
    id: 7,
    skill: <Python />,
    name: strings.python,
  },
  {
    id: 8,
    skill: <StatisticalModeling />,
    name: strings.statisticalModeling,
  },
  {
    id: 9,
    skill: <R />,
    name: strings.langR,
  },
];

  return (
    <Element name={"Skills"} id="skills">
      <section className="section">
        <Container className="text-center">
          <Title>
            <h2>Skills</h2>
            <div className="underline"></div>
          </Title>
          <Row className="mt-3 align-items-center">
            {skillData.map((skills) => {
              return (
                <Col xs={4} key={skills.id} className="my-md-5">
                  <figure>
                    {skills.skill}
                    <figcaption>{skills.name}</figcaption>
                  </figure>
                </Col>
              );
            })}
          </Row>
          {resume && (
            <a href={resume}>
              <Button
                size="lg"
                variant={theme === "light" ? "outline-dark" : "outline-light"}
                className="mt-5"
              >
                R&eacute;sum&eacute;
              </Button>
            </a>
          )}
        </Container>
      </section>
    </Element>
  );
}

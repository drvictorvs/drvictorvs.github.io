import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Element } from "react-scroll";
import { useAppContext } from "../appContext";
import { importAll } from './Resources';
import PublicationCard from "./PublicationCard";
import { Title } from "./globalStyledComponents";
import LangEN from '../translations/LangEN';
import LangPT from '../translations/LangPT';

const imgs = importAll(require.context('../images/scientific', false, /\.png$/));

const mainResearch = [{
  id: 0,
  image: imgs['pbjs2015.png'],
  name: "Effects of Oral Vitamin C Supplementation on Anxiety in Students: A Double-Blind, Randomized, Placebo-Controlled Trial",
  authors: "Ivaldo Jesus Lima de Oliveira, Victor Vasconcelos de Souza, Vitor Motta and Sérgio Leme da-Silva",
  publication: "",
  read_url: "https://www.researchgate.net/profile/Victor-Vasconcelos-7/publication/276311783_Effects_of_Oral_Vitamin_C_Supplementation_on_Anxiety_in_Students_A_Double-Blind_Randomized_Placebo-Controlled_Trial/links/592daf46aca272fc55aed6a7/Effects-of-Oral-Vitamin-C-Supplementation-on-Anxiety-in-Students-A-Double-Blind-Randomized-Placebo-Controlled-Trial.pdf",
  main_url: "https://pubmed.ncbi.nlm.nih.gov/26353411/",
  website_name: "PubMed"
}, 
{
  id: 1,
  image: imgs['eip2018.png'],
  name: "Psychometric Properties of the ISSL in the Context of Public Security",
  authors: "Cristiane Faiad, Victor Souza, Lucas Heiki Matsunaga, Carlos Manoel Lopes Rodrigues, Helena Rinaldi Rosa",
  publication: "",
  read_url: "https://pepsic.bvsalud.org/pdf/eip/v9n3s1/a05.pdf",
  main_url: "https://pepsic.bvsalud.org/scielo.php?pid=S2236-64072018000400005&script=sci_abstract&tlng=en",
  website_name: "PePSIC"
},
{
  id: 2,
  image: imgs['eae2018.png'],
  name: "Evidence of Content Validity in the ENADE Psychology Test",
  authors: "Girlene Ribeiro Jesus, Renata Manuelly Lima Rêgo, Victor Vasconcelos de Souza",
  publication: "",
  read_url: "https://educa.fcc.org.br/pdf/eae/v29n72/1984-932X-eae-29-72-858.pdf",
  main_url: "https://educa.fcc.org.br/scielo.php?pid=S0103-68312018000300858&script=sci_abstract&tlng=en",
  website_name: "SciELO"
},
{
  id: 3,
  image: imgs['pn2019.png'],
  name: "Effects of Ascorbic Acid Combined with Environmental Enrichment on Anxiety and Memory",
  authors: "Ivaldo Jesus Lima de Oliveira, Victor Vasconcelos de Souza, Ana Cláudia Pires Carvalho, Carlos Tomaz, Sérgio Leme Da-Silva",
  publication: "",
  read_url: "https://www.researchgate.net/profile/Victor-Vasconcelos-7/publication/332366544_Effects_of_Ascorbic_Acid_Combined_to_Environmental_Enrichment_on_Anxiety_and_Memory/links/6479f6a2d702370600cc4f72/Effects-of-Ascorbic-Acid-Combined-to-Environmental-Enrichment-on-Anxiety-and-Memory.pdf",
  main_url: "https://psycnet.apa.org/record/2019-20026-001",
  website_name: "PsycNET"
},
{
  id: 4,
  image: imgs['eappe2022.png'],
  name: "The Question of Validity in Brazilian Educational Assessment",
  authors: "Girlene Ribeiro de Jesus, Renata Manuelly de Lima Rêgo, Victor Vasconcelos de Souza",
  publication: "",
  read_url: "https://www.scielo.br/j/ensaio/a/zS4yq9yN5JzfFcdv47JGM4h/?format=pdf",
  main_url: "https://www.scielo.br/j/ensaio/a/zS4yq9yN5JzfFcdv47JGM4h/?format=html",
  website_name: "SciELO"
},
{
  id: 5,
  image: imgs['rr2024.png'],
  name: "The Situational Tests of Emotional Intelligence as a Computer-Adaptive Test",
  authors: "Victor Vasconcelos de Souza, Cristiane Faiad",
  publication: "",
  read_url: "https://recital.almenara.ifnmg.edu.br/index.php/recital/article/view/478/185",
  main_url: "https://www.researchgate.net/publication/378746761_OS_TESTES_SITUACIONAIS_DE_INTELIGENCIA_EMOCIONAL_COMO_UM_TESTE_ADAPTATIVO_COMPUTADORIZADO_The_Situational_Tests_of_Emotional_Intelligence_as_Computer-Adaptive_Tests",
  website_name: "ResearchGate"
}
]

export default function Research() {
  const { lang } = useAppContext();
  const strings = lang === "en" ? LangEN.navmenu : LangPT.navmenu;
  
  return (
    <Element name={"Research"} id="research">
    <section className="section">
    <Container>
    <Container className="d-flex">
    <Title>
    <h2>{strings.research}</h2>
    <div className="underline"></div>
    </Title>
    </Container>
    <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
    {mainResearch.map(function ({
      id,
      image,
      name,
      authors,
      read_url,
      main_url,
      website_name
    }) {
      return (
        <Col key={id}>
        <PublicationCard
        image={image}
        name={name}
        authors={authors}
        publication={publication}
        read_url={read_url}
        main_url={main_url}
        website_name={website_name}
        website_icon={website_icon}
        />
        </Col>
      );
    })}
    </Row>
  </Container>
  </section>
  </Element>
);
}

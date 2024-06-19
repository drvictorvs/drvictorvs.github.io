import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { Element } from "react-scroll";
import styled from 'styled-components';
import { useAppContext } from "../appContext";
import LangEN from '../translations/LangEN';
import LangPT from '../translations/LangPT';
import PublicationCard from "./PublicationCard";
import { importAll } from './Resources';
import { Title } from "./globalStyledComponents";
import { Card } from "react-bootstrap";

const imgs = importAll(require.context('../images/scientific/', false, /.png$/));

const StyledScrollMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  white-space: wrap;
  height: max-content;
  align-items: stretch;
  max-width: 100vw;
`

export default function Publications() {
  const { lang } = useAppContext();
  const sciStrings = lang === "en" ? LangEN.scientific : LangPT.scientific;
  
  function getPublication({ id, short_name, authors, artLang, read_url, main_url, website_name }){
    return {
      id: id,
      short_name: short_name,
      image: <Card.Img
            style={{ position: "relative" }}
            variant="top"
            src={imgs[short_name + '.png']}
            className="mx-auto"
            />,
      name: sciStrings[short_name].name,
      authors: authors,
      publication: sciStrings[short_name].publication,
      artLang: artLang,
      read_url: read_url,
      main_url: main_url,
      website_name: website_name,
    };
  }
  
  
  const publicationData = [
      getPublication({
          id: 0,
          short_name: 'pbjs2015',
          authors:  "Ivaldo Jesus Lima de Oliveira, " +
          "Victor Vasconcelos de Souza, " +
          "Vitor Motta and " +
          "Sérgio Leme da-Silva",
          artLang: "en",
          read_url: "https://www.publicationsgate.net/profile/Victor-Vasconcelos-7/publication/276311783_Effects_of_Oral_Vitamin_C_Supplementation_on_Anxiety_in_Students_A_Double-Blind_Randomized_Placebo-Controlled_Trial/links/592daf46aca272fc55aed6a7/Effects-of-Oral-Vitamin-C-Supplementation-on-Anxiety-in-Students-A-Double-Blind-Randomized-Placebo-Controlled-Trial.pdf",
          main_url: "https://pubmed.ncbi.nlm.nih.gov/26353411/",
          website_name: "PubMed"
      })
      ,
      getPublication({
        id: 1,
        short_name: 'eip2018',
        authors: "Cristiane Faiad, Victor Souza, Lucas Heiki Matsunaga, Carlos Manoel Lopes Rodrigues, Helena Rinaldi Rosa",
        artLang: "pt",
        read_url: "https://pepsic.bvsalud.org/pdf/eip/v9n3s1/a05.pdf",
        main_url: "https://pepsic.bvsalud.org/scielo.php?pid=S2236-64072018000400005&script=sci_abstract&tlng=en",
        website_name: "PePSIC"
      }),
      getPublication({
        id: 2,
        short_name: 'eae2018',
        authors: "Girlene Ribeiro Jesus, Renata Manuelly Lima Rêgo, Victor Vasconcelos de Souza",
        artLang: "pt",
        read_url: "https://educa.fcc.org.br/pdf/eae/v29n72/1984-932X-eae-29-72-858.pdf",
        main_url: "https://educa.fcc.org.br/scielo.php?pid=S0103-68312018000300858&script=sci_abstract&tlng=en",
        website_name: "SciELO"
      }),
      getPublication({
        id: 3,
        short_name: 'pn2019',
        authors: "Ivaldo Jesus Lima de Oliveira, Victor Vasconcelos de Souza, Ana Cláudia Pires Carvalho, Carlos Tomaz, Sérgio Leme Da-Silva",
        artLang: "en",
        read_url: "https://www.publicationsgate.net/profile/Victor-Vasconcelos-7/publication/332366544_Effects_of_Ascorbic_Acid_Combined_to_Environmental_Enrichment_on_Anxiety_and_Memory/links/6479f6a2d702370600cc4f72/Effects-of-Ascorbic-Acid-Combined-to-Environmental-Enrichment-on-Anxiety-and-Memory.pdf",
        main_url: "https://psycnet.apa.org/record/2019-20026-001",
        website_name: "PsycNET"
      }),
      getPublication({
        id: 4,
        short_name: 'eappe2022',
        authors: "Girlene Ribeiro de Jesus, Renata Manuelly de Lima Rêgo, Victor Vasconcelos de Souza",
        artLang: "pt",
        read_url: "https://www.scielo.br/j/ensaio/a/zS4yq9yN5JzfFcdv47JGM4h/?format=pdf",
        main_url: "https://www.scielo.br/j/ensaio/a/zS4yq9yN5JzfFcdv47JGM4h/?format=html",
        website_name: "SciELO"
      }),
      getPublication({
        id: 5,
        short_name: 'rr2024',
        authors: "Victor Vasconcelos de Souza, Cristiane Faiad",
        artLang: "en",
        read_url: "https://recital.almenara.ifnmg.edu.br/index.php/recital/article/view/478/185",
        main_url: "https://www.publicationsgate.net/publication/378746761_OS_TESTES_SITUACIONAIS_DE_INTELIGENCIA_EMOCIONAL_COMO_UM_TESTE_ADAPTATIVO_COMPUTADORIZADO_The_Situational_Tests_of_Emotional_Intelligence_as_Computer-Adaptive_Tests",
        website_name: "ResearchGate"
      })
    ]
    
    
    const navStrings = lang === "en" ? LangEN.navMenu : LangPT.navMenu;
    
    return (
      <Element name={"Publications"} id="publications">
      <section className="section">
      <Container>
      <Container className="d-flex">
      <Title>
      <h2>{navStrings.publications}</h2>
      <div className="underline"></div>
      </Title>
      </Container>
      <HorizontalScroller>
      {publicationData.sort((a,b) => { return b.id - a.id }).map(function ({
        id,
        short_name,
        image,
        name,
        authors,
        publication,
        artLang,
        abstract,
        read_url,
        main_url,
        website_name,
        website_icon
      }) {
        return (
          <PublicationCard
          key={id}
          short_name={short_name}
          image={image}
          name={name}
          authors={authors}
          publication={publication}
          artLang={artLang}
          abstract={abstract}
          read_url={read_url}
          main_url={main_url}
          website_name={website_name}
          website_icon={website_icon}
          />
        );
      })}
      </HorizontalScroller>
      </Container>
      </section>
      </Element>
    );
  }

  export const HorizontalScrollerDiv = styled.div`
    position: relative;
      .scroll-button {
        position: absolute;
        top: 0;
        z-index: 999;
        background: transparent;
        border: none;
        color: ${({theme}) => theme.color};
        filter: ${({theme}) => theme.filterShadow};
    
        &:hover {
          filter: ${({theme}) => theme.filterShadowHover};
        }
        }
    
      .scroll-button.left {
        top: 50%;
        left: 0%;
        }
    
      .scroll-button.right {
        top: 50%;
        right: 0%;
        }
        `
  
  export const HorizontalScroller = ({ children }) => {
    const scrollContainer = useRef(null);
    
    const scroll = (scrollOffset) => {
      scrollContainer.current.scrollLeft += scrollOffset;
    };
    
    return (
      <HorizontalScrollerDiv>
        <button className="scroll-button right" onClick={() => scroll(200)}><Icon icon="fluent:arrow-circle-right-48-filled" height="64px" width="64px"/></button>
          <StyledScrollMenu ref={scrollContainer}>
            {children}
          </StyledScrollMenu>
        <button className="scroll-button left" onClick={() => scroll(-200)}><Icon icon="fluent:arrow-circle-left-48-filled" height="64px" width="64px"/></button>
      </HorizontalScrollerDiv>
    );
  };
import {React, useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { useAppContext, useTheme } from "../appContext";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Card } from "react-bootstrap";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";
import { FlagENG, FlagPTB, PDFFileIco, ExternalIcon } from "./Resources";


const PublicationCardComponent = styled.div`
  display: flex;
  min-height: max-content;
  align-items: stretch;
  align-content: stretch;
  justify-content: space-between;
  padding: 0 0 5px 5px;

  .card {
    background: ${({ theme }) => theme.card.bg};
    color: ${({ theme }) => theme.card.fg};
    box-shadow: ${({ theme }) => theme.card.shadow};
    border: none;
    display: flex;
    margin-right: 10px;
    margin-bottom: 0px;
    flex: 1;
    min-width: 300px;
    max-height:75vh;
    width: 20vw;
    height: inherit;
    transition: all .2s ease-in-out;
    cursor: pointer;
    align-content: stretch;
    justify-content: space-between;

    &:hover {
      transform: scale(1.03);
    }

    .card-title {
    font-size: max(1.1em,1vh);
    }

    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
    }

    .card-link {
      text-decoration: none;
      font-size: 1rem;
      color: ${({ theme }) => theme.color};

      &:hover {
        color: ${({ theme }) => theme.primary};
      }
    }

    .card-tooltip {

      &::after {
        cursor: help;
        text-decoration: underline;
        text-decoration-line: underline;
        text-decoration-style: dotted;
        text-decoration-color: currentcolor;
        content: " ℹ";
        vertical-align: super;
        font-size: 0.7rem;
      }
    }

    

    .card-footer {
      position: relative;
      margin-top: 0;
      background: ${({ theme }) => theme.card.footer};
      height: fit-content;
      max-height: 10vh;
      align-content: center;
      line-height: 1.5rem;

      &.read-online {
        position:relative;
        bottom:0;
      }
      &.view-on {
        position:absolute;
        bottom:0;
      }
    }

    .card-img-top {
      height: 35vh;
      object-fit: cover;
    }

    
  }
`;

const imageList = {
    'pbjs2015': () => import('../images/scientific/pbjs2015.png'),
    'eip2018': () => import('../images/scientific/eip2018.png'),
    'eae2018': () => import('../images/scientific/eae2018.png'),
    'pn2019': () => import('../images/scientific/pn2019.png'),
    'eappe2022': () => import('../images/scientific/eappe2022.png'),
    'rr2024': () => import('../images/scientific/rr2024.png'),
}

export default function PublicationCard({
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
  website_icon,
}) {
  const { lang, themeName } = useAppContext();
  const theme = useTheme();
  const strings = lang === "en" ? LangEN : LangPT;

  const flagStyle = {
    position: "absolute",
    width: 64,
    height: 64,
    bottom: 0,
    right: 0,
    zIndex: 99,
    filter: theme.filterShadow
  };

  const starStyle = {
    position: "absolute",
    width: 64,
    height: 64,
    top: 0,
    right: 0,
    zIndex: 99,
    color: "#f8c100",
    filter: theme.filterShadow
  };

  const ImageComponent = ({ short_name, style, className }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
      imageList[short_name]().then((module) => {
        setImageSrc(module.default);
      });
    }, [short_name]);

    if (!imageSrc) {
      return <div>Loading...</div>;
    }

    return <img src={imageSrc} alt={short_name} style={style} className={className} />;
  };

  return (
    <PublicationCardComponent key={id}>
      <Card>
        <div style={{ position: "relative" }}>
          {artLang === "en" ? (
            <FlagENG style={flagStyle} />
          ) : (
            <FlagPTB style={flagStyle} />
          )}
          {(strings.scientific[short_name].star === true) && <Icon icon="fluent:star-12-filled" style={starStyle} />}
        <Suspense fallback={<div>Loading image...</div>}>
          <ImageComponent short_name={short_name} className="card-img-top"/>
        </Suspense>
        </div>
        <Card.Body className="text-center view-on">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{authors}</Card.Text>
          {
            publication.includes(" [") ? (
              <Card.Text 
                className="card-tooltip" 
                title={publication.split(" [")[1].slice(0, -1)}>
                {publication.split(" [")[0]}
              </Card.Text>
            ) : (
              <Card.Text>{publication}</Card.Text>
            )
          }
          <Card.Text>{abstract}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center read-online">
          <Card.Link href={read_url} target="_blank" rel="noopener">
            {"Read online"}
            <PDFFileIco theme={theme} />
          </Card.Link>
        </Card.Footer>
        <Card.Footer className="text-center">
          <Card.Link href={main_url} target="_blank" rel="noopener">
            {`${strings.messages.viewOn} ${website_name}  `}
            <ExternalIcon theme={theme} />
          </Card.Link>
        </Card.Footer>
      </Card>
    </PublicationCardComponent>
  );
}

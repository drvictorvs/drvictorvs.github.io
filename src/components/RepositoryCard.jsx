import React from "react";
import styled from "styled-components";
// Icons
import { Icon } from "@iconify/react";
// Media
import GH from "../images/logo.svg";
// Components
import { Card } from "react-bootstrap";

const RepositoryCardComponent = styled.div`
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
    min-width: 400px;
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
    }

    .card-img-top {
      height: 35vh;
      object-fit: cover;
      color: ${({ theme }) => theme.primary};
    }

    
  }
`;

function getLanguageIcon(repo_lang){
  const langDict = {
    html: 'i-vscode-icons:file-type-htmlhint',
    python: 'i-vscode-icons:file-type-python',
    javascript: 'i-vscode-icons:file-type-js',
    r: 'logos:r-lang',
    react: 'logos:react',
    csharp: 'i-vscode-icons:file-type-csharp'
  };
  
  // <Icon icon="devicon:"
  return 
}

export default function RepositoryCard({ id, image, name, description, url, repo_lang, demo }) {
  return (
    <RepositoryCardComponent key={id}>
      <Card>
        <div style={{ position: "relative" }}>
            {(Object.entries(repo_lang).map(([key,value], index) => (
              <Icon key={index} icon={"devicons:" + key.toLowerCase()} style={{position:"absolute", 
              zIndex: 99, width:64, height:64, bottom:0,right:0}}/>
            )))}
          <Card.Img
            style={{ position:"relative" }}
            variant="top"
            src={image ? image : GH}
            alt={name}
            className="mx-auto"
          />
          </div>
        <Card.Body className="overflow-auto text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Card.Link href={url}>
            {"View on GitHub "}
            <Icon icon="icomoon-free:github" />
          </Card.Link>
        </Card.Footer>
      </Card>
    </RepositoryCardComponent>
  );
}

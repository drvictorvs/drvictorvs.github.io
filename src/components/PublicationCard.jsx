import React from "react";
import styled from "styled-components";
import { useAppContext } from "../appContext";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Card } from "react-bootstrap";
import LangEN from '../translations/LangEN';
import LangPT from '../translations/LangPT';
import { PDFFileIco } from './Resources'

const PublicationCardComponent = styled.div`
  .card {
    background: ${({ theme }) => (theme.name === "light" ? "" : "#797B7B")};
    box-shadow: ${({ theme }) =>
      theme.name === "light"
        ? "0 3px 10px rgb(0 0 0 / 0.2)"
        : "0 3px 10px rgb(255 255 255 / 0.2)"};

    .card-link {
      text-decoration: none;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.color};

      &:hover {
        color: var(--primary);
      }
    }

    .card-footer {
      border-top: var(--border);
      background: ${({ theme }) => (theme.name === "light" ? "" : "#404040")};
    }
  }
`;

export default function PublicationCard({ image, name, authors, publication, read_url, main_url, website_name, website_icon }) {
  const { lang } = useAppContext();
  const strings = lang === "en" ? LangEN.messages : LangPT.messages;
  return (
    <PublicationCardComponent>
      <Card>
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          className="mx-auto"
        />
        <Card.Body className="overflow-auto text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{authors}</Card.Text>
          <Card.Text>{publication}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Card.Link href={read_url}>
            {"Read online"}
            <PDFFileIco />
          </Card.Link>
        </Card.Footer>
        <Card.Footer className="text-center">
          <Card.Link href={main_url}>
            {`${strings.viewon} ${website_name}  `}
            <Icon icon={website_icon ? "i-fluent:share-20-filled" : website_icon} />
          </Card.Link>
        </Card.Footer>
      </Card>
    </PublicationCardComponent>
  );
}

import React from "react";
import styled from "styled-components";
// Icons
import { Icon } from "@iconify/react";
// Media
import GH from "../images/logo.svg";
// Components
import { Card } from "react-bootstrap";

const PublicationCardComponent = styled.div`
  .card {
    background: ${({ theme }) => theme.card.bg };
    box-shadow: ${({ theme }) => theme.card.shadow };

    .card-link {
      text-decoration: none;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.color };

      &:hover {
        color: ${({ theme }) => theme.primary };
      }
    }

    .card-footer {
      border-top: var(--border);
      background: ${({ theme }) => theme.card.footer };
    }
  }
`;

export default function PublicationCard({ image, name, description, url, demo }) {
  return (
    <PublicationCardComponent>
      <Card>
        <Card.Img
          variant="top"
          src={image ? image : GH}
          alt={name}
          className="mx-auto"
        />
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
    </PublicationCardComponent>
  );
}

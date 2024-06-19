import React from "react";
import { Link } from "react-scroll/modules";
import styled, { keyframes } from "styled-components";
// Icons
import { Icon } from "@iconify/react";
import { MakeNavLinks } from "./NavBar";

// Animations

export const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinner = keyframes`
    to {
        transform: rotate(360deg)
    }
`;

// Loading Spinner
export const Loading = styled.div`
  display: inline-block;
  width: 5rem;
  height: 5rem;
  border: 5px solid;
  border-radius: 50%;
  border-top-color: ${({theme}) => theme.primary};
  margin: 1rem auto;
  animation: ${spinner} 0.6s linear infinite;
`;

// Titles
export const Title = styled.div`
  display: inline-block;
  margin: 0 auto;
  font-family: var(--secondary-font);
  text-align: center;

  .underline {
    height: 0.25rem;
    width: 75%;
    min-width: 3rem;
    border-radius: 0.25rem;
    background: var(--clr-primary-5);
    margin: 0 auto 1.5rem auto;
    background: ${({ theme }) => theme.gradient };
  }

  
  @media screen and (max-width: 700px) {

    .underline {
      margin-bottom: 0.5rem;
    }
  }
`;

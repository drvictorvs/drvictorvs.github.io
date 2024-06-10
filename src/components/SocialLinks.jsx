import React from "react";
import { useSelector } from "react-redux";
import { selectData } from "../pages/homeSlice";
import styled from "styled-components";
// Data
// import { Blog } from "../data";
// Icons
import { Icon } from '@iconify/react';


export const Blog = <Icon icon="ph:link-bold" />;

const StyledSocialLinks = styled.div`
  a {
    margin: 0 1rem;
  }
`;

function StyledSocialLink(link, label, icon) {
  return (<a
    href={link}
    aria-label={label}
    className="link-icons"
    >
    <Icon icon={icon} />
    </a>)
  };

export default function SocialLinks() {
  const { blog, html_url } = useSelector(selectData);
  
  return (
    <StyledSocialLinks>
    <StyledSocialLink link={html_url} label="Check out my GitHub profile." icon="icomoon-free:github" />
    <StyledSocialLink link={blog} label="Check out my GitHub profile." icon="ph:link-bold" />
    </StyledSocialLinks>
  );
}
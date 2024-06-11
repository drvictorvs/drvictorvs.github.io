import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
/*
=============== 
Variables
===============
*/
:root {
  --border: 1px solid;
  --transition: all 0.3s linear;
  --nav-height: 61px;
  --min-footer-height: 11vh;
  --card-height: 29rem;
  --primary-font: "Oswald";
  --secondary-font: "PT Sans";
  --tertiary-font: "Manrope";
}

/*
=============== 
Global Styles
===============
*/
body {
  background: ${({ theme }) => theme.background };
  color: ${({ theme }) => theme.color };
  font-family: var(--tertiary-font);
}

a:hover {
  cursor: pointer;
}

.navbar {
  border: 10px solid;
  border-image-slice: 1;
  border-width: 3px;
  border-image-source: ${({ theme }) => theme.gradient };
  border-left: 0;
  border-right: 0;
  border-top: 0;

  img {
    background: ${({ theme }) => theme.imgColors };
  }
}

.link-icons {
  line-height: 0;
  font-size: 2.25rem;
  transition: var(--transition);
  color: ${({ theme }) => theme.color };

  &:hover {
        color: ${({ theme }) => theme.primary };
      }
}

.section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: var(--nav-height) 0;
}

.title {
    font-family: var(--primary-font);
}

.card {
  height: var(--card-height);
  border: var(--border);
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }

  .card-img-top {
    height: 50%;
    object-fit: contain;
  }
}

.page-item.active .page-link {
    background-color: ${({ theme }) => theme.primary };
    border-color: ${({ theme }) => theme.primary };
}

@media screen and (min-width: 800px) {
  .link-icons {
    font-size: 2.5rem;
  }
  .form-group {
      max-width: 750px;
    }
}

@media screen and (min-width: 1367px) {
  .link-icons:hover {
    color: ${({ theme }) => theme.primary };
  }
  }
`;

export default GlobalStyles;

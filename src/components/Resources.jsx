import React from 'react';
import styled from 'styled-components';
import { useTheme } from "../appContext";

// #region: Operational
export function importAll(r) {
  let SVGs = {};
  r.keys().forEach((item, index) => {
    SVGs[item.replace('./', '')] = r(item);
  });
  return SVGs;
}

const SVGs = importAll(require.context('../images', true, /\.svg$/));

// #region: Logo
export const Logo = ({ theme }) => 
<img src={SVGs['logo.svg']} style={{height:"35px", width:"35px", filter: theme.filter, background:"none"}} alt="" />;

export const BigLogo = ({ style = {height:"75%", width:"75%" } }) => {
  const theme = useTheme();
  style = { ...style, filter: theme.filter, background:"none" }
  return (
<img src={SVGs['logo.svg']} style={style} alt="" />);
}

const FlagContainer = styled.div`

.flag-top {
  clip-path: polygon(0 0, 100% 0, 0 100%);
  transition: transform var(--transition);
  position: absolute;
}

.flag-bottom {
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  transition: transform var(--transition);
  position: relative;
  }
  
  /* Move span when checked */
  input[type="checkbox"]:checked + div + #flagContainer .flag-top {
    transform: translateX(100%);
  }

  input[type="checkbox"]:checked + div + #flagContainer .flag-bottom {
    transform: translateX(-100%);
  }

`

// #region: Flags
export const FlagENG = ({style = {height:"1em", width:"1em", background:"none", position:"absolute"}}) => {
return (
  <FlagContainer className="flagContainer">
    <img src={SVGs['flag-us.svg']} className="flag-top" style={style} alt="" />
    <img src={SVGs['flag-uk.svg']} className="flag-bottom" style={style} alt="" />
  </FlagContainer>
);
}

export const FlagPTB = ({style = {height:"1em", width:"1em", background:"none", position:"absolute"}}) => {
  return (
  <FlagContainer className="flagContainer">
    <img src={SVGs['flag-pt.svg']} className="flag-top" style={style} alt="" />
    <img src={SVGs['flag-br.svg']} className="flag-bottom" style={style} alt="" />
  </FlagContainer>);
}

// #region: Skills

export const Neuropsychology = ({ theme }) => 
<img src={SVGs['skills/neuropsychology.svg']} style={{filter: theme?.filter}} alt="" />
export const Psychometrics = ({ theme }) => 
<img src={SVGs['skills/psychometrics.svg']} style={{filter: theme?.filter}} alt="" />;

export const Psychopharmacology = ({ theme }) => 
<img src={SVGs['skills/psychopharmacology.svg']} style={{filter: theme?.filter}} alt="" />;

export const IntellectualAssessment = ({ theme }) => 
<img src={SVGs['skills/intellectual-assessment.svg']} style={{filter: theme?.filter}} alt="" />;

export const EmotionalIntellectualAssessment = ({ theme }) => 
<img src={SVGs['skills/emotional-intellectual-assessment.svg']} style={{filter: theme?.filter}} alt="" />;

export const ResearchDesign = ({ theme }) => 
<img src={SVGs['skills/research-design.svg']} style={{filter: theme?.filter}} alt="" />;

export const StatisticalModeling = ({ theme }) => 
<img src={SVGs['skills/statistical-modeling.svg']} style={{height: "64px", width:"64px", filter: theme?.filter}} alt="" />;

export const Python = ({ theme }) => 
<img src={SVGs['skills/lang-python.svg']} style={{filter: theme?.filter}} alt="" />;

export const R = ({ theme }) => 
<img src={SVGs['skills/lang-r.svg']} style={{filter: theme?.filter}} alt="" />;

export const PDFFileIco = ({ themeName }) =>
<img src={SVGs['pdf-file.svg']} alt="PDF File Icon" style={{ height: "1em", width: "1em", background: "none", textAlign: "center",  padding: "0px 0px 4px 3px", filter: themeName === "light" ? "invert(0)": "invert(1)"}} />;


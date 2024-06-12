import React from 'react';
import { useTheme } from "../appContext";
import { ReactComponent as LogoSVG } from "../images/logo.svg";

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

export const BigLogo = () => {
  const theme = useTheme();
  return (
<img src={SVGs['logo.svg']} style={{height:"75%", width:"75%", filter: theme.filter, background:"none"}} alt="" />);
}


// #region: Flags
export const FlagUS = ({style = {height:"1em", width:"1em", background:"none"}}) => 
<img src={SVGs['flag-us.svg']} style={style} alt="" />;

export const FlagBR = ({style = {height:"1em", width:"1em", background:"none"}}) => 
<img src={SVGs['flag-br.svg']} style={style} alt="" />;


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
<img src={SVGs['skills/statistical-modeling.svg']} style={{filter: theme?.filter}} alt="" />;

export const Python = ({ theme }) => 
<img src={SVGs['skills/lang-python.svg']} style={{filter: theme?.filter}} alt="" />;

export const R = ({ theme }) => 
<img src={SVGs['skills/lang-r.svg']} style={{filter: theme?.filter}} alt="" />;

export const PDFFileIco = ({ themeName }) =>
<img src={SVGs['pdf-file.svg']} alt="PDF File Icon" style={{ height: "1em", width: "1em", background: "none", textAlign: "center",  padding: "0px 0px 4px 3px", filter: themeName === "light" ? "invert(0)": "invert(1)"}} />;


import React from 'react';
import styled from 'styled-components';
import { useTheme } from "../appContext";
import {LogoSVG, BRFlagSVG, PTFlagSVG, OrcidSVG, LattesSVG, PDFFileSVG, UKFlagSVG, USFlagSVG, EqualitySVG, GScholarSVG, EIAssessmentSVG, IntellectualAssessmentSVG, PsychometricsSVG, PsychopharmacologySVG, StatisticalModelingSVG, PythonSVG, ResearchDesignSVG, NeuropsychologySVG, RLangSVG} from '../images/Images';
import { Icon } from '@iconify/react/dist/iconify.js';

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
{
  return(<LogoSVG style={{height:"35px", width:"35px", background:"none"}} className="logo-img" alt="" />);
}
export const BigLogo = ({ style = {height:"75%", width:"75%" } }) => {
  const theme = useTheme();
  style = { ...style, color: theme.primary, background:"none" }
  return (
  <LogoSVG style={style} className="logo-img" alt="" />);
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
    <USFlagSVG className="flag-top" style={style} alt="" />
    <UKFlagSVG src={SVGs['flag-uk.svg']} className="flag-bottom" style={style} alt="" />
  </FlagContainer>
);
}

export const FlagPTB = ({style = {height:"1em", width:"1em", background:"none", position:"absolute"}}) => {
  return (
  <FlagContainer className="flagContainer">
    <PTFlagSVG className="flag-top" style={style} alt="" />
    <BRFlagSVG className="flag-bottom" style={style} alt="" />
  </FlagContainer>);
}

// #region: Skills

export const Neuropsychology = ({ theme }) => 
<NeuropsychologySVG className="activities-icon" style={{color: theme?.primary}} alt="" />
export const Psychometrics = ({ theme }) => 
<PsychometricsSVG className="activities-icon" style={{color: theme?.primary}} alt="" />;

export const Psychopharmacology = ({ theme }) => 
<PsychopharmacologySVG className="activities-icon" style={{color: theme?.primary}} alt="" />;

export const IntellectualAssessment = ({ theme }) => 
<IntellectualAssessmentSVG className="activities-icon" style={{color: theme?.primary}} alt="" />;

export const EIAssessment = ({ theme }) => 
<EIAssessmentSVG className="activities-icon" style={{color: theme?.primary}} alt="" />;

export const ResearchDesign = ({ theme }) => 
<ResearchDesignSVG className="activities-icon" style={{color: theme?.primary}} alt="" />;

export const StatisticalModeling = ({ theme }) => 
<StatisticalModelingSVG className="activities-icon" style={{color: theme?.primary}} alt="" />;

export const Python = ({ theme }) => 
<PythonSVG className="activities-icon" style={{color: theme?.primary}} alt="" />;

export const R = ({ theme }) => 
<RLangSVG className="activities-icon" style={{color: theme?.primary}} alt="" />;

export const PDFFileIco = ({ theme }) =>
<PDFFileSVG alt="PDF File Icon" style={{ height: "1.5rem", width: "1.5rem", background: "none", textAlign: "center",  padding: "0px 0px 4px 3px", color: theme.color }} />;

export const ExternalIcon = ({ theme }) => 
  <Icon icon="i-fluent:share-20-filled" style={{color: theme.color}}/>
// #region: Paper previews

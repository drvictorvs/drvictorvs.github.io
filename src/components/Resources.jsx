import React from 'react';
import { useAppContext } from "../appContext";

import PDFFileIcon from '../images/pdf-file.svg';

// TODO make this a lot less bad
function GetPrimaryIconFilter(){
  const { theme } = useAppContext(); 
  return (theme === "dark"
  ? "invert(89%) sepia(88%) saturate(4248%) hue-rotate(293deg) brightness(98%) contrast(135%)"
  : "invert(53%) sepia(85%) saturate(3345%) hue-rotate(341deg) brightness(96%) contrast(113%)"
);
};

const imgs = importAll(require.context('../images', false, /\.svg$/));


// Logo

export const Logo = () =>
  <img src={imgs['logo.svg']} className="primary-icon" style={{width: 35, height: 35,
      filter: GetPrimaryIconFilter(), background: "none"}} alt="English" />;

export const BigLogo = () =>
  <img src={imgs['logo.svg']} className="w-75 mx-auto theme-img" 
style={{filter: GetPrimaryIconFilter(), background: "none"}} alt="English" />;

// Flags
export const FlagUS = () => 
<img src={imgs['flag-us.svg']} style={{height:"1em", width:"1em", background:"none"}} alt="English" />;

export const FlagBR = () => 
<img src={imgs['flag-br.svg']} style={{height:"1em", width:"1em", background:"none"}} alt="English" />;

// Skills

const skillImgs = importAll(require.context('../images/skills', false, /\.svg$/));
export const Neuropsychology = () => 
<img src={skillImgs['neuropsychology.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const Psychometrics = () => 
<img src={skillImgs['psychometrics.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const Psychopharmacology = () => 
<img src={skillImgs['psychopharmacology.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const IntellectualAssessment = () => 
<img src={skillImgs['intellectual-assessment.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const EmotionalIntellectualAssessment = () => 
<img src={skillImgs['emotional-intellectual-assessment.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const ResearchDesign = () => 
<img src={skillImgs['research-design.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const StatisticalModeling = () => 
<img src={skillImgs['statistical-modeling.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const Python = () => 
<img src={skillImgs['lang-python.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const R = () => 
<img src={skillImgs['lang-r.svg']} className="primary-icon" style={{filter: GetPrimaryIconFilter()}} alt="English" />;

export const PDFFileIco = () =>
  <img src={PDFFileIcon} alt="PDF File Icon" style={{ height: "1em", width: "1em", background: "none", textAlign: "center",
    padding: "0px 0px 4px 3px", filter: "invert(1)"}} />;

// Opertational
export function importAll(r) {
  let svgs = {};
  r.keys().forEach((item, index) => {
    svgs[item.replace('./', '')] = r(item);
  });
  return svgs;
}
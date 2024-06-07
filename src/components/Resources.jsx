import React from 'react';


const flags = importAll(require.context('../images', false, /\.svg$/));

// Flags
export const FlagUS = () => 
<img src={flags['flag-us.svg']} style={{height:"1em", width:"1em", background:"none"}} alt="English" />;

export const FlagBR = () => 
<img src={flags['flag-br.svg']} style={{height:"1em", width:"1em", background:"none"}} alt="English" />;

// Skills

const s = importAll(require.context('../images/skills', false, /\.svg$/));
export const Neuropsychology = () => 
<img src={s['neuropsychology.svg']} className="display-4" alt="English" />;

export const Psychometrics = () => 
<img src={s['psychometrics.svg']} className="display-4" alt="English" />;

export const Psychopharmacology = () => 
<img src={s['psychopharmacology.svg']} className="display-4" alt="English" />;

export const IntellectualAssessment = () => 
<img src={s['intellectual-assessment.svg']} className="display-4" alt="English" />;

export const EmotionalIntellectualAssessment = () => 
<img src={s['emotional-intellectual-assessment.svg']} className="display-4" alt="English" />;

export const ResearchDesign = () => 
<img src={s['research-design.svg']} className="display-4" alt="English" />;

export const StatisticalModeling = () => 
<img src={s['statistical-modeling.svg']} className="display-4" alt="English" />;

export const Python = () => 
<img src={s['lang-python.svg']} className="display-4" alt="English" />;

export const R = () => 
<img src={s['lang-r.svg']} className="display-4" alt="English" />;



// Opertational
export function importAll(r) {
  let svgs = {};
  r.keys().forEach((item, index) => {
    svgs[item.replace('./', '')] = r(item);
  });
  return svgs;
}
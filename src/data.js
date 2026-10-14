export const equipment = [
  {
    id: "beaker",
    name: "Beaker",
    detail: "250 mL",
    icon: "beaker",
    kind: "glass",
  },
  {
    id: "test-tube",
    name: "Test tube",
    detail: "18 × 150 mm",
    icon: "test-tube",
    kind: "tube",
  },
  {
    id: "flask",
    name: "Conical flask",
    detail: "250 mL",
    icon: "flask-conical",
    kind: "flask",
  },
  {
    id: "dropper",
    name: "Dropper",
    detail: "Transfer drops",
    icon: "pipette",
    kind: "dropper",
  },
  {
    id: "cylinder",
    name: "Measuring cylinder",
    detail: "100 mL",
    icon: "cylinder",
    kind: "cylinder",
  },
];

export const solutions = [
  {
    id: "water",
    name: "Distilled water",
    formula: "H₂O",
    color: "#c9eef8",
    ph: 7,
    type: "neutral",
  },
  {
    id: "acid",
    name: "Dilute hydrochloric acid",
    formula: "HCl (dilute)",
    color: "#f6d8a9",
    ph: 2,
    type: "acid",
  },
  {
    id: "base",
    name: "Dilute sodium hydroxide",
    formula: "NaOH (dilute)",
    color: "#c5d9ff",
    ph: 12,
    type: "base",
  },
  {
    id: "indicator",
    name: "Universal indicator",
    formula: "Indicator",
    color: "#b9a7ef",
    ph: null,
    type: "indicator",
  },
  {
    id: "copper",
    name: "Copper sulfate solution",
    formula: "CuSO₄ (aq)",
    color: "#5aa8ef",
    ph: 5,
    type: "salt",
  },
  {
    id: "carbonate",
    name: "Sodium carbonate solution",
    formula: "Na₂CO₃ (aq)",
    color: "#b9e3d0",
    ph: 11,
    type: "carbonate",
  },
];

export const experiments = [
  {
    id: "indicator",
    title: "Explore pH with an indicator",
    category: "Acids & bases",
    time: "5 min",
    level: "Beginner",
    description:
      "Add a universal indicator to sample solutions and compare their approximate pH.",
    goal: "Classify solutions as acidic, neutral, or alkaline.",
  },
  {
    id: "neutralization",
    title: "Acid–base neutralization",
    category: "Reactions",
    time: "8 min",
    level: "Beginner",
    description:
      "Combine modeled dilute acid and base samples to explore neutralization.",
    goal: "Understand how an acid and a base can react to form salt and water.",
  },
  {
    id: "mixing",
    title: "Solution mixing station",
    category: "Lab skills",
    time: "4 min",
    level: "Beginner",
    description:
      "Practice selecting glassware and combining small virtual samples.",
    goal: "Practice safe lab workflow and record observations.",
  },
];

// Educational rules for this prototype only. This is not a general chemistry solver.
export function simulate({ experiment, first, second, indicatorAdded, concentrationA = 0.1, concentrationB = 0.1, volumeA = 25, volumeB = 25 }) {
  const validInputs = [concentrationA, concentrationB, volumeA, volumeB].every(Number.isFinite) && concentrationA >= 0 && concentrationB >= 0 && volumeA > 0 && volumeB > 0;
  const totalLitres = (volumeA + volumeB) / 1000;
  const amountA = concentrationA * volumeA / 1000;
  const amountB = concentrationB * volumeB / 1000;
  const quantitySummary = validInputs ? `Sample A: ${amountA.toPrecision(3)} mol; Sample B: ${amountB.toPrecision(3)} mol; combined volume: ${(volumeA + volumeB).toPrecision(4)} mL.` : null;
  const excessMoles = first?.type === 'acid' ? amountA - amountB : amountB - amountA;
  const estimatedPH = !validInputs ? null : Math.abs(excessMoles) < 1e-15 ? 7 : excessMoles > 0 ? -Math.log10(excessMoles / totalLitres) : 14 + Math.log10(-excessMoles / totalLitres);
  if (!first || !second) {
    return {
      title: "Ready for a sample",
      observation: "Choose two solutions to begin a modeled mixing activity.",
      detail:
        "Select solutions in the left panel, then add them to the active vessel.",
      status: "Waiting",
      color: "#d9edf7",
      equation: "—",
    };
  }
  if (
    experiment === "indicator" ||
    indicatorAdded ||
    first.type === "indicator" ||
    second.type === "indicator"
  ) {
    const sample = first.type === "indicator" ? second : first;
    const colors = {
      acid: "#ed6b70",
      base: "#7755c9",
      neutral: "#5aa8c8",
      salt: "#4e9be5",
      carbonate: "#4aa77c",
    };
    const labels = {
      acid: "Acidic sample: indicator is modeled as red/orange.",
      base: "Alkaline sample: indicator is modeled as blue/purple.",
      neutral: "Near-neutral sample: indicator is modeled as green.",
    };
    return {
      title: "Indicator observation",
      observation:
        labels[sample.type] ||
        "The indicator color depends on the sample chemistry.",
      detail: `Approximate sample pH: ${sample.ph ?? "not assigned"}. Actual colors depend on concentration and indicator formulation.`,
      status: "Observation recorded",
      color: colors[sample.type] || "#8aa6b8",
      equation: "Indicator color ↔ pH range",
      reactionType: "indicator",
      reactants: [sample.name],
      products: ["Observed indicator color"],
    };
  }
  if (
    (first.type === "acid" && second.type === "base") ||
    (first.type === "base" && second.type === "acid")
  ) {
    return {
      title: "Neutralization model",
      observation:
        "The model represents an acid–base neutralization. The simplified estimate uses the entered concentrations and volumes to estimate excess strong acid or base. It assumes ideal behavior.",
      detail:
        "For a simplified strong acid–strong base reaction, hydrogen ions and hydroxide ions form water.",
      status: "Modeled reaction",
      color: "#d5c9f5",
      equation: "HCl + NaOH → NaCl + H₂O",
      reactionType: "neutralization",
      reactants: ["HCl", "NaOH"],
      products: ["NaCl", "H₂O"],
      calculation: validInputs ? quantitySummary : "Enter non-negative concentrations and positive volumes to calculate an estimate.",
      finalPH: estimatedPH,
    };
  }
  if ((first.type === "salt" && second.type === "base") || (first.type === "base" && second.type === "salt")) {
    return {
      title: "Precipitation reaction model",
      observation: "The model represents copper(II) hydroxide forming as a blue precipitate when copper(II) sulfate solution is combined with sodium hydroxide.",
      detail: "A precipitate is an insoluble solid that forms in a solution. The visual is illustrative and does not calculate precipitate mass.",
      status: "Precipitate modeled",
      color: "#5aa8ef",
      equation: "CuSO₄ + 2NaOH → Cu(OH)₂(s) + Na₂SO₄",
      reactionType: "precipitate",
      reactants: ["CuSO₄", "NaOH"],
      products: ["Cu(OH)₂ solid", "Na₂SO₄"],
    };
  }
  if (
    (first.type === "acid" && second.type === "carbonate") ||
    (first.type === "carbonate" && second.type === "acid")
  ) {
    return {
      title: "Gas-forming reaction model",
      observation:
        "Acids reacting with carbonates can release carbon dioxide gas. The animation is illustrative, not a measured reaction.",
      detail:
        "Do not use this prototype to plan or perform real chemical experiments.",
      status: "Modeled reaction",
      color: "#f0d3a5",
      equation: "2HCl + Na₂CO₃ → 2NaCl + H₂O + CO₂",
      reactionType: "gas",
      reactants: ["HCl", "Na₂CO₃"],
      products: ["NaCl", "H₂O", "CO₂ gas"],
    };
  }
  return {
    title: "Mixture created",
    observation: `You combined ${first.name.toLowerCase()} with ${second.name.toLowerCase()}. No specific reaction is modeled for this pair.`,
    detail:
      "A mixture does not necessarily mean a chemical reaction occurred. Check reliable reference data before drawing conclusions.",
    status: "Mixture",
    color: first.color,
    equation: "No modeled equation",
    reactionType: "mixture",
    reactants: [first.formula || first.name, second.formula || second.name],
    products: ["No new product modeled"],
  };
}

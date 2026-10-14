// Educational rules for this prototype only. This is not a general chemistry solver.
export function simulate({ experiment, first, second, indicatorAdded }) {
  if (!first || !second) {
    return { title: 'Ready for a sample', observation: 'Choose two solutions to begin a modeled mixing activity.', detail: 'Select solutions in the left panel, then add them to the active vessel.', status: 'Waiting', color: '#d9edf7', equation: '—' };
  }
  if (experiment === 'indicator' || indicatorAdded || first.type === 'indicator' || second.type === 'indicator') {
    const sample = first.type === 'indicator' ? second : first;
    const colors = { acid: '#ed6b70', base: '#7755c9', neutral: '#5aa8c8', salt: '#4e9be5', carbonate: '#4aa77c' };
    const labels = { acid: 'Acidic sample: indicator is modeled as red/orange.', base: 'Alkaline sample: indicator is modeled as blue/purple.', neutral: 'Near-neutral sample: indicator is modeled as green.' };
    return { title: 'Indicator observation', observation: labels[sample.type] || 'The indicator color depends on the sample chemistry.', detail: `Approximate sample pH: ${sample.ph ?? 'not assigned'}. Actual colors depend on concentration and indicator formulation.`, status: 'Observation recorded', color: colors[sample.type] || '#8aa6b8', equation: 'Indicator color ↔ pH range' };
  }
  if ((first.type === 'acid' && second.type === 'base') || (first.type === 'base' && second.type === 'acid')) {
    return { title: 'Neutralization model', observation: 'The model represents an acid–base neutralization. The final pH depends on amounts and concentrations, which this starter demo does not calculate.', detail: 'For a simplified strong acid–strong base reaction, hydrogen ions and hydroxide ions form water.', status: 'Modeled reaction', color: '#d5c9f5', equation: 'HCl + NaOH → NaCl + H₂O' };
  }
  if ((first.type === 'acid' && second.type === 'carbonate') || (first.type === 'carbonate' && second.type === 'acid')) {
    return { title: 'Gas-forming reaction model', observation: 'Acids reacting with carbonates can release carbon dioxide gas. The animation is illustrative, not a measured reaction.', detail: 'Do not use this prototype to plan or perform real chemical experiments.', status: 'Modeled reaction', color: '#f0d3a5', equation: 'Acid + carbonate → salt + water + CO₂' };
  }
  return { title: 'Mixture created', observation: `You combined ${first.name.toLowerCase()} with ${second.name.toLowerCase()}. No specific reaction is modeled for this pair.`, detail: 'A mixture does not necessarily mean a chemical reaction occurred. Check reliable reference data before drawing conclusions.', status: 'Mixture', color: first.color, equation: 'No modeled equation' };
}
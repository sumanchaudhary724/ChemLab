import React from "react";

const captions = {
  neutralization: "Acid + base",
  gas: "Gas formation",
  precipitate: "Solid formation",
  indicator: "Indicator response",
  mixture: "Physical mixture",
};

export default function ReactionVisual({ result }) {
  const reactants = result.reactants || [];
  const products = result.products || [];
  return (
    <div className={`reaction-visual reaction-${result.reactionType || "mixture"}`} aria-label={`Reaction visualization: ${result.title}`}>
      <div className="reaction-visual-top">
        <span className="reaction-live-dot" />
        <span>{captions[result.reactionType] || "Reaction model"}</span>
        <span className="reaction-visual-note">ILLUSTRATIVE</span>
      </div>
      <div className="reaction-scene">
        <div className="reaction-vessel">
          <div className="reaction-liquid" />
          {result.reactionType === "gas" && <div className="reaction-bubbles"><i /><i /><i /><i /><i /></div>}
          {result.reactionType === "precipitate" && <div className="reaction-solid"><i /><i /><i /><i /><i /><i /></div>}
          {result.reactionType === "neutralization" && <div className="reaction-sparkles"><i>+</i><i>−</i><i>+</i></div>}
          {result.reactionType === "indicator" && <div className="reaction-indicator-drop" />}
        </div>
        <div className="reaction-steps">
          <span className="reaction-stage-label">REACTANTS</span>
          <div className="reaction-chemicals">{reactants.map((item, i) => <span key={item + i}>{item}</span>)}</div>
          <div className="reaction-arrow">→</div>
          <span className="reaction-stage-label">PRODUCTS / RESULT</span>
          <div className="reaction-chemicals products">{products.map((item, i) => <span key={item + i}>{item}</span>)}</div>
        </div>
      </div>
      <div className="reaction-equation-line">{result.equation}</div>
      <div className="reaction-caution">Conceptual animation — not to scale or a laboratory procedure.</div>
    </div>
  );
}

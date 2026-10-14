# ChemLab Studio — React Virtual Chemistry Lab

An interactive, front-end prototype for a virtual chemistry lab built with React, Vite, and CSS.

## Features
- Dashboard and experiment library
- Interactive bench with selectable glassware
- Drag equipment from the left panel to the virtual bench (or click to add)
- Select simulated solutions and assign one to the selected vessel
- Modeled pH indicator and acid–base interaction results
- Quick observation notes stored in React state for the current session
- Lab safety information modal
- Responsive layout for desktop and mobile

## Run locally
Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

To test a production build:

```bash
npm run build
npm run preview
```

## Notes on scientific accuracy
The chemistry engine in `src/chemistryEngine.js` is intentionally a small set of explicit educational rules, not a general-purpose chemical solver. It does not calculate stoichiometry, concentrations, energy, kinetics, equilibrium, or precise final pH. Outcomes and colors are illustrative. Do not use the prototype as a procedure for real laboratory work.

## Next improvements
1. Add volume and concentration controls.
2. Model acid/base quantities and titration curves.
3. Persist student notebooks using a database.
4. Add tests for every supported reaction rule.
5. Add guided steps, accessibility review, and teacher/learner roles.
6. Consider 3D molecular views after the 2D interactions are stable.
# ChemLab

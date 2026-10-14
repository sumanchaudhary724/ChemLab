import React, { useMemo, useState } from 'react';
import { Atom, Beaker, BookOpen, Check, ChevronDown, CircleHelp, FlaskConical, FlaskRound, GraduationCap, LayoutDashboard, Menu, Microscope, Plus, RotateCcw, Save, Search, Settings2, ShieldCheck, Sparkles, TestTube, Trash2, X } from 'lucide-react';
import { equipment, solutions, experiments } from './data';
import { simulate } from './chemistryEngine';
import Glassware from './components/Glassware';
import ReactionVisual from './components/ReactionVisual';

const iconMap = { beaker: Beaker, 'test-tube': TestTube, 'flask-conical': FlaskConical, pipette: Plus, cylinder: FlaskRound };
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'lab', label: 'Virtual lab', icon: FlaskConical },
  { id: 'experiments', label: 'Experiments', icon: Microscope },
  { id: 'notebook', label: 'Lab notebook', icon: BookOpen },
];

export default function App() {
  const [page, setPage] = useState('lab');
  const [activeExperiment, setActiveExperiment] = useState('indicator');
  const [selectedSolution, setSelectedSolution] = useState('acid');
  const [benchItems, setBenchItems] = useState([{ uid: 1, equipmentId: 'beaker', solutionId: 'acid', x: 1 }, { uid: 2, equipmentId: 'flask', solutionId: null, x: 2 }]);
  const [activeVessel, setActiveVessel] = useState(1);
  const [firstId, setFirstId] = useState('acid');
  const [secondId, setSecondId] = useState('indicator');
  const [concentrationA, setConcentrationA] = useState('0.1');
  const [concentrationB, setConcentrationB] = useState('0.1');
  const [volumeA, setVolumeA] = useState('25');
  const [volumeB, setVolumeB] = useState('25');
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [showSafety, setShowSafety] = useState(false);
  const [notice, setNotice] = useState('');
  const active = experiments.find(e => e.id === activeExperiment) || experiments[0];
  const first = solutions.find(s => s.id === firstId);
  const second = solutions.find(s => s.id === secondId);
  const result = useMemo(() => simulate({ experiment: activeExperiment, first, second, indicatorAdded: firstId === 'indicator' || secondId === 'indicator', concentrationA: Number(concentrationA), concentrationB: Number(concentrationB), volumeA: Number(volumeA), volumeB: Number(volumeB) }), [activeExperiment, first, second, firstId, secondId, concentrationA, concentrationB, volumeA, volumeB]);
  const filteredSolutions = solutions.filter(s => `${s.name} ${s.formula}`.toLowerCase().includes(search.toLowerCase()));

  function addEquipment(equipmentId) {
    const uid = Date.now() + Math.floor(Math.random() * 1000);
    setBenchItems(items => [...items, { uid, equipmentId, solutionId: null, x: items.length + 1 }]);
    setActiveVessel(uid);
    setNotice('Equipment added to your bench.');
  }
  function handleDrop(e) {
    e.preventDefault();
    const equipmentId = e.dataTransfer.getData('equipmentId');
    if (equipmentId) addEquipment(equipmentId);
  }
  function addSelectedSolution() {
    setBenchItems(items => items.map(item => item.uid === activeVessel ? { ...item, solutionId: selectedSolution } : item));
    setFirstId(selectedSolution);
    setSecondId(selectedSolution === 'indicator' ? 'acid' : 'indicator');
    setNotice(`${solutions.find(s => s.id === selectedSolution)?.name} added to the selected vessel.`);
  }
  function resetBench() {
    setBenchItems([{ uid: 1, equipmentId: 'beaker', solutionId: null, x: 1 }]);
    setActiveVessel(1);
    setFirstId('acid'); setSecondId('indicator');
    setNotice('Bench reset.');
  }
  function saveObservation() {
    if (!notes.trim()) { setNotice('Write an observation before saving.'); return; }
    setSavedNotes(items => [{ id: Date.now(), title: active.title, note: notes.trim(), date: new Date().toLocaleString() }, ...items]);
    setNotes('');
    setNotice('Observation saved to your notebook.');
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Atom size={22}/></div><div><strong>ChemLab</strong><span>STUDIO</span></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{navItems.map(item => { const Icon = item.icon; return <button key={item.id} className={`nav-link ${page === item.id ? 'active' : ''}`} onClick={() => setPage(item.id)}><Icon size={18}/><span>{item.label}</span>{item.id === 'notebook' && savedNotes.length > 0 && <b className="nav-count">{savedNotes.length}</b>}</button>; })}</nav>
      <div className="sidebar-bottom">
        <div className="safety-mini"><ShieldCheck size={18}/><div><strong>Safety first</strong><span>Virtual practice only</span></div></div>
        <button className="nav-link" onClick={() => setShowSafety(true)}><CircleHelp size={18}/><span>Lab safety guide</span></button>
        <div className="profile"><div className="avatar">S</div><div className="profile-text"><strong>Student workspace</strong><span>Free learner account</span></div><Settings2 size={17}/></div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{navItems.find(n => n.id === page)?.label || 'Dashboard'}</strong></div>
        <div className="top-actions"><div className="status-pill"><span className="status-dot"></span> Simulation mode</div><button className="icon-button" aria-label="Safety guide" onClick={() => setShowSafety(true)}><ShieldCheck size={19}/></button><div className="avatar small">S</div></div>
      </header>

      {page === 'lab' && <div className="page-content">
        <section className="page-heading">
          <div><div className="eyebrow"><Sparkles size={14}/> VIRTUAL LABORATORY</div><h1>Let's experiment.</h1><p>Explore reactions, practice techniques, and learn by doing.</p></div>
          <button className="button button-secondary" onClick={resetBench}><RotateCcw size={16}/> Reset lab</button>
        </section>
        <section className="experiment-strip">
          <div className="experiment-symbol"><FlaskConical size={22}/></div><div className="experiment-copy"><span className="section-kicker">CURRENT EXPERIMENT</span><strong>{active.title}</strong><span>{active.description}</span></div>
          <div className="experiment-meta"><span><span className="meta-dot"></span>{active.level}</span><span>{active.time}</span></div>
          <button className="select-experiment" onClick={() => setPage('experiments')}>Change experiment <ChevronDown size={15}/></button>
        </section>

        <div className="lab-layout">
          <section className="panel equipment-panel">
            <div className="panel-heading"><div><h2>Equipment & solutions</h2><p>Choose items for your bench</p></div><button className="subtle-icon" aria-label="Help" onClick={() => setShowSafety(true)}><CircleHelp size={17}/></button></div>
            <div className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search solutions..." aria-label="Search solutions"/></div>
            <div className="subsection-title">GLASSWARE <span>Drag or click to add</span></div>
            <div className="equipment-grid">{equipment.map(item => { const Icon = iconMap[item.icon] || Beaker; return <button className="equipment-card" key={item.id} draggable onDragStart={e => e.dataTransfer.setData('equipmentId', item.id)} onClick={() => addEquipment(item.id)}><span className="equipment-icon"><Icon size={21}/></span><strong>{item.name}</strong><span>{item.detail}</span><span className="add-indicator"><Plus size={13}/></span></button>; })}</div>
            <div className="subsection-title solutions-title">AVAILABLE SOLUTIONS <span>{filteredSolutions.length} samples</span></div>
            <div className="solution-list">{filteredSolutions.map(solution => <button key={solution.id} onClick={() => setSelectedSolution(solution.id)} className={`solution-row ${selectedSolution === solution.id ? 'selected' : ''}`}><span className="solution-swatch" style={{ background: solution.color }}></span><span className="solution-name"><strong>{solution.name}</strong><small>{solution.formula}</small></span><span className="solution-radio">{selectedSolution === solution.id && <Check size={12}/>}</span></button>)}</div>
            <button className="button button-primary add-solution" onClick={addSelectedSolution}><Plus size={16}/> Add solution to selected vessel</button>
            <p className="panel-footnote"><ShieldCheck size={13}/> All solutions are virtual samples.</p>
          </section>

          <section className="panel bench-panel">
            <div className="panel-heading bench-heading"><div><h2>Laboratory bench</h2><p>Drag equipment here or click items to select</p></div><span className="bench-count">{benchItems.length} {benchItems.length === 1 ? 'item' : 'items'}</span></div>
            <div className="bench-workspace" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
              <div className="bench-grid"></div><div className="bench-window"><div className="window-pane"></div><div className="window-pane"></div><div className="window-pane"></div></div>
              <div className="bench-shelf"></div>
              <div className="bench-items">{benchItems.map((item, index) => { const eq = equipment.find(e => e.id === item.equipmentId) || equipment[0]; const sol = solutions.find(s => s.id === item.solutionId); return <div className={`bench-object ${activeVessel === item.uid ? 'chosen' : ''}`} key={item.uid} style={{ '--item-index': index }} onClick={() => setActiveVessel(item.uid)}><Glassware item={eq} solution={sol} selected={activeVessel === item.uid} onClick={() => setActiveVessel(item.uid)} onDragStart={e => e.dataTransfer.setData('benchUid', String(item.uid))}/><button className="remove-object" title="Remove equipment" aria-label="Remove equipment" onClick={e => { e.stopPropagation(); setBenchItems(items => items.filter(i => i.uid !== item.uid)); if (activeVessel === item.uid) setActiveVessel(benchItems.find(i => i.uid !== item.uid)?.uid || 0); }}><X size={12}/></button></div>; })}</div>
              {benchItems.length === 0 && <div className="empty-bench"><Beaker size={35}/><strong>Your bench is clear</strong><span>Add glassware from the equipment panel.</span></div>}
              <div className="bench-counter"><span className="live-dot"></span> VIRTUAL BENCH <span>·</span> INTERACTIVE MODE</div>
            </div>
            <div className="bench-toolbar"><div><span className="selection-dot"></span><span>{benchItems.find(i => i.uid === activeVessel) ? equipment.find(e => e.id === benchItems.find(i => i.uid === activeVessel).equipmentId)?.name : 'No vessel selected'}</span><small>Selected vessel</small></div><button className="button button-secondary" onClick={() => addEquipment('beaker')}><Plus size={15}/> Add beaker</button></div>
            <div className="mixing-controls"><div className="mixing-title"><div><h3>Mixing station</h3><p>Choose two samples to model an interaction.</p></div><span className="demo-tag">GUIDED MODE</span></div><div className="mixing-selects"><label>Sample A<select value={firstId} onChange={e => setFirstId(e.target.value)}>{solutions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select><span className="mixing-field-label">Concentration (mol/L)</span><input type="number" min="0" step="0.01" value={concentrationA} onChange={e => setConcentrationA(e.target.value)} /><span className="mixing-field-label">Volume (mL)</span><input type="number" min="0.1" step="1" value={volumeA} onChange={e => setVolumeA(e.target.value)} /></label><div className="mix-plus">+</div><label>Sample B<select value={secondId} onChange={e => setSecondId(e.target.value)}>{solutions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select><span className="mixing-field-label">Concentration (mol/L)</span><input type="number" min="0" step="0.01" value={concentrationB} onChange={e => setConcentrationB(e.target.value)} /><span className="mixing-field-label">Volume (mL)</span><input type="number" min="0.1" step="1" value={volumeB} onChange={e => setVolumeB(e.target.value)} /></label></div><div className="mixing-bottom"><span><ShieldCheck size={14}/> Simulated outcomes only</span><button className="button button-primary" onClick={() => { setNotice('Mixing model updated. Review the results panel.'); document.getElementById('results-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }}><Sparkles size={15}/> Run simulation</button></div></div>
          </section>

          <aside className="right-column">
            <section className="panel results-panel" id="results-panel"><div className="panel-heading"><div><h2>Experiment results</h2><p>Live simulation output</p></div><span className="result-icon"><Atom size={17}/></span></div><div className="result-visual" style={{ '--result-color': result.color }}><div className="result-orb"></div><span className="result-status"><span></span>{result.status}</span></div><div className="result-content"><span className="section-kicker">OBSERVATION</span><h3>{result.title}</h3><p>{result.observation}</p><ReactionVisual result={result} /><div className="equation-box"><span>MODELED EQUATION</span><strong>{result.equation}</strong></div>{result.calculation && <div className="mix-calculation"><strong>Quantity-aware estimate</strong><span>{result.calculation}</span>{result.finalPH != null && <span>Estimated final pH: <b>{result.finalPH.toFixed(2)}</b></span>}</div>}<div className="result-detail"><span className="detail-icon"><BookOpen size={15}/></span><p>{result.detail}</p></div></div><div className="results-footer"><span><span className="live-dot"></span> Updated from selected samples</span></div></section>
            <section className="panel objective-panel"><div className="objective-head"><span className="objective-icon"><GraduationCap size={17}/></span><span className="section-kicker">LEARNING OBJECTIVE</span></div><h3>{active.goal}</h3><div className="objective-progress"><div><span>Experiment progress</span><strong>In progress</strong></div><div className="progress-track"><span style={{ width: '45%' }}></span></div></div><button className="text-button" onClick={() => setPage('experiments')}>View experiment guide <span>→</span></button></section>
            <section className="panel notebook-mini"><div className="notebook-heading"><BookOpen size={17}/><strong>Quick observation</strong></div><textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="What did you notice? Record your observation..." rows={3}></textarea><div className="notebook-bottom"><span>{notes.length} characters</span><button className="button button-primary button-small" onClick={saveObservation}><Save size={14}/> Save note</button></div></section>
          </aside>
        </div>
        {notice && <div className="toast" role="status"><Check size={16}/>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={14}/></button></div>}
      </div>}

      {page === 'dashboard' && <div className="page-content"><section className="page-heading"><div><div className="eyebrow"><Sparkles size={14}/> YOUR LEARNING SPACE</div><h1>Welcome to your lab.</h1><p>Build confidence with guided, interactive chemistry practice.</p></div><button className="button button-primary" onClick={() => setPage('lab')}><FlaskConical size={16}/> Enter virtual lab</button></section><div className="stats-grid"><div className="stat-card"><span className="stat-icon purple"><FlaskConical size={20}/></span><span>Available experiments</span><strong>{experiments.length}</strong><small>Ready to explore</small></div><div className="stat-card"><span className="stat-icon blue"><BookOpen size={20}/></span><span>Notebook entries</span><strong>{savedNotes.length}</strong><small>Observations saved</small></div><div className="stat-card"><span className="stat-icon green"><Check size={20}/></span><span>Practice status</span><strong>Started</strong><small>Your learning journey</small></div></div><div className="section-heading"><div><h2>Pick up where you left off</h2><p>Continue with a guided practical or choose a new activity.</p></div><button className="text-button" onClick={() => setPage('experiments')}>All experiments →</button></div><div className="experiment-cards">{experiments.map((e, i) => <button key={e.id} className="experiment-card" onClick={() => { setActiveExperiment(e.id); setPage('lab'); }}><div className={`experiment-card-art art-${i}`}><span>{i === 0 ? <Atom size={28}/> : i === 1 ? <FlaskConical size={28}/> : <Beaker size={28}/>}</span><small>{e.category}</small></div><div className="experiment-card-body"><div className="card-meta"><span>{e.level}</span><span>{e.time}</span></div><h3>{e.title}</h3><p>{e.description}</p><div className="card-link">Start experiment <span>→</span></div></div></button>)}</div></div>}

      {page === 'experiments' && <div className="page-content"><section className="page-heading"><div><div className="eyebrow"><Microscope size={14}/> PRACTICAL LIBRARY</div><h1>Explore experiments.</h1><p>Choose a guided activity and learn at your own pace.</p></div></section><div className="experiment-list">{experiments.map((e, i) => <div className="experiment-list-card" key={e.id}><div className={`list-art art-${i}`}>{i === 0 ? <Atom size={25}/> : i === 1 ? <FlaskConical size={25}/> : <Beaker size={25}/>}</div><div className="experiment-list-copy"><div className="card-meta"><span>{e.category}</span><span>{e.level}</span><span>{e.time}</span></div><h3>{e.title}</h3><p>{e.description}</p><div className="experiment-goal"><strong>Learning objective:</strong> {e.goal}</div></div><button className="button button-primary" onClick={() => { setActiveExperiment(e.id); setPage('lab'); }}>Open experiment <span>→</span></button></div>)}</div><div className="coming-soon"><Sparkles size={19}/><div><strong>More practicals are on the roadmap</strong><p>Next: titration curves, solubility, reaction rates, and separation techniques.</p></div></div></div>}

      {page === 'notebook' && <div className="page-content"><section className="page-heading"><div><div className="eyebrow"><BookOpen size={14}/> YOUR RECORDS</div><h1>Lab notebook.</h1><p>Keep a record of what you observe during virtual practicals.</p></div><button className="button button-secondary" onClick={() => setPage('lab')}><Plus size={16}/> New observation</button></section>{savedNotes.length === 0 ? <div className="notebook-empty"><div><BookOpen size={29}/></div><h2>Your notebook is ready.</h2><p>Run a simulation, record what you observe, and save your first entry.</p><button className="button button-primary" onClick={() => setPage('lab')}>Go to virtual lab</button></div> : <div className="saved-notes">{savedNotes.map(note => <article className="saved-note" key={note.id}><div className="saved-note-icon"><BookOpen size={18}/></div><div><div className="note-date">{note.date}</div><h3>{note.title}</h3><p>{note.note}</p></div><button className="subtle-icon" aria-label="Delete note" onClick={() => setSavedNotes(items => items.filter(n => n.id !== note.id))}><Trash2 size={16}/></button></article>)}</div>}</div>}
    </main>
    {showSafety && <div className="modal-backdrop" onClick={() => setShowSafety(false)}><section className="safety-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="safety-title"><button className="modal-close" onClick={() => setShowSafety(false)} aria-label="Close"><X size={18}/></button><div className="safety-modal-icon"><ShieldCheck size={25}/></div><div className="eyebrow">BEFORE YOU BEGIN</div><h2 id="safety-title">Virtual lab safety</h2><p>This application is an educational simulation. It does not replace laboratory training, supervision, risk assessments, or safety data sheets.</p><ul><li>Never use simulated outcomes as instructions for a real experiment.</li><li>In a physical lab, follow your instructor's procedures and wear the required PPE.</li><li>Use only approved chemicals and equipment in a supervised laboratory.</li><li>Reaction colors, gas bubbles, and equations in this prototype are illustrative models.</li></ul><button className="button button-primary modal-done" onClick={() => setShowSafety(false)}>I understand</button></section></div>}
  </div>;
}
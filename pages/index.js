import Head from 'next/head'
import { useState, useRef, useCallback } from 'react'

const T = {
  en: {
    tagline: 'AI CEO that builds and runs startups',
    command: 'Command', team: 'Team', output: 'Output',
    launch: 'Launch', strategy: 'Strategy', ceo: 'CEO Plan',
    agents: 'Agents', tasks: 'Tasks', outputs: 'Outputs', log: 'Activity Log',
    idea: 'Your Business Idea',
    placeholder: "Describe your startup idea... e.g. 'Launch a coaching business for young professionals'",
    quickstart: 'Quick Start',
    howitworks: 'How It Works',
    launchBtn: 'Launch Farouk', runningBtn: 'Running...',
    ready: 'ready', running: 'running', analyzing: 'analyzing', planning: 'planning',
    orchestrating: 'orchestrating', agentsactive: 'agents active', generating: 'generating', complete: 'complete',
    idle: 'idle', working: 'working...', done: 'done',
    waiting: 'Waiting for assignment', allDone: 'All tasks complete',
    dispatch: '→ Dispatching all agents simultaneously...\n',
    consultingMode: 'CONSULTING MODE', ceoMode: 'CEO MODE', agentLayer: 'AGENT LAYER', deliverables: 'DELIVERABLES',
    strategicAnalysis: 'Strategic Analysis', ceoExecutionPlan: 'CEO Execution Plan',
    aiAgentTeam: 'AI Agent Team', taskOrchestration: 'Task Orchestration', executionOutputs: 'Execution Outputs',
    noStrategy: 'No strategy yet', noStrategySub: 'Launch Farouk to generate a full strategic analysis',
    noCeo: 'Awaiting CEO plan', noCeoSub: 'Generated after strategic analysis',
    noTasks: 'No tasks yet', noTasksSub: 'Auto-generated and assigned after launch',
    noOutputs: 'No outputs yet', noOutputsSub: 'Full report generated after agent execution',
    dispatchLog: 'Dispatch log', dispatchWaiting: 'Agents standing by. Launch Farouk to begin.',
    chips: [
      'Launch a coaching business for young professionals',
      'Build a SaaS tool that helps remote teams track team health',
      'Create a marketplace for local artisans selling handmade goods',
      'Launch an AI-powered mental wellness app for students'
    ],
    archCards: [
      { tag: 't-p', label: 'STRATEGY', desc: 'McKinsey-level market analysis, positioning & business model' },
      { tag: 't-t', label: 'CEO LAYER', desc: '90-day roadmap, team structure & key decisions' },
      { tag: 't-o', label: 'AGENTS', desc: 'Léa · Hakim · Sarah · Omar — 4 AI employees running in parallel' },
      { tag: 't-b', label: 'OUTPUTS', desc: 'Business plan, GTM strategy, product roadmap, action items' }
    ],
    agentNames: { marketing: 'Léa — Marketing', engineering: 'Hakim — Engineering', sales: 'Sarah — Sales', ops: 'Omar — Ops' },
    agentRoles: { marketing: 'Growth, Content, Brand', engineering: 'Product, Code, Systems', sales: 'Outreach, Conversion', ops: 'Process, Automation' },
    agentInitials: { marketing: 'LÉA', engineering: 'HAK', sales: 'SAR', ops: 'OMA' },
    stratSys: `You are Farouk — an AI CEO and McKinsey-level strategy consultant. Be specific with numbers. Use ALL CAPS section headers. Plain text only. No markdown.`,
    stratUser: i => `Strategic analysis for: "${i}"\n\nMARKET OPPORTUNITY\nTARGET USERS\nPOSITIONING\nBUSINESS MODEL\nKEY RISKS\nSTRATEGIC RECOMMENDATION`,
    ceoSys: `You are Farouk — a decisive startup CEO. Translate strategy into concrete execution. ALL CAPS headers. Plain text. No markdown.`,
    ceoUser: (i, s) => `Strategy for "${i}": ${s}\n\nCOMPANY STRUCTURE\n90-DAY ROADMAP\nAGENT ASSIGNMENTS\nKEY DECISIONS THIS WEEK\nSUCCESS METRICS`,
    taskSys: `Output ONLY valid JSON array. No markdown. No explanation. No text before or after.`,
    taskUser: (i, c) => `Plan for "${i}": ${c.slice(0, 500)}\nGenerate 8 tasks: [{"id":1,"agent":"marketing|engineering|sales|ops","title":"task title","priority":"high|medium","done":false}]\nJSON array only.`,
    agentSys: n => `You are ${n}, an AI employee at a startup. Execute assigned tasks concretely. English only.`,
    agentUser: (i, t) => `Startup: "${i}"\nTasks: ${t}\nReport what you accomplished for each task. Be specific.`,
    outSys: `Generate a structured startup report. ALL CAPS headers. Plain text. Professional prose. No markdown.`,
    outUser: (i, s, c) => `Report for "${i}".\nStrategy: ${s.slice(0, 300)}\nPlan: ${c.slice(0, 300)}\n\nEXECUTIVE SUMMARY\nGO-TO-MARKET STRATEGY\nPRODUCT ROADMAP\nREVENUE PROJECTIONS\nWEEK 1 ACTION ITEMS`,
    logL: i => `OS launched — "${i.slice(0, 45)}..."`,
    logS: 'Analyzing market and defining strategy...',
    logSD: 'Strategy complete. Handing off to CEO.',
    logC: 'Building 90-day roadmap and assembling team...',
    logCD: 'CEO plan ready. Dispatching agents.',
    logT: 'Generating and assigning tasks...',
    logTD: n => `${n} tasks generated and assigned.`,
    logAon: n => `${n} online. Executing tasks.`,
    logAd: n => `${n} completed all tasks.`,
    logO: 'Generating consolidated report...',
    logD: 'All outputs ready.',
  },
  fr: {
    tagline: 'Le CEO IA qui construit et pilote des startups',
    command: 'Commande', team: 'Équipe', output: 'Résultats',
    launch: 'Lancer', strategy: 'Stratégie', ceo: 'Plan CEO',
    agents: 'Agents', tasks: 'Tâches', outputs: 'Livrables', log: 'Journal',
    idea: 'Votre Idée de Startup',
    placeholder: "Décrivez votre idée... ex. 'Lancer un business de coaching pour jeunes professionnels'",
    quickstart: 'Démarrage Rapide',
    howitworks: 'Comment ça marche',
    launchBtn: 'Lancer Farouk', runningBtn: 'En cours...',
    ready: 'prêt', running: 'en cours', analyzing: 'analyse', planning: 'planification',
    orchestrating: 'orchestration', agentsactive: 'agents actifs', generating: 'génération', complete: 'terminé',
    idle: 'inactif', working: 'actif...', done: 'terminé',
    waiting: "En attente d'affectation", allDone: 'Toutes les tâches complètes',
    dispatch: '→ Dispatch simultané de tous les agents...\n',
    consultingMode: 'MODE CONSEIL', ceoMode: 'MODE CEO', agentLayer: 'COUCHE AGENTS', deliverables: 'LIVRABLES',
    strategicAnalysis: 'Analyse Stratégique', ceoExecutionPlan: "Plan d'Exécution CEO",
    aiAgentTeam: "Équipe d'Agents IA", taskOrchestration: 'Orchestration des Tâches', executionOutputs: "Livrables d'Exécution",
    noStrategy: 'Aucune stratégie', noStrategySub: 'Lancez Farouk pour générer une analyse stratégique complète',
    noCeo: 'En attente du plan CEO', noCeoSub: 'Généré après l\'analyse stratégique',
    noTasks: 'Aucune tâche', noTasksSub: 'Générées automatiquement après le lancement',
    noOutputs: 'Aucun livrable', noOutputsSub: 'Rapport complet généré après l\'exécution des agents',
    dispatchLog: 'Journal de dispatch', dispatchWaiting: 'Agents en attente. Lancez Farouk pour commencer.',
    chips: [
      'Lancer un business de coaching pour jeunes professionnels',
      'Créer un SaaS pour mesurer la santé des équipes distantes',
      'Créer une marketplace pour artisans locaux',
      'Lancer une app de bien-être IA pour étudiants'
    ],
    archCards: [
      { tag: 't-p', label: 'STRATEGY', desc: 'Analyse de marché niveau McKinsey, positionnement & modèle économique' },
      { tag: 't-t', label: 'CEO LAYER', desc: 'Feuille de route 90 jours, structure d\'équipe & décisions clés' },
      { tag: 't-o', label: 'AGENTS', desc: 'Léa · Hakim · Sarah · Omar — 4 agents IA en parallèle' },
      { tag: 't-b', label: 'OUTPUTS', desc: 'Plan d\'affaires, stratégie GTM, roadmap produit, plan d\'action' }
    ],
    agentNames: { marketing: 'Léa — Marketing', engineering: 'Hakim — Ingénierie', sales: 'Sarah — Commercial', ops: 'Omar — Opérations' },
    agentRoles: { marketing: 'Croissance, Contenu, Marque', engineering: 'Produit, Code, Systèmes', sales: 'Prospection, Conversion', ops: 'Processus, Automatisation' },
    agentInitials: { marketing: 'LÉA', engineering: 'HAK', sales: 'SAR', ops: 'OMA' },
    stratSys: `Tu es Farouk — CEO IA et consultant niveau McKinsey. Sois précis avec des chiffres. Titres en MAJUSCULES. Texte simple. Réponds en français.`,
    stratUser: i => `Analyse stratégique pour : "${i}"\n\nOPPORTUNITÉ DE MARCHÉ\nUTILISATEURS CIBLES\nPOSITIONNEMENT\nMODÈLE ÉCONOMIQUE\nRISQUES PRINCIPAUX\nRECOMMANDATION STRATÉGIQUE`,
    ceoSys: `Tu es Farouk — CEO de startup décisif. Traduis la stratégie en exécution concrète. MAJUSCULES. Texte simple. Français.`,
    ceoUser: (i, s) => `Stratégie pour "${i}" : ${s}\n\nSTRUCTURE DE L'ENTREPRISE\nFEUILLE DE ROUTE 90 JOURS\nASSIGNATIONS AGENTS\nDÉCISIONS CLÉS CETTE SEMAINE\nMÉTRIQUES DE SUCCÈS`,
    taskSys: `Réponds UNIQUEMENT avec un tableau JSON valide. Aucun texte avant ou après.`,
    taskUser: (i, c) => `Plan pour "${i}" : ${c.slice(0, 500)}\nGénère 8 tâches : [{"id":1,"agent":"marketing|engineering|sales|ops","title":"titre","priority":"high|medium","done":false}]\nTableau JSON uniquement.`,
    agentSys: n => `Tu es ${n}, employé IA d'une startup. Exécute les tâches concrètement. Réponds en français.`,
    agentUser: (i, t) => `Startup : "${i}"\nTâches : ${t}\nRapporte ce que tu as accompli pour chaque tâche.`,
    outSys: `Génère un rapport de startup. MAJUSCULES. Texte simple. Prose professionnelle. Français.`,
    outUser: (i, s, c) => `Rapport pour "${i}".\nStratégie : ${s.slice(0, 300)}\nPlan : ${c.slice(0, 300)}\n\nRÉSUMÉ EXÉCUTIF\nSTRATÉGIE GO-TO-MARKET\nFEUILLE DE ROUTE PRODUIT\nPROJECTIONS DE REVENUS\nACTIONS SEMAINE 1`,
    logL: i => `OS lancé — "${i.slice(0, 45)}..."`,
    logS: 'Analyse du marché et définition de la stratégie...',
    logSD: 'Stratégie complète. Transfert vers le CEO.',
    logC: "Construction feuille de route 90 jours et assemblage de l'équipe...",
    logCD: 'Plan CEO prêt. Dispatch des agents.',
    logT: 'Génération et assignation des tâches...',
    logTD: n => `${n} tâches générées et assignées.`,
    logAon: n => `${n} en ligne. Exécution des tâches.`,
    logAd: n => `${n} a complété toutes ses tâches.`,
    logO: 'Génération du rapport consolidé...',
    logD: 'Tous les livrables sont prêts.',
  }
}

const agentColors = {
  marketing: { bg: '#EEEDFE', fg: '#3C3489', status: '#534AB7' },
  engineering: { bg: '#E1F5EE', fg: '#0F6E56', status: '#1D9E75' },
  sales: { bg: '#FAEEDA', fg: '#854F0B', status: '#BA7517' },
  ops: { bg: '#E6F1FB', fg: '#185FA5', status: '#185FA5' }
}

const AGENT_KEYS = ['marketing', 'engineering', 'sales', 'ops']

export default function Farouk() {
  const [lang, setLang] = useState('en')
  const [screen, setScreen] = useState('launch')
  const [idea, setIdea] = useState('')
  const [running, setRunning] = useState(false)
  const [statusTxt, setStatusTxt] = useState('ready')
  const [strategy, setStrategy] = useState('')
  const [ceo, setCeo] = useState('')
  const [tasks, setTasks] = useState([])
  const [outputs, setOutputs] = useState('')
  const [logs, setLogs] = useState([{ t: '00:00', agent: 'SYSTEM', color: '#534AB7', msg: 'Farouk initialized and ready' }])
  const [agents, setAgents] = useState({ marketing: { status: 'idle', progress: 0, task: '' }, engineering: { status: 'idle', progress: 0, task: '' }, sales: { status: 'idle', progress: 0, task: '' }, ops: { status: 'idle', progress: 0, task: '' } })
  const [dispatchLog, setDispatchLog] = useState('')
  const t0 = useRef(null)

  const l = T[lang]

  const ts = () => {
    if (!t0.current) return '00:00'
    const s = Math.floor((Date.now() - t0.current) / 1000)
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0')
  }

  const addLog = useCallback((agent, msg, color) => {
    setLogs(prev => [...prev, { t: ts(), agent, msg, color }])
  }, [])

  const updateAgent = (key, patch) => setAgents(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }))

  const callAPI = async (sys, user) => {
    const res = await fetch('https://farouk-proxy.aissamsigoul7.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1000, system: sys, messages: [{ role: 'user', content: user }] })
    })
    const data = await res.json()
    return data.content?.map(b => b.text || '').join('') || ''
  }

  const run = async () => {
    if (!idea.trim() || running) return
    setRunning(true)
    t0.current = Date.now()
    setStatusTxt(l.running)

    addLog('SYSTEM', l.logL(idea), '#534AB7')

    // STRATEGY
    setScreen('strategy')
    setStrategy('')
    addLog('STRATEGY', l.logS, '#7F77DD')
    setStatusTxt(l.analyzing)
    const stratResult = await callAPI(l.stratSys, l.stratUser(idea))
    setStrategy(stratResult)
    addLog('STRATEGY', l.logSD, '#7F77DD')

    // CEO
    setScreen('ceo')
    setCeo('')
    addLog('CEO', l.logC, '#1D9E75')
    setStatusTxt(l.planning)
    const ceoResult = await callAPI(l.ceoSys, l.ceoUser(idea, stratResult))
    setCeo(ceoResult)
    addLog('CEO', l.logCD, '#1D9E75')

    // TASKS
    setScreen('tasks')
    addLog('OPS', l.logT, '#BA7517')
    setStatusTxt(l.orchestrating)
    let taskList = []
    try {
      const raw = await callAPI(l.taskSys, l.taskUser(idea, ceoResult))
      const cleaned = raw.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(cleaned)
      if (Array.isArray(parsed)) taskList = parsed
    } catch (e) {
      taskList = [
        { id: 1, agent: 'marketing', title: lang === 'fr' ? 'Définir identité de marque' : 'Define brand identity', priority: 'high', done: false },
        { id: 2, agent: 'engineering', title: lang === 'fr' ? 'Construire liste MVP' : 'Build MVP feature list', priority: 'high', done: false },
        { id: 3, agent: 'sales', title: lang === 'fr' ? 'Cartographier 50 clients' : 'Map 50 potential customers', priority: 'high', done: false },
        { id: 4, agent: 'ops', title: lang === 'fr' ? 'Configurer gestion projet' : 'Set up project management', priority: 'medium', done: false },
        { id: 5, agent: 'marketing', title: lang === 'fr' ? 'Rédiger copy landing page' : 'Write landing page copy', priority: 'high', done: false },
        { id: 6, agent: 'engineering', title: lang === 'fr' ? 'Prototyper flux utilisateur' : 'Prototype core user flow', priority: 'high', done: false },
        { id: 7, agent: 'sales', title: lang === 'fr' ? 'Rédiger séquences prospection' : 'Draft outreach sequences', priority: 'medium', done: false },
        { id: 8, agent: 'ops', title: lang === 'fr' ? 'Créer processus onboarding' : 'Create onboarding process', priority: 'medium', done: false }
      ]
    }
    setTasks(taskList)
    addLog('OPS', l.logTD(taskList.length), '#BA7517')

    // AGENTS
    setScreen('agents')
    setStatusTxt(l.agentsactive)
    setDispatchLog(l.dispatch)

    await Promise.all(AGENT_KEYS.map(async key => {
      const name = l.agentNames[key]
      const color = agentColors[key].status
      updateAgent(key, { status: 'working', progress: 20, task: l.working })
      addLog(name, l.logAon(name), color)
      const myTasks = taskList.filter(t => t.agent === key).map(t => t.title).join(', ')
      try {
        updateAgent(key, { progress: 50 })
        await callAPI(l.agentSys(name), l.agentUser(idea, myTasks))
        updateAgent(key, { progress: 85 })
        setTasks(prev => prev.map(t => t.agent === key ? { ...t, done: true } : t))
        addLog(name, l.logAd(name), color)
      } catch (e) {
        updateAgent(key, { status: 'idle', progress: 0, task: '' })
      }
    }))

    // OUTPUTS
    addLog('SYSTEM', l.logO, '#534AB7')
    setStatusTxt(l.generating)
    const outResult = await callAPI(l.outSys, l.outUser(idea, stratResult, ceoResult))
    setOutputs(outResult || 'Output generation complete.')
    setScreen('outputs')

    AGENT_KEYS.forEach(key => updateAgent(key, { status: 'done', progress: 100, task: l.allDone }))
    setStatusTxt(l.complete)
    addLog('SYSTEM', l.logD, '#3B6D11')
    setRunning(false)
  }

  const toggleTask = id => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const doneTasks = tasks.filter(t => t.done).length

  const navItems = [
    { id: 'launch', label: l.launch, section: l.command },
    { id: 'strategy', label: l.strategy },
    { id: 'ceo', label: l.ceo, sectionAfter: l.team },
    { id: 'agents', label: l.agents },
    { id: 'tasks', label: l.tasks, sectionAfter: l.output },
    { id: 'outputs', label: l.outputs },
    { id: 'log', label: l.log }
  ]

  return (
    <>
      <Head>
        <title>Farouk — AI CEO that builds and runs startups</title>
        <meta name="description" content="AI CEO operating system for startups. Strategy, agents, execution." />
      </Head>

      <div className="os">
        {/* HEADER */}
        <div className="hdr">
          <div className="logo">
            <div className="logo-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#EEEDFE"/>
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#9FE1CB"/>
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#FAEEDA"/>
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#B5D4F4"/>
              </svg>
            </div>
            <div>
              <div className="logo-name">Farouk</div>
              <div className="logo-sub">{l.tagline}</div>
            </div>
          </div>
          <div className="hdr-r">
            <div className="lang">
              <button className={`lb ${lang === 'en' ? 'on' : ''}`} onClick={() => setLang('en')}>EN</button>
              <button className={`lb ${lang === 'fr' ? 'on' : ''}`} onClick={() => setLang('fr')}>FR</button>
            </div>
            <div className="st">
              <div className="dot" style={{ background: running ? '#BA7517' : '#639922' }}></div>
              <span>{statusTxt}</span>
            </div>
          </div>
        </div>

        <div className="body">
          {/* SIDEBAR */}
          <div className="sidebar">
            <div className="ns">{l.command}</div>
            {['launch', 'strategy', 'ceo'].map(id => (
              <div key={id} className={`ni ${screen === id ? 'on' : ''}`} onClick={() => setScreen(id)}>
                {l[id === 'ceo' ? 'ceo' : id]}
              </div>
            ))}
            <div className="ns">{l.team}</div>
            {['agents', 'tasks'].map(id => (
              <div key={id} className={`ni ${screen === id ? 'on' : ''}`} onClick={() => setScreen(id)}>
                {l[id]}
              </div>
            ))}
            <div className="ns">{l.output}</div>
            {['outputs', 'log'].map(id => (
              <div key={id} className={`ni ${screen === id ? 'on' : ''}`} onClick={() => setScreen(id)}>
                {l[id]}
              </div>
            ))}
          </div>

          {/* MAIN */}
          <div className="main">

            {/* LAUNCH */}
            <div className={`sc ${screen === 'launch' ? 'on' : ''}`}>
              <div>
                <div className="lbl">{l.idea}</div>
                <div className="card" style={{ marginTop: 7 }}>
                  <textarea rows={3} value={idea} onChange={e => setIdea(e.target.value)} placeholder={l.placeholder} />
                  <div className="foot">
                    <div className="mt">claude-sonnet-4-6 · bilingual EN/FR</div>
                    <button className="btn" onClick={run} disabled={running}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1L7 4H11L8 6.5L9 10L5.5 8L2 10L3 6.5L0 4H4Z" fill="currentColor"/></svg>
                      {running ? l.runningBtn : l.launchBtn}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="lbl">{l.quickstart}</div>
                <div className="chips" style={{ marginTop: 7 }}>
                  {l.chips.map((c, i) => (
                    <div key={i} className="chip" onClick={() => setIdea(c)}>{c}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="lbl">{l.howitworks}</div>
                <div className="arch-grid">
                  {l.archCards.map((c, i) => (
                    <div key={i} className="arch-card">
                      <span className={`tag ${c.tag}`}>{c.label}</span>
                      <div className="arch-desc">{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STRATEGY */}
            <div className={`sc ${screen === 'strategy' ? 'on' : ''}`}>
              <div className="sh">
                <div className="lbl">{l.strategicAnalysis}</div>
                <span className="tag t-p">{l.consultingMode}</span>
              </div>
              {strategy ? (
                <div className="out">{strategy}</div>
              ) : (
                <div className="empty">
                  <div className="et">{l.noStrategy}</div>
                  <div className="ed">{l.noStrategySub}</div>
                </div>
              )}
            </div>

            {/* CEO */}
            <div className={`sc ${screen === 'ceo' ? 'on' : ''}`}>
              <div className="sh">
                <div className="lbl">{l.ceoExecutionPlan}</div>
                <span className="tag t-t">{l.ceoMode}</span>
              </div>
              {ceo ? (
                <div className="out">{ceo}</div>
              ) : (
                <div className="empty">
                  <div className="et">{l.noCeo}</div>
                  <div className="ed">{l.noCeoSub}</div>
                </div>
              )}
            </div>

            {/* AGENTS */}
            <div className={`sc ${screen === 'agents' ? 'on' : ''}`}>
              <div className="sh">
                <div className="lbl">{l.aiAgentTeam}</div>
                <span className="tag t-o">{l.agentLayer}</span>
              </div>
              <div className="ag-grid">
                {AGENT_KEYS.map(key => {
                  const ag = agents[key]
                  const colors = agentColors[key]
                  const statusCls = ag.status === 'working' ? 's-w' : ag.status === 'done' ? 's-d' : 's-i'
                  const statusLabel = ag.status === 'working' ? l.working : ag.status === 'done' ? l.done : l.idle
                  return (
                    <div key={key} className="ag">
                      <div className="ag-top">
                        <div className="av" style={{ background: colors.bg, color: colors.fg }}>{l.agentInitials[key]}</div>
                        <div style={{ flex: 1 }}>
                          <div className="an">{l.agentNames[key]}</div>
                          <div className="ar">{l.agentRoles[key]}</div>
                        </div>
                        <div className={`as ${statusCls}`}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }}></div>
                          {statusLabel}
                        </div>
                      </div>
                      <div className="pb"><div className="pf" style={{ width: `${ag.progress}%` }}></div></div>
                      <div className="at">{ag.task || l.waiting}</div>
                    </div>
                  )
                })}
              </div>
              <div className="card">
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{l.dispatchLog}</div>
                <div className="disp">{dispatchLog || l.dispatchWaiting}</div>
              </div>
            </div>

            {/* TASKS */}
            <div className={`sc ${screen === 'tasks' ? 'on' : ''}`}>
              <div className="sh">
                <div className="lbl">{l.taskOrchestration}</div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontFamily: 'DM Mono, monospace' }}>{doneTasks}/{tasks.length}</div>
              </div>
              {tasks.length > 0 ? (
                <div className="tasks-list">
                  {tasks.map(tk => {
                    const colors = agentColors[tk.agent]
                    return (
                      <div key={tk.id} className="tk">
                        <div className={`ck ${tk.done ? 'done' : ''}`} onClick={() => toggleTask(tk.id)}>
                          {tk.done && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="tt" style={{ textDecoration: tk.done ? 'line-through' : 'none', opacity: tk.done ? 0.45 : 1 }}>{tk.title}</div>
                          <div className="tm">
                            <span className="bdg" style={{ background: colors.bg, color: colors.fg }}>{tk.agent.toUpperCase()}</span>
                            <span style={{ fontSize: 10, color: tk.priority === 'high' ? '#C04A28' : '#BA7517' }}>{tk.priority}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="empty">
                  <div className="et">{l.noTasks}</div>
                  <div className="ed">{l.noTasksSub}</div>
                </div>
              )}
            </div>

            {/* OUTPUTS */}
            <div className={`sc ${screen === 'outputs' ? 'on' : ''}`}>
              <div className="sh">
                <div className="lbl">{l.executionOutputs}</div>
                <span className="tag t-b">{l.deliverables}</span>
              </div>
              {outputs ? (
                <div className="out">{outputs}</div>
              ) : (
                <div className="empty">
                  <div className="et">{l.noOutputs}</div>
                  <div className="ed">{l.noOutputsSub}</div>
                </div>
              )}
            </div>

            {/* LOG */}
            <div className={`sc ${screen === 'log' ? 'on' : ''}`}>
              <div className="lbl">{l.log}</div>
              <div className="card">
                {logs.map((entry, i) => (
                  <div key={i} className="log-r">
                    <span className="lt">{entry.t}</span>
                    <span className="la" style={{ color: entry.color }}>{entry.agent}</span>
                    <span className="lm">{entry.msg}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import logo from '../assets/logo-cut.png';

const FEATURES = [
  {
    icon: '🎯',
    title: 'Coach Virtuale Edge AI',
    text: "Rilevamento in tempo reale della postura durante l'esercizio, direttamente sul tuo dispositivo. Massima fluidità e zero tempi di caricamento: nessun dato video lascia mai il tuo smartphone.",
  },
  {
    icon: '🛠️',
    title: 'Regole su misura del Trainer',
    text: 'Niente algoritmi rigidi e standardizzati. Il tuo trainer personalizza gli angoli di movimento perfetti per la tua mobilità e il tuo coach virtuale seguirà esattamente le sue indicazioni.',
  },
  {
    icon: '📋',
    title: 'Schede Intelligenti',
    text: "I tuoi programmi di allenamento si filtrano e si adattano automaticamente in base all'attrezzatura che hai davvero a disposizione in quel momento, a casa o in palestra.",
  },
  {
    icon: '📈',
    title: 'Progressi Tracciati',
    text: 'Storico degli allenamenti, evoluzione del tuo Form Score e analisi dei trend nel tempo per ogni singolo esercizio. Tutto pulito, analitico e sempre a portata di mano.',
  },
];

const STEPS = [
  { n: '01', title: 'Crea il tuo profilo', text: "Registrati in pochi clic e indica l'attrezzatura che possiedi o a cui hai accesso." },
  { n: '02', title: 'Sotto la guida del tuo Coach', text: 'Segui un programma preimpostato o riscatta la scheda personalizzata creata appositamente dal tuo Personal Trainer.' },
  { n: '03', title: "Muoviti a regola d'arte", text: 'Accendi la fotocamera e allenati. Ricevi correzioni istantanee sulla forma e analisi biometriche serie dopo serie.' },
];

const Landing = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-vh-100 overflow-hidden">
      {/* Nav minimale */}
      <nav className="container-fluid px-4 py-3 d-flex justify-content-between align-items-start">
        <img src={logo} alt="CoachFrame" style={{ height: '200px', width: 'auto' }} />
        <div className="d-flex gap-2 align-items-center">
          <Link to="/login" className="btn btn-outline-info btn-sm px-3">Accedi</Link>
          <Link to="/registrati" className="btn btn-info btn-sm px-3">Registrati</Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <header className="container text-center py-5 mt-4" style={{ maxWidth: 860 }}>
        <span className="badge rounded-pill ff-glass text-ff-primary px-3 py-2 mb-4 small fw-semibold">
          Il tuo coach virtuale, ovunque tu ti alleni
        </span>
        <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: 1.1 }}>
          Allenati con la forma giusta,<br />
          <span className="ff-gradient-text">sempre.</span>
        </h1>
        <p className="fs-5 text-muted mb-5 mx-auto" style={{ maxWidth: 620 }}>
          CoachFrame analizza il tuo movimento in tempo reale tramite Edge AI e ti guida secondo
          le regole geometriche impostate dal tuo trainer — anche quando ti alleni da solo, a casa.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/registrati" className="btn btn-info btn-lg px-4 fw-bold">
            Inizia gratis
          </Link>
          <Link to="/login" className="btn btn-outline-info btn-lg px-4">
            Ho già un account
          </Link>
        </div>
      </header>

      {/* Preview visivo */}
      <div className="container mb-5" style={{ maxWidth: 900 }}>
        <div className="ff-glass rounded-4 p-2 p-md-4 shadow-lg">
          <div className="card bg-ff-surface border-0 p-4">
            <div className="row g-3 text-start">
              <div className="col-4">
                <div className="small text-muted text-uppercase">Sessioni</div>
                <div className="fs-3 fw-bold text-ff-primary">24</div>
              </div>
              <div className="col-4">
                <div className="small text-muted text-uppercase">Form Score</div>
                <div className="fs-3 fw-bold text-ff-secondary">91%</div>
              </div>
              <div className="col-4">
                <div className="small text-muted text-uppercase">Streak</div>
                <div className="fs-3 fw-bold text-ff-primary">6 giorni</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-2">Tutto quello che serve per allenarti bene</h2>
        <p className="text-center text-muted mb-5">Pensato per chi si allena e per i professionisti che li seguono.</p>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {FEATURES.map((f) => (
            <div className="col" key={f.title}>
              <div className="card h-100 bg-ff-surface border-0 p-2">
                <div className="card-body">
                  <div className="fs-2 mb-3">{f.icon}</div>
                  <h5 className="fw-bold mb-2">{f.title}</h5>
                  <p className="text-muted mb-0">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Come funziona */}
      <section className="container py-5" style={{ maxWidth: 900 }}>
        <h2 className="text-center fw-bold mb-5">Come funziona</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {STEPS.map((s) => (
            <div className="col text-center" key={s.n}>
              <div className="fs-1 fw-bold ff-gradient-text mb-2">{s.n}</div>
              <h6 className="fw-bold">{s.title}</h6>
              <p className="text-muted small">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="container text-center py-5">
        <div className="ff-glass rounded-4 p-5">
          <h3 className="fw-bold mb-3">Pronto a migliorare la tua forma?</h3>
          <p className="text-muted mb-4">Crea il tuo account gratuito in meno di un minuto ed entra nell'era del fitness di precisione.</p>
          <Link to="/registrati" className="btn btn-info btn-lg px-4 fw-bold">
            Registrati ora
          </Link>
        </div>
      </section>

      <footer className="text-center text-muted small py-4 border-top border-ff">
        © {new Date().getFullYear()} CoachFrame — Il tuo coach virtuale.
      </footer>
    </div>
  );
};

export default Landing;

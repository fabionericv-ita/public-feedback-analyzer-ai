// src/components/Header.jsx
export default function Header({ onOpenSettings, onNavigate, currentView }) {
  return (
    <>
      <header className="header">
        {/* PARTE SINISTRA */}
        <div 
          className="header-left" 
          onClick={() => onNavigate('dashboard')} 
          style={{ cursor: 'pointer' }}
          title="Torna all'analisi"
        >
          <span className="material-symbols-outlined title-icon">account_balance</span>
          
          <div className="header-info">
            <h1 className="title">PA Feedback Hub</h1>
            <p className="subtitle">Gestione AI dei Feedback dei Cittadini</p>
          </div>
        </div>

        {/* PARTE DESTRA: Navigazione */}
        <div className="header-right">
          
          {/* NUOVO: Pulsante Feedback (Dashboard) */}
          <button 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} 
            onClick={() => onNavigate('dashboard')} 
            title="Vai alla Dashboard"
          >
            <span className="material-symbols-outlined">chat</span>
            <span>Feedback</span>
          </button>

          {/* AI Tuning (Apre la modale, quindi non ha stato active di navigazione) */}
          <button className="nav-item" onClick={onOpenSettings} title="Configura AI">
            <span className="material-symbols-outlined">settings</span>
            <span>AI Tuning</span>
          </button>

          <button 
            className={`nav-item ${currentView === 'analytics' ? 'active' : ''}`} 
            onClick={() => onNavigate('analytics')} 
            title="Statistiche"
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Analytics</span>
          </button>

          <button 
            className={`nav-item ${currentView === 'export' ? 'active' : ''}`} 
            onClick={() => onNavigate('export')} 
            title="Esporta dati"
          >
            <span className="material-symbols-outlined">download</span>
            <span>Export</span>
          </button>

          <button 
            className={`nav-item ${currentView === 'info' ? 'active' : ''}`} 
            onClick={() => onNavigate('info')} 
            title="Informazioni"
          >
            <span className="material-symbols-outlined">info</span>
            <span>Info</span>
          </button>
        </div>
      </header>

      {/* BOX TECNICO SOTTOSTANTE */}
      <div className="tech-stack-info">
        <p>
          <strong><span className="tech-tag">Frontend:</span></strong> Sviluppato con <strong>React 18</strong> e <strong>Vite</strong>, gestione dello stato tramite Hooks e architettura a componenti modulari con CSS3 avanzato (Grid/Flexbox).<br />
          <strong><span className="tech-tag">Backoffice:</span></strong> Motore di analisi <strong>Python (FastAPI)</strong> con modelli <strong>NLP (Natural Language Processing)</strong> per sentiment analysis e traduzione multilingua.
        </p>
      </div>
    </>
  );
}
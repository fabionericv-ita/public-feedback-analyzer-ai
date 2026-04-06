import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/variables.css';
import './styles/header.css';
import './styles/sidebar.css';
import './styles/modal.css';
import './App.css'; 

// Componenti
import Header from './components/Header'
import FeedbackInput from './components/FeedbackInput'
import ResultCard from './components/ResultCard'
import HistorySidebar from './components/HistorySidebar'
import AiSettingsModal from './components/AiSettingsModal'
import CommentModal from './components/CommentModal'
import Analytics from './components/Analytics' 
import Export from './components/Export'       
import Info from './components/Info'           

// --- HELPER FUNCTIONS ---
const getColor = (s) => s > 0.1 ? '#28a745' : (s < -0.1 ? '#dc3545' : '#ffc107');

function App() {
  // 1. STATI DATI
  const [testo, setTesto] = useState('')
  const [risultato, setRisultato] = useState(null)
  const [caricamento, setCaricamento] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard'); 

  const [storico, setStorico] = useState(() => {
    const salvati = localStorage.getItem('feedback_history');
    if (salvati) return JSON.parse(salvati);
    
    return [
      { 
        id: 1, 
        testo_originale: "Non risponde mai nessuno in comune, ho provato a chiamare varie volte ma sempre occupato, il centralino mi tiene in attesa", 
        sentiment: "Negativo", 
        score: -0.6,
        risposta_automatica: "Gentile cittadino, abbiamo preso in carico la sua segnalazione relativa ai tempi di attesa telefonica. Stiamo potenziando il personale al centralino."
      },
      { 
        id: 2, 
        testo_originale: "Il nuovo parco giochi è bellissimo, i bambini sono entusiasti e l'area è molto sicura.", 
        sentiment: "Positivo", 
        score: 0.9,
        risposta_automatica: "La ringraziamo per le belle parole! La sicurezza dei nostri parchi è una priorità per questa amministrazione."
      }
    ];
  });

  // 2. STATI CONFIGURAZIONE AI
  const [systemPrompt, setSystemPrompt] = useState(
    "Sei un analista PA esperto. Considera sempre NEGATIVI i feedback che riguardano: " +
    "centralini occupati, uffici che non rispondono, attese superiori a 30 minuti, " +
    "difficoltà nel pagare tributi come TARI/IMU o inefficienza burocratica. " +
    "Ignora termini positivi come 'importante' o 'gentile' se riferiti a un disservizio."
  );
  const [temperature, setTemperature] = useState(0.7);
  
  // 3. STATI UI (Modali)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('feedback_history', JSON.stringify(storico));
  }, [storico]);

  // --- LOGICA BUSINESS ---
  const analizzaFeedback = async () => {
    if (!testo.trim()) return;
    setCaricamento(true);
    
    try {
      // Modificato per puntare al prefisso configurato su Vercel
      const response = await axios.get(`/_/backend/analizza`, { 
        params: { 
          testo: testo, 
          context: systemPrompt, 
          temp: temperature 
        } 
      });

      const nuovoDato = { 
        ...response.data, 
        id: Date.now(),
        testo_originale: testo,
        risposta_automatica: response.data.risposta_ai || "Grazie per il suo contributo. Analizzeremo il feedback per migliorare i nostri servizi."
      };

      setRisultato(nuovoDato);
      setStorico(prev => [nuovoDato, ...prev].slice(0, 10));
      setTesto(''); 
    } catch (error) {
      console.error("Errore durante l'analisi:", error);
      alert("Errore nella comunicazione con il server Python.");
    } finally {
      setCaricamento(false);
    }
  }

  const eliminaFeedback = (id) => {
    setStorico(prev => prev.filter(item => item.id !== id));
  };

  const guardaDettaglio = (item) => {
    setSelectedFeedback(item);
    setIsCommentOpen(true);
  };

  return (
    <div className="container">
      <Header 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onNavigate={setCurrentView} 
        currentView={currentView} 
      />
      
      {/* 1. SEZIONE ANALYTICS (FULL WIDTH) */}
      {currentView === 'analytics' && (
        <div className="analytics-full-container">
           <Analytics />
        </div>
      )}

      {/* 2. SEZIONE INFO (FULL WIDTH) - ISOLATA DALLA SIDEBAR */}
      {currentView === 'info' && (
        <div className="info-full-page-container">
           <Info />
        </div>
      )}

      {/* 3. LAYOUT DASHBOARD/EXPORT (CON SIDEBAR) */}
      {/* Visualizzato solo se NON siamo in Analytics e NON siamo in Info */}
      {currentView !== 'analytics' && currentView !== 'info' && (
        <div className="dashboard-layout">
          <main className="main-panel">
            {currentView === 'dashboard' && (
              <>
                <FeedbackInput 
                  testo={testo} setTesto={setTesto} 
                  analizzaFeedback={analizzaFeedback} caricamento={caricamento} 
                />
                {risultato && (
                  <ResultCard 
                    risultato={risultato} 
                    bozzaRisposta={risultato.risposta_automatica} 
                    getColor={getColor} 
                  />
                )}
              </>
            )}
            {currentView === 'export' && <Export storico={storico} />}
          </main>

          <HistorySidebar 
            storico={storico} getColor={getColor} 
            onDelete={eliminaFeedback} onViewComment={guardaDettaglio}
          />
        </div>
      )}

      <AiSettingsModal 
        isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}
        systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt}
        temperature={temperature} setTemperature={setTemperature}
      />

      {isCommentOpen && (
        <CommentModal 
          isOpen={isCommentOpen} onClose={() => setIsCommentOpen(false)}
          data={selectedFeedback} 
          risposta={selectedFeedback?.risposta_automatica} 
        />
      )}
    </div>
  )
}

export default App;
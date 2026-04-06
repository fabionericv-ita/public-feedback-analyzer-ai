import React from 'react';

export default function FeedbackInput({ testo, setTesto, analizzaFeedback, caricamento, risultato }) {
  return (
    <div className="input-card">
      {/* 1. INPUT UTENTE */}
      <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="material-symbols-outlined">chat</span>
        Simula commento di un cittadino
      </label>
      
      <textarea 
        className="textarea citizen-text"
        placeholder="Inserisci qui il commento da analizzare..."
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
        style={{ minHeight: '120px', width: '100%', textAlign: 'left' }}
      />
      
      {/* 2. PULSANTE AZIONE */}
      <button 
        onClick={analizzaFeedback}
        className="btn-primary" 
        disabled={caricamento || !testo.trim()}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '10px', 
          width: '100%',
          backgroundColor: '#616a97', 
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        <span className="material-symbols-outlined">
          {caricamento ? 'sync' : 'auto_fix'}
        </span>
        {caricamento ? 'Elaborazione AI...' : 'Leggi e converti in feedback'}
      </button>

      {/* 3. RISULTATO - SOLO BOZZA RISPOSTA */}
      {risultato && !caricamento && (
        <div className="analysis-result" style={{ marginTop: '20px', textAlign: 'left' }}>
          
          <div className="section-reply">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: '#4a5568' }}>
              <span className="material-symbols-outlined" style={{ color: '#616a97' }}>robot_2</span>
              Bozza Risposta Automatica:
            </label>
            
            <div className="text-box ai-reply" style={{ 
              marginTop: '10px', 
              padding: '15px', 
              backgroundColor: '#f0f7ff', 
              border: '1px dashed #616a97', 
              borderRadius: '12px' 
            }}>
              {/* Mostra solo il testo della risposta, senza pulsanti o analisi sotto */}
              {risultato.risposta_automatica}
            </div>
          </div>

          {/* Rimosso Testo analizzato, Nota Tecnica e Pulsante Copia */}
          
        </div>
      )}
    </div>
  );
}
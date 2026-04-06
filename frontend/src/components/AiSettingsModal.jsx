import React from 'react';

export default function AiSettingsModal({ 
  isOpen, 
  onClose, 
  systemPrompt, 
  setSystemPrompt, 
  temperature, 
  setTemperature 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="material-symbols-outlined">settings_suggest</span>
            <h3>AI Tuning Parameters</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* BODY */}
        <div className="modal-body">
          {/* Sezione System Prompt */}
          <div className="section">
            <label className="modal-label">System Prompt (Istruzioni IA)</label>
            <textarea 
              className="textarea citizen-text" 
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Inserisci le regole per l'analisi..."
              style={{ minHeight: '160px', width: '100%', resize: 'vertical' }}
            />
            <p className="note-text" style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px', textAlign: 'left' }}>
              Definisce il comportamento e le regole del modello NLP per i progetti della Pubblica Amministrazione.
            </p>
          </div>

          {/* Sezione Temperature */}
          <div className="section">
            <label className="modal-label">
              Temperature: <strong>{temperature}</strong>
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              className="range-slider"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#616a97' }}
            />
            <div className="range-labels" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '5px' }}>
              <span>Deterministico</span>
              <span>Creativo</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            <span className="material-symbols-outlined">save</span>
            Salva e Chiudi
          </button>
        </div>

      </div>
    </div>
  );
}
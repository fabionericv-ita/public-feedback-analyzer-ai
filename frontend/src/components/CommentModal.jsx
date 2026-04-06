import React, { useState } from 'react';

export default function CommentModal({ isOpen, onClose, data, risposta }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(risposta);
    setCopied(true);
    // Reset del testo del pulsante dopo 2 secondi
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="material-symbols-outlined">chat_bubble</span> 
            <h3>Dettaglio Feedback</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="section">
            <label>Testo inviato dal Cittadino:</label>
            <div className="text-box citizen-text">
              <span className={`sentiment-dot ${data.sentiment?.toLowerCase()}`}></span>
              {/* Il testo ora viene renderizzato integralmente senza virgolette fisse se preferisci pulizia */}
              <p>{data.testo_originale}</p>
            </div>
          </div>

          <div className="section">
            <label>Bozza di Risposta Istituzionale (AI):</label>
            <div className="text-box ai-reply">
              {/* Usiamo un tag p per gestire meglio il wrapping del testo lungo */}
              <p>{risposta || "Generazione risposta in corso..."}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Annulla
          </button>
          <button 
            className={`btn-primary ${copied ? 'copied' : ''}`} 
            onClick={handleCopy}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span className="material-symbols-outlined">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Copiato!' : 'Copia Risposta'}
          </button>
        </div>

      </div>
    </div>
  );
}
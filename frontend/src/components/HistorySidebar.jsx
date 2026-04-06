// src/components/HistorySidebar.jsx

export default function HistorySidebar({ storico, getColor, onDelete, onViewComment }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start' }}>
        {/* Utilizzo di material-symbols-outlined per lo stile sottile */}
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>history</span>
        Ultimi feedback analizzati
      </h3>
      
      {storico.length === 0 && (
        <p style={{ color: '#999', textAlign: 'left', paddingLeft: '10px' }}>Nessuna analisi recente.</p>
      )}

      <div className="history-list">
        {storico.map((item) => (
          <div key={item.id} className="history-item-container">
            <div className="history-item">
              {/* Icona Sentiment dinamica con stile sottile */}
              <span className="sentiment-icon" style={{ color: getColor(item.score) }}>
                <span className="material-symbols-outlined">
                  {item.sentiment.toLowerCase().includes('positiv') ? 'sentiment_satisfied' : 
                   item.sentiment.toLowerCase().includes('negativ') ? 'sentiment_very_dissatisfied' : 'sentiment_neutral'}
                </span>
              </span>
              
              <div className="history-content">
                <span 
                  className="history-sentiment-label" 
                  style={{ 
                    color: getColor(item.score),
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}
                >
                  {item.sentiment}
                </span>
                
                <div className="history-full-text">
                  {item.testo_originale}
                </div>
              </div>

              {/* Pulsanti Azione con icone sottili e moderne */}
              <div className="history-actions">
                <button 
                  className="action-btn" 
                  title="Vedi Commento"
                  onClick={() => onViewComment(item)}
                >
                  <span className="material-symbols-outlined">chat_bubble</span>
                </button>
                <button 
                  className="action-btn delete-btn" 
                  title="Elimina"
                  onClick={() => onDelete(item.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
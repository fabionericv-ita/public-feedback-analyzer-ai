// src/components/ResultCard.jsx
export default function ResultCard({ risultato, bozzaRisposta, getColor }) {
  if (!risultato) return null;

  // Calcolo della percentuale di affidabilità (da 0 a 100)
  const affidabilita = Math.abs(risultato.score * 100).toFixed(0);
  const color = getColor(risultato.score);

  // Selezione icona in base al sentiment
  const getIcon = (s) => {
    if (s > 0.1) return 'sentiment_satisfied';
    if (s < -0.1) return 'sentiment_dissatisfied';
    return 'sentiment_neutral';
  };

  return (
    <div 
      className="result-card" 
      style={{ borderLeft: `10px solid ${color}` }}
    >
      <div className="res-header" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: color }}>
          {getIcon(risultato.score)}
        </span>
        <div>
          <h2 style={{ margin: 0, color: color }}>
            {risultato.sentiment}
          </h2>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            Affidabilità AI: {affidabilita}% (Score: {risultato.score})
          </p>
        </div>
      </div>

      {/* BARRA DI PROGRESSO VISIVA */}
      <div className="progress-bg" style={{ margin: '15px 0', backgroundColor: '#edf2f7', borderRadius: '4px' }}>
        <div 
          className="progress-fill" 
          style={{ 
            width: `${((risultato.score + 1) / 2) * 100}%`, 
            backgroundColor: color,
            height: '8px',
            borderRadius: '4px',
            transition: 'width 0.5s ease-in-out'
          }} 
        />
      </div>
      
      <div className="smart-reply" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span className="material-symbols-outlined" style={{ color: '#616a97' }}>robot_2</span>
          <strong style={{ color: '#4a5568' }}>Bozza Risposta Automatica:</strong>
        </div>
        <p className="reply-text" style={{ fontStyle: 'italic', paddingLeft: '32px', color: '#4a5568', lineHeight: '1.5' }}>
          {/* Usiamo direttamente la stringa bozzaRisposta passata da App.jsx */}
          {bozzaRisposta || "Generazione della risposta in corso..."}
        </p>
      </div>
    </div>
  );
}
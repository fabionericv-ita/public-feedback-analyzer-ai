import React from 'react';

export default function Export({ storico }) {
  const downloadData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storico, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "feedback_pa_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#616a97' }}>
        file_download
      </span>
      <h2 style={{ color: '#616a97' }}>Esportazione Dati</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Scarica l'intero database dei feedback analizzati in formato JSON per l'archiviazione interna.
      </p>
      
      <button 
        onClick={downloadData}
        style={{
          backgroundColor: '#616a97',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '1rem'
        }}
      >
        <span className="material-symbols-outlined">download</span>
        Scarica JSON (Backup)
      </button>
    </div>
  );
}
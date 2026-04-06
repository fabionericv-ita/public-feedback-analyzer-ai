import React from 'react';

export default function Info() {
  const roadmapPA = [
    {
      icon: 'notifications_active',
      title: 'Alert Proattivi',
      desc: 'Invio automatico di notifiche ai responsabili d\'ufficio al superamento di una soglia critica.'
    },
    {
      icon: 'query_stats',
      title: 'Previsione Carichi',
      desc: 'Analisi storica per prevedere i periodi di maggior afflusso agli sportelli.'
    },
    {
      icon: 'account_tree',
      title: 'Integrazione Protocollo',
      desc: 'Smistamento automatico dei feedback nel sistema di protocollo informatico dell\'ente.'
    },
    {
      icon: 'diversity_3',
      title: 'Bilancio Partecipativo',
      desc: 'Utilizzo dei dati aggregati per orientare gli investimenti pubblici sulle reali necessità.'
    }
  ];

  return (
    /* CONTENITORE A SE STANTE - 100% WIDTH */
    <div className="info-full-container" style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      padding: '0px' 
    }}>
      
      {/* HEADER CENTRATO (Come Analytics) */}
      <header style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: '50px', 
        borderBottom: '2px solid #eee', 
        paddingBottom: '30px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '46px', color: '#616a97' }}>info</span>
          <h1 style={{ margin: 0, color: '#616a97', fontSize: '2.4rem', fontWeight: '600' }}>
            Documentazione di Sistema
          </h1>
        </div>
        <p style={{ color: '#718096', fontSize: '1.1rem', textAlign: 'center' }}>
          Dettagli tecnici e roadmap evolutiva del <strong>PA Feedback Hub</strong>
        </p>
      </header>

      {/* GRID PRINCIPALE A DUE COLONNE */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.2fr 1fr', 
        gap: '60px', 
        maxWidth: '1400px', /* Opzionale: per non farlo "spanciare" troppo su monitor ultrawide */
        margin: '0 auto' 
      }}>
        
        {/* COLONNA SX: LOGICA E TECNOLOGIA */}
        <section style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span className="material-symbols-outlined">target</span> Obiettivo del Progetto
            </h3>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#4a5568' }}>
              Il sistema nasce per digitalizzare l'ascolto del cittadino. Grazie all'integrazione di 
              tecnologie AI, permette di trasformare testi non strutturati in dati azionabili, 
              riducendo i tempi di risposta della PA e migliorando la trasparenza amministrativa.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span className="material-symbols-outlined">terminal</span> Stack Tecnologico
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.2', fontSize: '1.1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="material-symbols-outlined" style={{ color: '#616a97' }}>check_circle</span>
                <strong>Core:</strong> Python 3.10+ (FastAPI) & React 18
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="material-symbols-outlined" style={{ color: '#616a97' }}>check_circle</span>
                <strong>Analisi:</strong> NLP Engine con override per logiche PA
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="material-symbols-outlined" style={{ color: '#616a97' }}>check_circle</span>
                <strong>Deployment:</strong> Containerizzazione Docker per scalabilità
              </li>
            </ul>
          </div>

          <div style={{ 
            padding: '25px', 
            backgroundColor: '#ffffff', 
            borderRadius: '15px', 
            borderLeft: '6px solid #616a97',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <p style={{ margin: 0, fontSize: '1rem', color: '#2d3748' }}>
              <strong>Stato sistema:</strong> <span style={{ color: '#28a745' }}>Operativo</span><br />
              <strong>Versione Build:</strong> 1.0.5-stable<br />
              <strong>Ultimo Aggiornamento:</strong> Aprile 2026
            </p>
          </div>
        </section>

        {/* COLONNA DX: ROADMAP E UTILITÀ */}
        <section style={{ 
          backgroundColor: '#ffffff', 
          padding: '40px', 
          borderRadius: '20px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)' 
        }}>
          <h3 style={{ color: '#616a97', fontSize: '1.3rem', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1.5px', textAlign: 'center' }}>
            Sviluppi Futuri
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {roadmapPA.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ 
                  backgroundColor: '#edf2f7', 
                  color: '#616a97', 
                  padding: '12px', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>{item.icon}</span>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px 0', color: '#2d3748', fontSize: '1.1rem' }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#718096', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
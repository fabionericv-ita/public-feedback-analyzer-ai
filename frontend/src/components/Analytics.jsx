import React from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement 
} from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';

// Registrazione dei componenti per Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Analytics() {
  
  // --- 1. PERFORMANCE UFFICI ---
  const datiUffici = [
    { ufficio: "Anagrafe", score: 85, colore: "#28a745" },
    { ufficio: "Tributi (TARI/IMU)", score: 42, colore: "#dc3545" },
    { ufficio: "Polizia Locale", score: 65, colore: "#ffc107" },
    { ufficio: "Servizi Scolastici", score: 78, colore: "#616a97" },
    { ufficio: "Urbanistica", score: 55, colore: "#a0aec0" }
  ];

  // --- 2. SEGNALAZIONI RICORRENTI (PIE) ---
  const osservazioniRicorrenti = [
    { tema: "Tempi d'attesa telefonica", occorrenze: 145 },
    { tema: "Pulizia Parchi", occorrenze: 82 },
    { tema: "Facilità pagamenti online", occorrenze: 64 },
    { tema: "Cortesia allo sportello", occorrenze: 110 },
    { tema: "Segnaletica stradale", occorrenze: 35 }
  ];

  // --- 3. TOP TEN CITTADINI (BAR CHART) ---
  const topCittadini = [
    { nome: "Mario Rossi", email: "m.rossi@email.it", segnalazioni: 12, tipo: "Disservizi TARI" },
    { nome: "Anna Bianchi", email: "a.bianchi@email.com", segnalazioni: 9, tipo: "Manutenzione Parchi" },
    { nome: "Luca Verdi", email: "l.verdi@email.it", segnalazioni: 8, tipo: "Illuminazione" },
    { nome: "Giulia Neri", email: "g.neri@email.com", segnalazioni: 7, tipo: "Centralino" },
    { nome: "Elena Gallo", email: "e.gallo@email.it", segnalazioni: 6, tipo: "Multe/PL" },
    { nome: "Marco Riva", email: "m.riva@email.com", segnalazioni: 5, tipo: "Rifiuti" },
    { nome: "Sara Volpi", email: "s.volpi@email.it", segnalazioni: 4, tipo: "Scuole" },
    { nome: "Paolo Bruni", email: "p.bruni@email.com", segnalazioni: 3, tipo: "Sportello" },
    { nome: "Carla Villa", email: "c.villa@email.it", segnalazioni: 3, tipo: "Marciapiedi" },
    { nome: "Fabio Serra", email: "f.serra@email.com", segnalazioni: 2, tipo: "Rumori" }
  ];

  // --- 4. TOP TEN VIE/PIAZZE (DOUGHNUT) ---
  const topZone = [
    { zona: "Piazza Matteotti", segnalazioni: 28, tipo: "Arredo Urbano" },
    { zona: "Via Roma", segnalazioni: 24, tipo: "Traffico/Vigili" },
    { zona: "Via Dante", segnalazioni: 21, tipo: "Rifiuti Abbandonati" },
    { zona: "Corso Italia", segnalazioni: 19, tipo: "Buca stradale" },
    { zona: "Viale Europa", segnalazioni: 15, tipo: "Illuminazione" },
    { zona: "Via Garibaldi", segnalazioni: 12, tipo: "Rumore Notturno" },
    { zona: "Parco Centrale", segnalazioni: 10, tipo: "Verde Pubblico" },
    { zona: "Via Mazzini", segnalazioni: 8, tipo: "Pulizia" },
    { zona: "Piazza Duomo", segnalazioni: 7, tipo: "Affollamento" },
    { zona: "Via Milano", segnalazioni: 5, tipo: "Segnaletica" }
  ];

  // CONFIGURAZIONE GRAFICI
  const pieData = {
    labels: osservazioniRicorrenti.map(item => item.tema),
    datasets: [{
      data: osservazioniRicorrenti.map(item => item.occorrenze),
      backgroundColor: ['#616a97', '#28a745', '#ffc107', '#dc3545', '#a0aec0'],
      borderColor: '#ffffff', borderWidth: 2,
    }],
  };

  const citizensBarData = {
    labels: topCittadini.map(c => c.nome),
    datasets: [{
      label: 'Segnalazioni effettuate',
      data: topCittadini.map(c => c.segnalazioni),
      backgroundColor: '#616a97',
      borderRadius: 5,
    }]
  };

  const zoneDoughnutData = {
    labels: topZone.map(z => z.zona),
    datasets: [{
      data: topZone.map(z => z.segnalazioni),
      backgroundColor: [
        '#616a97', '#2d3748', '#4a5568', '#718096', '#a0aec0', 
        '#cbd5e0', '#e2e8f0', '#28a745', '#ffc107', '#dc3545'
      ],
      hoverOffset: 4
    }]
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const cit = topCittadini[context.dataIndex];
            return `Email: ${cit.email}\nTema prevalente: ${cit.tipo}`;
          }
        }
      }
    }
  };

  return (
    <div className="analytics-page" style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', borderBottom: '2px solid #eee', paddingBottom: '25px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '46px', color: '#616a97' }}>monitoring</span>
          <h1 style={{ margin: 0, color: '#616a97', fontSize: '2.4rem', fontWeight: '600' }}>Report Analitico Annuale 2025-2026</h1>
        </div>
        <p style={{ color: '#666', fontSize: '1.15rem', margin: 0, textAlign: 'center', maxWidth: '800px' }}>
          Analisi basata su un campione di <strong>1.240</strong> feedback cittadini.
        </p>
      </header>

      {/* GRID A 4 BOX (2x2) */}
      <div className="analytics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* BOX 1: PERFORMANCE UFFICI */}
        <section className="chart-card" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '25px', fontSize: '1.2rem', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-symbols-outlined">apartment</span> Indice di Gradimento per Ufficio 
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {datiUffici.map((item, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: '500' }}>{item.ufficio}</span>
                  <strong style={{ color: item.colore }}>{item.score}%</strong>
                </div>
                <div style={{ width: '100%', backgroundColor: '#edf2f7', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.score}%`, backgroundColor: item.colore, height: '100%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOX 2: SEGNALAZIONI RICORRENTI (PIE) */}
        <section className="chart-card" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '25px', fontSize: '1.2rem', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-symbols-outlined">pie_chart</span> Tematiche Prevalenti
          </h3>
          <div style={{ height: '250px' }}>
            <p className="text-small-left">Posizionarsi sul grafico per dettagli</p>
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' }}}} />
          </div>
        </section>

        {/* BOX 3: TOP CITTADINI (BAR) */}
        <section className="chart-card" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '25px', fontSize: '1.2rem', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-symbols-outlined">person_search</span> Top 10 Cittadini segnalatori
          </h3>
          <div style={{ height: '300px' }}>
            <p className="text-small-left">Posizionarsi sul grafico per dettagli</p>
            <Bar data={citizensBarData} options={barOptions} />
          </div>
        </section>

        {/* BOX 4: TOP ZONE (DOUGHNUT) */}
        <section className="chart-card" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '25px', fontSize: '1.2rem', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-symbols-outlined">location_on</span> Top 10 Zone Critiche
          </h3>
          <div style={{ height: '300px' }}>
            <p className="text-small-left">Posizionarsi sul grafico per dettagli</p>
            <Doughnut data={zoneDoughnutData} options={{ 
              responsive: true, 
              maintainAspectRatio: false, 
              plugins: { 
                legend: { position: 'right' },
                tooltip: {
                  callbacks: {
                    afterLabel: (ctx) => `Causa principale: ${topZone[ctx.dataIndex].tipo}`
                  }
                }
              }
            }} />
          </div>
        </section>

      </div>

      {/* FOOTER SUMMARY */}
      <footer style={{ marginTop: '40px', backgroundColor: '#616a97', color: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(97, 106, 151, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', opacity: 0.8 }}>trending_up</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Trend Sentiment Generale</h4>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.95rem' }}>Dati aggregati rispetto all'anno precedente</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '40px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', display: 'block' }}>+12%</span>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Positivi</p>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '40px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', display: 'block' }}>-5%</span>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Negativi</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from textblob import TextBlob
from deep_translator import GoogleTranslator

# 1. Inizializzazione App (Deve essere fatta prima dei decoratori @app)
app = FastAPI(title="PA Feedback Analyzer API")

# 2. Configurazione Traduttore
translator = GoogleTranslator(source='auto', target='en')

# 3. Configurazione CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analizza")
async def analizza_testo(testo: str, context: str = None, temp: float = 0.7):
    try:
        testo_lower = testo.lower()
        
        # --- 1. LOGICA DI OVERRIDE PA (HARD CODED) ---
        # Intercettiamo le lamentele comuni che l'AI potrebbe scambiare per positive
        parole_critiche = [
            "non risponde", "sempre occupato", "attesa", 
            "ufficio tributi", "tari", "imu", "non riusciamo a parlare",
            "una ora", "un'ora", "due ore", "centralino", "disservizio"
        ]
        
        # --- 2. TRADUZIONE E ANALISI ---
        testo_en = translator.translate(testo)
        analisi = TextBlob(testo_en)
        polarita = analisi.sentiment.polarity
        
        # --- 3. DETERMINAZIONE SENTIMENT CON OVERRIDE ---
        is_lamentela_pa = any(p in testo_lower for p in parole_critiche)
        
        if is_lamentela_pa:
            # Se rileva parole critiche, forziamo il negativo
            sentiment, emoji = "Negativo", "😡"
            # Se la polarità era positiva (es. per colpa di "importante"), la portiamo a negativa
            score_finale = -0.5 if polarita >= 0 else polarita
        else:
            # Logica standard TextBlob
            if polarita > 0.1:
                sentiment, emoji = "Positivo", "😊"
            elif polarita < -0.1:
                sentiment, emoji = "Negativo", "😡"
            else:
                sentiment, emoji = "Neutrale", "😐"
            score_finale = polarita
            
        # --- 4. GENERAZIONE RISPOSTA COERENTE ---
        if sentiment == "Negativo":
            risposta_ai = (
                f"Gentile cittadino, siamo spiacenti per le difficoltà riscontrate con i nostri uffici. "
                f"La segnalazione riguardante '{testo[:40]}...' è stata inviata prioritariamente al "
                f"responsabile del settore per risolvere il problema del contatto telefonico."
            )
        elif sentiment == "Positivo":
            risposta_ai = (
                f"La ringraziamo per il feedback positivo riguardo a '{testo[:40]}...'. "
                f"Siamo lieti che il servizio sia stato di suo gradimento. Continueremo a lavorare "
                f"per mantenere questi standard qualitativi."
            )
        else:
            risposta_ai = "Grazie per il feedback. La nostra amministrazione analizzerà il suo commento per migliorare i servizi offerti."

        # --- 5. RITORNO DATI ---
        return {
            "testo_originale": testo,
            "testo_tradotto": testo_en,
            "sentiment": sentiment,
            "score": round(score_finale, 2),
            "emoji": emoji,
            "risposta_ai": risposta_ai
        }
        
    except Exception as e:
        print(f"Errore: {str(e)}")
        return {"errore": "Problema tecnico", "dettaglio": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
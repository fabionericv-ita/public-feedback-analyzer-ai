from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from textblob import TextBlob

app = FastAPI(title="PA Feedback Analyzer API")

# IMPORTANTE: Questo permette a React di comunicare con Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In produzione useremo l'indirizzo di Vercel
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"messaggio": "API di Analisi Feedback PA attiva"}

@app.get("/analizza")
def analizza_testo(testo: str):
    # Logica AI: TextBlob analizza il sentiment
    # polarity va da -1 (molto negativo) a +1 (molto positivo)
    analisi = TextBlob(testo)
    polarita = analisi.sentiment.polarity
    
    if polarita > 0.1:
        sentiment = "Positivo"
        emoji = "😊"
    elif polarita < -0.1:
        sentiment = "Negativo"
        emoji = "😡"
    else:
        sentiment = "Neutrale"
        emoji = "😐"
        
    return {
        "testo_originale": testo,
        "sentiment": sentiment,
        "score": round(polarita, 2),
        "emoji": emoji
    }
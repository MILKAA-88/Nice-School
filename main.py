# Importation des modules nécessaires
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx  # Pour faire des requêtes HTTP vers l'API ÉcoleDirecte
from datetime import datetime
import time

# Initialisation de l'application FastAPI
app = FastAPI()
start_time = time.time()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://nice-school-alpha.vercel.app/"],  # URL de ton frontend Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route pour gérer la connexion (méthode POST)
@app.post("/login/")
async def login(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        raise HTTPException(status_code=400, detail="Identifiant ou mot de passe manquant")

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.ecoledirecte.com/v3/login.awp",
            data={
                "identifiant": username,
                "motdepasse": password,
            }
        )

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Authentification échouée")

    try:
        response_data = response.json()
        return {"message": "Connexion réussie", "data": response_data}
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur lors du traitement de la réponse")

# Route pour vérifier que le serveur est en ligne
@app.get("/")
def read_root():
    return {"message": "Hey, ton serveur FastAPI est en ligne !"}

# Route pour le statut complet
@app.get("/status")
def get_status():
    uptime = round(time.time() - start_time, 2)
    return {
        "status": "online",
        "uptime_seconds": uptime,
        "version": "1.0.0",
        "environment": "production",
        "server_time": datetime.utcnow().isoformat() + "Z"
    }

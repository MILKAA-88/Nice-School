# Importation des modules nécessaires
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
import httpx  # Pour faire des requêtes HTTP vers l'API ÉcoleDirecte

# Initialisation de l'application FastAPI
app = FastAPI()

# Route pour gérer la connexion (méthode POST)
@app.post("/login/")
async def login(request: Request):
    # 1. Récupérer les données envoyées par le formulaire (username et password)
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    # 2. Vérifier que les champs ne sont pas vides
    if not username or not password:
        raise HTTPException(status_code=400, detail="Identifiant ou mot de passe manquant")

    # 3. Appeler l'API ÉcoleDirecte pour vérifier les identifiants
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.ecoledirecte.com/v3/login.awp",  # URL de l'API ÉcoleDirecte
            data={
                "identifiant": username,  # Identifiant saisi par l'utilisateur
                "motdepasse": password,   # Mot de passe saisi par l'utilisateur
            }
        )

    # 4. Vérifier la réponse de l'API ÉcoleDirecte
    if response.status_code != 200:
        # Si la connexion échoue, renvoyer une erreur
        raise HTTPException(status_code=401, detail="Authentification échouée")

    # 5. Si la connexion réussit, renvoyer les données de l'API
    return {"message": "Connexion réussie", "data": response.json()}

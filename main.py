from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Bonjour, ton serveur FastAPI est en ligne !"}

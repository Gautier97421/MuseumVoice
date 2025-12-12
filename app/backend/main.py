from typing import Annotated, Optional
from fastapi import Depends, FastAPI, Query, Request, Cookie
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from sqlmodel import Session, SQLModel, create_engine
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from fonctions_bdd import *
from tables import *
from models import MesChoixPayload

# permet de connecter la base de données SQLite
sqlite_file_name = "bdd v2"
sqlite_url = "sqlite:///./bdd v2"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

# fonction de création des tables dans la base de données
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# appelé au démarrage de l'application : on crée les tables si nécessaire
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    try:
        yield
    finally:
        # ferme proprement les connexions du moteur
        try:
            engine.dispose()
        except Exception:
            pass
 

# création de l'application FastAPI avec le gestionnaire de lifespan
app = FastAPI(lifespan=lifespan)

# Autoriser React à appeler ton API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # ports React (Vite/CRA)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# création d'une session pour interagir avec la base de données
def get_session():
    # génère une session SQLModel (yield pour compatibilité avec Depends)
    with Session(engine) as session:
        try:
            yield session
        finally:
            # fermeture explicite de la session
            session.close()


# type utilisé pour déclarer la dépendance de session dans les routes
SessionDep = Annotated[Session, Depends(get_session)]

#test react
@app.post("/api/meschoix")
def read_root(payload: MesChoixPayload):
    print(payload.model_dump())
    if payload:
        return {"message": "Salut depuis FastAPI 👋"}
    return {"message": "Aucun payload reçu"}


@app.get("/api/token expired")
def token_expired(session: Session = Depends(get_session)):
    return {"message": "Le token a expiré. Veuillez scanner à nouveau le QR code."}


# route de test qui prend un token en query parameter et vérifie sa validité
@app.get("/api/get_session")
def test_page(token: str = Query(None), session: Session = Depends(get_session), user_token: Optional[str] = Cookie(None)):
    if user_token:
        return RedirectResponse(url="/", status_code=303)
    if not token:
        return {"message": "token manquant"}
    


    qr_codes = get_all_QR_Code(session)  # exemple : [QR_Code(qr_code_id=1, token='abc', is_used=False)]

    # trouve le QR code correspondant au token fourni
    matched = next((qc for qc in qr_codes if qc.token == token), None)

    if not matched:
        return {"message": f"token invalide : {token}"}
    if matched.is_used:
        return {"message": f"token déjà utilisé : {token}"}

    # Marquer le token comme utilisé et mettre à jour en base
    matched.is_used = True
    update_QR_Code(matched.qr_code_id, matched, session)

    print({"message": f"token bon: {token}"})

    # 🔹 Génération d’un cookie dynamique (ici un ID aléatoire)
    cookie_value = str(uuid4())

    # 🔹 Créer la réponse de redirection
    response = RedirectResponse(url="/", status_code=303)

    # 🔹 Ajouter le cookie sur la réponse
    response.set_cookie(
        key="user_token",
        value=cookie_value,
        httponly=True,          # Protégé contre l’accès JS
        samesite="lax",         # Protection CSRF
        max_age=60,   # Expire après 1 minute
        secure=False            # ⚠️ True si HTTPS
    )

    return response
    
@app.get("/api/get_criterias")
def get_criterias(session: Session = Depends(get_session)):
    try:
        criterias = get_all_Criterias(session)
        return {"criterias": [criteria.model_dump() for criteria in criterias]}
    except Exception as e:
        return {"message": "Erreur lors de la récupération des critères", "error": str(e)}

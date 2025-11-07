from typing import Annotated
from imports import *  # import des modèles des bases de données et les fonctions CRUD
from fastapi import Depends, FastAPI, Query, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from sqlmodel import Session, SQLModel, create_engine
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

# permet de connecter la base de données SQLite
sqlite_file_name = "bdd v1 data"
sqlite_url = "sqlite:///./bdd v1 data"

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

# montage des fichiers statiques (templates accessibles via /templates)
app.mount("/static", StaticFiles(directory="static"), name="static")

# configuration des templates Jinja2 pour les réponses HTML
templates = Jinja2Templates(directory="templates")


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

# reset token test
# création d'un QR_Code de test et mise à jour en base (utilise des fonctions importées)
qr_code = QR_Code(token="abc", is_used=False)
update_QR_Code(1, qr_code, next(get_session()))  # attention : usage direct de get_session() pour test

#test react
@app.post("/api/meschoix")
def read_root(payload: MesChoixPayload):
    print(payload.model_dump())
    if payload:
        return {"message": "Salut depuis FastAPI 👋"}
    return {"message": "Aucun payload reçu"}


@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("qr_code.html", {"request": request})



@app.get("/qr_code", response_class=HTMLResponse)
def afficher_page(request: Request):
    print("hrere")
    return templates.TemplateResponse("qr_code.html", {"request": request})

# route de test qui prend un token en query parameter et vérifie sa validité
@app.get("/test")
def test_page(token: str = Query(None), session: Session = Depends(get_session)):
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
    # redirige vers la page d'accueil après succès
    return RedirectResponse(url="/qr_code")

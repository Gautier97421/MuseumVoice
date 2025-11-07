from typing import List, Optional
from pydantic import BaseModel

# 🔹 Modèle pour recevoir les données du front
class MesChoixPayload(BaseModel):
    timeValue: int
    visitStyle: str
    interests: List[str]
    resumeType: str
    artMovements: List[str]
    themes: List[str]
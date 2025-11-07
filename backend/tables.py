from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import date


# =============================================
# TABLE : Plans
# =============================================
class Plans(SQLModel, table=True):
    plan_id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(default="", max_length=150)
    description: Optional[str] = Field(default="")
    date_creation: Optional[date] = Field(default=None)


# =============================================
# TABLE : Oeuvres
# =============================================
class Oeuvres(SQLModel, table=True):
    oeuvre_id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    artist: str
    description: Optional[str] = Field(default="")
    image_link: Optional[str] = Field(default="")
    pdf_link: Optional[str] = Field(default="")
    room: int


# =============================================
# TABLE : Entities
# =============================================
class Entities(SQLModel, table=True):
    entity_id: Optional[int] = Field(default=None, primary_key=True)
    plan_id: Optional[int] = Field(default=1, foreign_key="plan.plan_id")
    name: Optional[str] = Field(default="", max_length=150)
    entity_type: str = Field(
        description="Enum: ('salle', 'porte', 'oeuvre', 'escalier', 'autre')"
    )
    description: Optional[str] = Field(default="")
    oeuvre_id: Optional[int] = Field(default=None, foreign_key="oeuvre.oeuvre_id")


# =============================================
# TABLE : Points
# =============================================
class Points(SQLModel, table=True):
    point_id: Optional[int] = Field(default=None, primary_key=True)
    entity_id: int = Field(foreign_key="entity.entity_id")
    x: float
    y: float
    ordre: int = Field(default=1)


# =============================================
# TABLE : Relations
# =============================================
class Relations(SQLModel, table=True):
    relation_id: Optional[int] = Field(default=None, primary_key=True)
    source_id: int = Field(foreign_key="entity.entity_id")
    cible_id: int = Field(foreign_key="entity.entity_id")
    type_relation: str = Field(
        default="autre",
        description="Enum: ('connexion', 'adjacence', 'contient', 'autre')"
    )


# =============================================
# TABLE : Chunk
# =============================================
class Chunk(SQLModel, table=True):
    chunk_id: Optional[int] = Field(default=None, primary_key=True)
    chunk_text: Optional[str] = Field(default="")
    oeuvre_id: int = Field(foreign_key="oeuvre.oeuvre_id")


# =============================================
# TABLE : Criterias
# =============================================
class Criterias(SQLModel, table=True):
    criteria_id: Optional[int] = Field(default=None, primary_key=True)
    type: str = Field(description="Enum: ('narration', 'style', 'caractéristique')")
    name: str
    description: Optional[str] = Field(default="")
    image_link: Optional[str] = Field(default="")


# =============================================
# TABLE : Oeuvre_Criterias
# =============================================
class Oeuvre_Criterias(SQLModel, table=True):
    oeuvre_id: int = Field(foreign_key="oeuvre.oeuvre_id", primary_key=True)
    criteria_id: int = Field(foreign_key="criteria.criteria_id", primary_key=True)


# =============================================
# TABLE : Generated_guide
# =============================================
class Generated_Guide(SQLModel, table=True):
    generated_guide_id: Optional[int] = Field(default=None, primary_key=True)


# =============================================
# TABLE : Pregeneration
# =============================================
class Pregeneration(SQLModel, table=True):
    pregeneration_id: Optional[int] = Field(default=None, primary_key=True)
    oeuvre_id: Optional[int] = Field(default=None, foreign_key="oeuvre.oeuvre_id")
    voice_link: Optional[str] = Field(default="")


# =============================================
# TABLE : Criterias_guide
# =============================================
class Criterias_Guide(SQLModel, table=True):
    generated_guide_id: int = Field(
        foreign_key="generatedguide.generated_guide_id", primary_key=True
    )
    criteria_id: int = Field(foreign_key="criteria.criteria_id", primary_key=True)


# =============================================
# TABLE : Criterias_pregeneration
# =============================================
class Criterias_Pregeneration(SQLModel, table=True):
    pregeneration_id: int = Field(
        foreign_key="pregeneration.pregeneration_id", primary_key=True
    )
    criteria_id: int = Field(foreign_key="criteria.criteria_id", primary_key=True)


# =============================================
# TABLE : QR_code
# =============================================
class QR_Code(SQLModel, table=True):
    qr_code_id: Optional[int] = Field(default=None, primary_key=True)
    token: str = Field(default="", max_length=255)
    is_used: bool = Field(default=False)


# =============================================
# TABLE : Stats
# =============================================
class Stats(SQLModel, table=True):
    stats_id: Optional[int] = Field(default=None, primary_key=True)

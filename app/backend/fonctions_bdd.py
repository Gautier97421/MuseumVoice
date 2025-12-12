#def des fonctions permettant d'ajouter des objets dans la base de données
from tables import Plans, Oeuvres, Entities, Points, Relations, Chunk, Criterias, Pregenerations, Oeuvre_Criterias, Generated_Guide, Criterias_Guide, Criterias_Pregeneration, QR_Code, Stats
from sqlmodel import Session, select
from typing import Optional, List


# fonctions create :


def create_Plans(plan: Plans, session: Session) -> Plans:
    session.add(plan)
    session.commit()
    session.refresh(plan)
    return plan


def create_Entities(entity: Entities, session: Session) -> Entities:
    session.add(entity)
    session.commit()
    session.refresh(entity)
    return entity


def create_Points(point: Points, session: Session) -> Points:
    session.add(point)
    session.commit()
    session.refresh(point)
    return point


def create_Relations(relation: Relations, session: Session) -> Relations:
    session.add(relation)
    session.commit()
    session.refresh(relation)
    return relation


def create_Oeuvres(oeuvre: Oeuvres, session: Session) -> Oeuvres:
    session.add(oeuvre)
    session.commit()
    session.refresh(oeuvre)
    return oeuvre


def create_Chunk(chunk: Chunk, session: Session) -> Chunk:
    session.add(chunk)
    session.commit()
    session.refresh(chunk)
    return chunk


def create_Criterias(criteria: Criterias, session: Session) -> Criterias:
    session.add(criteria)
    session.commit()
    session.refresh(criteria)
    return criteria


def create_Oeuvre_Criterias(oeuvre_criteria: Oeuvre_Criterias, session: Session) -> Oeuvre_Criterias:
    session.add(oeuvre_criteria)
    session.commit()
    session.refresh(oeuvre_criteria)
    return oeuvre_criteria


def create_Generated_Guide(generated_guide: Generated_Guide, session: Session) -> Generated_Guide:
    session.add(generated_guide)
    session.commit()
    session.refresh(generated_guide)
    return generated_guide


def create_Pregeneration(pregeneration: Pregenerations, session: Session) -> Pregenerations:
    session.add(pregeneration)
    session.commit()
    session.refresh(pregeneration)
    return pregeneration


def create_Criterias_Guide(criteria_guide: Criterias_Guide, session: Session) -> Criterias_Guide:
    session.add(criteria_guide)
    session.commit()
    session.refresh(criteria_guide)
    return criteria_guide


def create_Criterias_Pregeneration(criteria_pregeneration: Criterias_Pregeneration, session: Session) -> Criterias_Pregeneration:
    session.add(criteria_pregeneration)
    session.commit()
    session.refresh(criteria_pregeneration)
    return criteria_pregeneration


def create_QR_Code(qr_code: QR_Code, session: Session) -> QR_Code:
    session.add(qr_code)
    session.commit()
    session.refresh(qr_code)
    return qr_code


def create_Stats(stats: Stats, session: Session) -> Stats:
    session.add(stats)
    session.commit()
    session.refresh(stats)
    return stats

# fonctions delete :


def delete_Plans(plan_id: int, session: Session) -> bool:
    plan = session.get(Plans, plan_id)
    if not plan:
        return False
    session.delete(plan)
    session.commit()
    return True


def delete_Entities(entity_id: int, session: Session) -> bool:
    entity = session.get(Entities, entity_id)
    if not entity:
        return False
    session.delete(entity)
    session.commit()
    return True


def delete_Points(point_id: int, session: Session) -> bool:
    point = session.get(Points, point_id)
    if not point:
        return False
    session.delete(point)
    session.commit()
    return True


def delete_Relations(relation_id: int, session: Session) -> bool:
    relation = session.get(Relations, relation_id)
    if not relation:
        return False
    session.delete(relation)
    session.commit()
    return True


def delete_Oeuvres(oeuvre_id: int, session: Session) -> bool:
    oeuvre = session.get(Oeuvres, oeuvre_id)
    if not oeuvre:
        return False
    session.delete(oeuvre)
    session.commit()
    return True


def delete_Chunk(chunk_id: int, session: Session) -> bool:
    chunk = session.get(Chunk, chunk_id)
    if not chunk:
        return False
    session.delete(chunk)
    session.commit()
    return True


def delete_Criterias(criteria_id: int, session: Session) -> bool:
    criteria = session.get(Criterias, criteria_id)
    if not criteria:
        return False
    session.delete(criteria)
    session.commit()
    return True


def delete_Oeuvre_Criterias(oeuvre_id: int, criteria_id: int, session: Session) -> bool:
    oeuvre_criteria = session.get(Oeuvre_Criterias, (oeuvre_id, criteria_id))
    if not oeuvre_criteria:
        return False
    session.delete(oeuvre_criteria)
    session.commit()
    return True


def delete_Generated_Guide(generated_guide_id: int, session: Session) -> bool:
    generated_guide = session.get(Generated_Guide, generated_guide_id)
    if not generated_guide:
        return False
    session.delete(generated_guide)
    session.commit()
    return True


def delete_Pregeneration(pregeneration_id: int, session: Session) -> bool:
    pregeneration = session.get(Pregenerations, pregeneration_id)
    if not pregeneration:
        return False
    session.delete(pregeneration)
    session.commit()
    return True


def delete_Criterias_Guide(generated_guide_id: int, criteria_id: int, session: Session) -> bool:
    criteria_guide = session.get(Criterias_Guide, (generated_guide_id, criteria_id))
    if not criteria_guide:
        return False
    session.delete(criteria_guide)
    session.commit()
    return True


def delete_Criterias_Pregeneration(pregeneration_id: int, criteria_id: int, session: Session) -> bool:
    criteria_pregeneration = session.get(Criterias_Pregeneration, (pregeneration_id, criteria_id))
    if not criteria_pregeneration:
        return False
    session.delete(criteria_pregeneration)
    session.commit()
    return True


def delete_QR_Code(qr_code_id: int, session: Session) -> bool:
    qr_code = session.get(QR_Code, qr_code_id)
    if not qr_code:
        return False
    session.delete(qr_code)
    session.commit()
    return True


def delete_Stats(stats_id: int, session: Session) -> bool:
    stats = session.get(Stats, stats_id)
    if not stats:
        return False
    session.delete(stats)
    session.commit()
    return True

# fonctions update :


def update_Plans(plan_id: int, plan_data: Plans, session: Session) -> Optional[Plans]:
    plan = session.get(Plans, plan_id)
    if not plan:
        return None
    for key, value in plan_data.dict(exclude_unset=True).items():
        setattr(plan, key, value)
    session.add(plan)
    session.commit()
    session.refresh(plan)
    return plan


def update_Entities(entity_id: int, entity_data: Entities, session: Session) -> Optional[Entities]:
    entity = session.get(Entities, entity_id)
    if not entity:
        return None
    for key, value in entity_data.dict(exclude_unset=True).items():
        setattr(entity, key, value)
    session.add(entity)
    session.commit()
    session.refresh(entity)
    return entity


def update_Points(point_id: int, point_data: Points, session: Session) -> Optional[Points]:
    point = session.get(Points, point_id)
    if not point:
        return None
    for key, value in point_data.dict(exclude_unset=True).items():
        setattr(point, key, value)
    session.add(point)
    session.commit()
    session.refresh(point)
    return point


def update_Relations(relation_id: int, relation_data: Relations, session: Session) -> Optional[Relations]:
    relation = session.get(Relations, relation_id)
    if not relation:
        return None
    for key, value in relation_data.dict(exclude_unset=True).items():
        setattr(relation, key, value)
    session.add(relation)
    session.commit()
    session.refresh(relation)
    return relation


def update_Oeuvres(oeuvre_id: int, oeuvre_data: Oeuvres, session: Session) -> Optional[Oeuvres]:
    oeuvre = session.get(Oeuvres, oeuvre_id)
    if not oeuvre:
        return None
    for key, value in oeuvre_data.dict(exclude_unset=True).items():
        setattr(oeuvre, key, value)
    session.add(oeuvre)
    session.commit()
    session.refresh(oeuvre)
    return oeuvre


def update_Chunk(chunk_id: int, chunk_data: Chunk, session: Session) -> Optional[Chunk]:
    chunk = session.get(Chunk, chunk_id)
    if not chunk:
        return None
    for key, value in chunk_data.dict(exclude_unset=True).items():
        setattr(chunk, key, value)
    session.add(chunk)
    session.commit()
    session.refresh(chunk)
    return chunk


def update_Criterias(criteria_id: int, criteria_data: Criterias, session: Session) -> Optional[Criterias]:
    criteria = session.get(Criterias, criteria_id)
    if not criteria:
        return None
    for key, value in criteria_data.dict(exclude_unset=True).items():
        setattr(criteria, key, value)
    session.add(criteria)
    session.commit()
    session.refresh(criteria)
    return criteria


def update_Oeuvre_Criterias(oeuvre_id: int, criteria_id: int, data: Oeuvre_Criterias, session: Session) -> Optional[Oeuvre_Criterias]:
    obj = session.get(Oeuvre_Criterias, (oeuvre_id, criteria_id))
    if not obj:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(obj, key, value)
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj


def update_Generated_Guide(generated_guide_id: int, data: Generated_Guide, session: Session) -> Optional[Generated_Guide]:
    obj = session.get(Generated_Guide, generated_guide_id)
    if not obj:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(obj, key, value)
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj


def update_Pregeneration(pregeneration_id: int, data: Pregenerations, session: Session) -> Optional[Pregenerations]:
    obj = session.get(Pregenerations, pregeneration_id)
    if not obj:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(obj, key, value)
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj


def update_Criterias_Guide(generated_guide_id: int, criteria_id: int, data: Criterias_Guide, session: Session) -> Optional[Criterias_Guide]:
    obj = session.get(Criterias_Guide, (generated_guide_id, criteria_id))
    if not obj:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(obj, key, value)
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj


def update_Criterias_Pregeneration(pregeneration_id: int, criteria_id: int, data: Criterias_Pregeneration, session: Session) -> Optional[Criterias_Pregeneration]:
    obj = session.get(Criterias_Pregeneration, (pregeneration_id, criteria_id))
    if not obj:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(obj, key, value)
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj


def update_QR_Code(qr_code_id: int, data: QR_Code, session: Session) -> Optional[QR_Code]:
    obj = session.get(QR_Code, qr_code_id)
    if not obj:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(obj, key, value)
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj


def update_Stats(stats_id: int, data: Stats, session: Session) -> Optional[Stats]:
    obj = session.get(Stats, stats_id)
    if not obj:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(obj, key, value)
    session.add(obj)
    session.commit()
    session.refresh(obj)
    return obj

# fonctions get :

def get_Plans(plan_id: int, session: Session) -> Optional[Plans]:
    return session.get(Plans, plan_id)


def get_all_Plans(session: Session) -> List[Plans]:
    return session.exec(select(Plans)).all()


def get_Entities(entity_id: int, session: Session) -> Optional[Entities]:
    return session.get(Entities, entity_id)


def get_all_Entities(session: Session) -> List[Entities]:
    return session.exec(select(Entities)).all()


def get_Points(point_id: int, session: Session) -> Optional[Points]:
    return session.get(Points, point_id)


def get_all_Points(session: Session) -> List[Points]:
    return session.exec(select(Points)).all()


def get_Relations(relation_id: int, session: Session) -> Optional[Relations]:
    return session.get(Relations, relation_id)


def get_all_Relations(session: Session) -> List[Relations]:
    return session.exec(select(Relations)).all()


def get_Oeuvres(oeuvre_id: int, session: Session) -> Optional[Oeuvres]:
    return session.get(Oeuvres, oeuvre_id)


def get_all_Oeuvres(session: Session) -> List[Oeuvres]:
    return session.exec(select(Oeuvres)).all()


def get_Chunk(chunk_id: int, session: Session) -> Optional[Chunk]:
    return session.get(Chunk, chunk_id)


def get_all_Chunk(session: Session) -> List[Chunk]:
    return session.exec(select(Chunk)).all()


def get_Criterias(criteria_id: int, session: Session) -> Optional[Criterias]:
    return session.get(Criterias, criteria_id)


def get_all_Criterias(session: Session) -> List[Criterias]:
    return session.exec(select(Criterias)).all()


def get_Oeuvre_Criterias(oeuvre_id: int, criteria_id: int, session: Session) -> Optional[Oeuvre_Criterias]:
    return session.get(Oeuvre_Criterias, (oeuvre_id, criteria_id))


def get_all_Oeuvre_Criterias(session: Session) -> List[Oeuvre_Criterias]:
    return session.exec(select(Oeuvre_Criterias)).all()


def get_Generated_Guide(generated_guide_id: int, session: Session) -> Optional[Generated_Guide]:
    return session.get(Generated_Guide, generated_guide_id)


def get_all_Generated_Guide(session: Session) -> List[Generated_Guide]:
    return session.exec(select(Generated_Guide)).all()


def get_Pregeneration(pregeneration_id: int, session: Session) -> Optional[Pregenerations]:
    return session.get(Pregenerations, pregeneration_id)


def get_all_Pregeneration(session: Session) -> List[Pregenerations]:
    return session.exec(select(Pregenerations)).all()


def get_Criterias_Guide(generated_guide_id: int, criteria_id: int, session: Session) -> Optional[Criterias_Guide]:
    return session.get(Criterias_Guide, (generated_guide_id, criteria_id))


def get_all_Criterias_Guide(session: Session) -> List[Criterias_Guide]:
    return session.exec(select(Criterias_Guide)).all()


def get_Criterias_Pregeneration(pregeneration_id: int, criteria_id: int, session: Session) -> Optional[Criterias_Pregeneration]:
    return session.get(Criterias_Pregeneration, (pregeneration_id, criteria_id))


def get_all_Criterias_Pregeneration(session: Session) -> List[Criterias_Pregeneration]:
    return session.exec(select(Criterias_Pregeneration)).all()


def get_QR_Code(qr_code_id: int, session: Session) -> Optional[QR_Code]:
    return session.get(QR_Code, qr_code_id)


def get_all_QR_Code(session: Session) -> List[QR_Code]:
    return session.exec(select(QR_Code)).all()


def get_Stats(stats_id: int, session: Session) -> Optional[Stats]:
    return session.get(Stats, stats_id)


def get_all_Stats(session: Session) -> List[Stats]:
    return session.exec(select(Stats)).all()

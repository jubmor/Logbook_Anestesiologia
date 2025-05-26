from sqlalchemy.orm import Session

from . import models


def create_technique(
    db: Session,
    name: str,
    specialization_id: int,
):

    # TODO: Check for specialization_id existence

    db_technique = models.Technique(
        name=name,
        specialization_id=specialization_id,
    )
    db.add(db_technique)
    db.commit()
    db.refresh(db_technique)
    return db_technique


def get_techniques(db: Session):
    return db.query(models.Technique).all()


def get_technique_by_id(db: Session, id: int):
    return db.query(models.Technique).filter(models.Technique.id == id).first()


def get_technique_by_specialization_id(db: Session, specialization_id: int):
    return (
        db.query(models.Technique)
        .filter(models.Technique.specialization_id == specialization_id)
        .all()
    )


def update_technique_by_id(
    db: Session,
    id: int,
    name: str = None,
    specialization_id: int = None,
):
    db_technique = get_technique_by_id(db, id)
    updated = False

    if name is not None:
        db_technique.name = name
        updated = True
    if specialization_id is not None:
        db_technique.specialization_id = specialization_id
        updated = True

    if updated:
        db.commit()
        db.refresh(db_technique)

    return db_technique


def delete_technique_by_id(db: Session, id: int):
    db_technique = get_technique_by_id(db, id)
    db.delete(db_technique)
    db.commit()
    return db_technique

from sqlalchemy.orm import Session

from . import models


def get_specializations(db: Session):
    return db.query(models.Specialization).all()


def get_specialization_by_name(db: Session, name: str):
    return (
        db.query(models.Specialization)
        .filter(models.Specialization.name == name)
        .first()
    )


def get_specialization_by_id(db: Session, id: int):
    return (
        db.query(models.Specialization).filter(models.Specialization.id == id).first()
    )


def create_specialization(db: Session, name: str):
    db_specialization = models.Specialization(name=name)
    db.add(db_specialization)
    db.commit()
    db.refresh(db_specialization)
    return db_specialization


def update_specialization_by_id(db: Session, id: int, new_name: str):
    db_specialization = get_specialization_by_id(db, id)
    db_specialization.name = new_name
    db.commit()
    return db_specialization


def update_specialization_by_name(db: Session, name: str, new_name: str):
    db_specialization = get_specialization_by_name(db, name)
    db_specialization.name = new_name
    db.commit()
    return db_specialization


def delete_specialization_by_id(db: Session, id: int):
    db_specialization = get_specialization_by_id(db, id)
    db.delete(db_specialization)
    db.commit()
    return db_specialization


def delete_specialization_by_name(db: Session, name: str):
    db_specialization = get_specialization_by_name(db, name)
    db.delete(db_specialization)
    db.commit()
    return db_specialization

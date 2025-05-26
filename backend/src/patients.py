from sqlalchemy.orm import Session

from . import models


def create_patient(
    db: Session, national_health_id: str, first_name: str, last_name: str
):
    db_patient = models.Patient(
        national_health_id=national_health_id,
        name=" ".join([first_name, last_name]),
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def get_patients(db: Session):
    return db.query(models.Patient).all()


def get_patient_by_id(db: Session, id: int):
    return db.query(models.Patient).filter(models.Patient.id == id).first()


def get_patient_by_national_health_id(db: Session, national_health_id: str):
    return (
        db.query(models.Patient)
        .filter(models.Patient.national_health_id == national_health_id)
        .first()
    )


def update_patient_by_id(
    db: Session,
    id: int,
    national_health_id: str = None,
    first_name: str = None,
    last_name: str = None,
):
    db_patient = get_patient_by_id(db, id)
    updated = False

    if national_health_id is not None:
        db_patient.national_health_id = national_health_id
        updated = True
    if first_name is not None and last_name is not None:
        db_patient.name = " ".join([first_name, last_name])
        updated = True

    if updated:
        db.commit()
        db.refresh(db_patient)

    return db_patient


def delete_patient_by_id(db: Session, id: int):
    db_patient = get_patient_by_id(db, id)
    db.delete(db_patient)
    db.commit()
    return db_patient

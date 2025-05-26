from datetime import datetime

from sqlalchemy.orm import Session

from . import models


def create_episode(
    db: Session,
    patient_id: int,
    hospital_id: int,
    residency_id: int,
    rotation_id: int,
    start_date: str,
    end_date: str = None,
):
    start_date = datetime.strptime(start_date, "%d/%m/%Y")
    if end_date:
        end_date = datetime.strptime(end_date, "%d/%m/%Y")

    # TODO: Check for patient_id, hospital_id, residency_id, and rotation_id existence

    db_episode = models.Episode(
        patient_id=patient_id,
        hospital_id=hospital_id,
        residency_id=residency_id,
        rotation_id=rotation_id,
        start_date=start_date,
        end_date=end_date,
        status=1,
    )
    db.add(db_episode)
    db.commit()
    db.refresh(db_episode)
    return db_episode


def get_episodes(db: Session):
    return db.query(models.Episode).all()


def get_episode_by_id(db: Session, id: int):
    return db.query(models.Episode).filter(models.Episode.id == id).first()


def get_episode_by_patient_id(db: Session, patient_id: int):
    return (
        db.query(models.Episode).filter(models.Episode.patient_id == patient_id).all()
    )


def get_episode_by_hospital_id(db: Session, hospital_id: int):
    return (
        db.query(models.Episode).filter(models.Episode.hospital_id == hospital_id).all()
    )


def get_episode_by_residency_id(db: Session, residency_id: int):
    return (
        db.query(models.Episode)
        .filter(models.Episode.residency_id == residency_id)
        .all()
    )


def get_episode_by_rotation_id(db: Session, rotation_id: int):
    return (
        db.query(models.Episode).filter(models.Episode.rotation_id == rotation_id).all()
    )


def get_episode_by_status(db: Session, status: str):
    return db.query(models.Episode).filter(models.Episode.status == status).all()


def update_episode_by_id(
    db: Session,
    id: int,
    patient_id: int = None,
    hospital_id: int = None,
    residency_id: int = None,
    rotation_id: int = None,
    start_date: str = None,
    end_date: str = None,
    status: int = None,
):
    db_episode = get_episode_by_id(db, id)
    if not db_episode:
        return None

    updated = False

    fields_to_update = {
        "patient_id": patient_id,
        "hospital_id": hospital_id,
        "residency_id": residency_id,
        "rotation_id": rotation_id,
        "start_date": start_date,
        "end_date": end_date,
        "status": status,
    }

    for k, v in fields_to_update.items():
        if v is not None:
            setattr(db_episode, k, v)
            updated = True

    if updated:
        db.commit()
        db.refresh(db_episode)

    return db_episode


def delete_episode_by_id(db: Session, id: int):
    db_episode = get_episode_by_id(db, id)
    db.delete(db_episode)
    db.commit()
    return db_episode

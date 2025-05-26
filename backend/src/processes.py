from datetime import datetime

from sqlalchemy.orm import Session

from . import models


def create_process(
    db: Session,
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

    db_process = models.Process(
        hospital_id=hospital_id,
        residency_id=residency_id,
        rotation_id=rotation_id,
        start_date=start_date,
        end_date=end_date,
        status="created",
    )
    db.add(db_process)
    db.commit()
    db.refresh(db_process)
    return db_process


def get_processes(db: Session):
    return db.query(models.Process).all()


def get_process_by_id(db: Session, id: int):
    return db.query(models.Process).filter(models.Process.id == id).first()


def get_process_by_hospital_id(db: Session, hospital_id: int):
    return (
        db.query(models.Process).filter(models.Process.hospital_id == hospital_id).all()
    )


def get_process_by_residency_id(db: Session, residency_id: int):
    return (
        db.query(models.Process)
        .filter(models.Process.residency_id == residency_id)
        .all()
    )


def get_process_by_rotation_id(db: Session, rotation_id: int):
    return (
        db.query(models.Process).filter(models.Process.rotation_id == rotation_id).all()
    )


def update_process(
    db: Session,
    id: int,
    hospital_id: int = None,
    residency_id: int = None,
    rotation_id: int = None,
    start_date: str = None,
    end_date: str = None,
    status: str = None,
):
    db_process = get_process_by_id(db, id)
    if not db_process:
        return None

    updated = False

    fields_to_update = {
        "hospital_id": hospital_id,
        "residency_id": residency_id,
        "rotation_id": rotation_id,
        "start_date": start_date,
        "end_date": end_date,
        "status": status,
    }

    for k, v in fields_to_update.items():
        if v is not None:
            setattr(db_process, k, v)
            updated = True

    if updated:
        db.commit()
        db.refresh(db_process)

    return db_process


def delete_process_by_id(db: Session, id: int):
    db_process = get_process_by_id(db, id)
    db.delete(db_process)
    db.commit()
    return db_process

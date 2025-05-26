from datetime import datetime

from sqlalchemy.orm import Session

from . import models


def get_rotations(db: Session):
    return db.query(models.Rotation).all()


def get_rotation_by_id(db: Session, id: int):
    return db.query(models.Rotation).filter(models.Rotation.id == id).first()


def get_rotation_by_user_id(db: Session, user_id: int):
    return db.query(models.Rotation).filter(models.Rotation.user_id == user_id).all()


def create_rotation(
    db: Session,
    user_id: int,
    residency_id: int,
    specialization_id: int,
    name: str,
    description: str = None,
    start_date: str = None,
    end_date: str = None,
):
    start_date = datetime.strptime(start_date, "%d/%m/%Y")
    if end_date:
        end_date = datetime.strptime(end_date, "%d/%m/%Y")

    # TODO: Check if residency_id and specialization_id exist

    db_rotation = models.Rotation(
        user_id=user_id,
        residency_id=residency_id,
        specialization_id=specialization_id,
        name=name,
        description=description,
        start_date=start_date,
        end_date=end_date,
    )
    db.add(db_rotation)
    db.commit()
    db.refresh(db_rotation)
    return db_rotation


def update_rotation_by_id(
    db: Session,
    id: int,
    residency_id: int = None,
    specialization_id: int = None,
    name: str = None,
    description: str = None,
    start_date: str = None,
    end_date: str = None,
):
    # Retrieve the existing rotation from the database
    rotation = get_rotation_by_id(db, id)
    if not rotation:
        return None  # or raise an exception if preferred

    fields_to_update = {
        "residency_id": residency_id,
        "specialization_id": specialization_id,
        "name": name,
        "description": description,
        "start_date": start_date,
        "end_date": end_date,
    }

    is_updated = False

    for k, v in fields_to_update.items():
        if v is not None:
            setattr(rotation, k, v)
            is_updated = True

    if is_updated:
        db.commit()
        db.refresh(rotation)

    return rotation


def delete_rotation_by_id(db: Session, id: int):
    db_rotation = get_rotation_by_id(db, id)
    db.delete(db_rotation)
    db.commit()
    return db_rotation

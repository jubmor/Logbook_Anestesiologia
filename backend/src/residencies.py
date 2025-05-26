from datetime import datetime

from sqlalchemy.orm import Session

from . import models


def get_residencies(db: Session):
    return db.query(models.Residency).all()


def get_residency_by_id(db: Session, id: int):
    return db.query(models.Residency).filter(models.Residency.id == id).first()


def get_residency_by_user_id(db: Session, user_id: int):
    return db.query(models.Residency).filter(models.Residency.user_id == user_id).all()


def create_residency(
    db: Session,
    user_id: int,
    name: str,
    description: str = None,
    start_date: str = None,
    end_date: str = None,
):
    start_date = datetime.strptime(start_date, "%d/%m/%Y")
    if end_date:
        end_date = datetime.strptime(end_date, "%d/%m/%Y")

    db_Residency = models.Residency(
        user_id=user_id,
        name=name,
        description=description,
        start_date=start_date,
        end_date=end_date,
    )
    db.add(db_Residency)
    db.commit()
    db.refresh(db_Residency)
    return db_Residency


def delete_residency_by_id(db: Session, id: int):
    db_Residency = get_residency_by_id(db, id)
    db.delete(db_Residency)
    db.commit()
    return db_Residency

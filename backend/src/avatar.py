from sqlalchemy.orm import Session

from . import models


def upload_avatar(db: Session, user_id: int, filepath: str):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db_avatar = models.Avatar(user_id=db_user.id, filepath=filepath)
    db.add(db_avatar)
    db.commit()
    db.refresh(db_avatar)
    return db_avatar


def get_avatar(db: Session, user_id: int):
    return db.query(models.Avatar).filter(models.Avatar.user_id == user_id).first()

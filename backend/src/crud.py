from sqlalchemy.orm import Session

from . import models, schemas
from .password import hash_password

whitelist = (
    "joana.b.mor@gmail.com",
    "pedromribeironeto@gmail.com",
    "jrfa.design@gmail.com",
    "simao-sfos@hotmail.com",
)


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    if user.email not in whitelist:
        return None
    db_user = models.User(
        email=user.email,
        password=hash_password(user.password),
        first_name=user.first_name,
        last_name=user.last_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def reset_password(db: Session, email: str, new_password: str):
    db_user = get_user_by_email(db, email)
    db_user.password = hash_password(new_password)
    db.commit()
    return db_user

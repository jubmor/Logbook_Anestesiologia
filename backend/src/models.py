from sqlalchemy import BLOB, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    # hashed_password = Column(String)
    # is_active = Column(Boolean, default=True)

    # items = relationship("Item", back_populates="owner")


class Specialization(Base):
    __tablename__ = "specializations"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)


class Residency(Base):
    __tablename__ = "residencies"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)


class Rotation(Base):
    __tablename__ = "rotations"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    residency_id = Column(Integer, ForeignKey("residencies.id"))
    specialization_id = Column(Integer, ForeignKey("specializations.id"))


class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True)
    national_health_id = Column(String, index=True)
    name = Column(String)


class Process(Base):
    __tablename__ = "processes"

    id = Column(Integer, primary_key=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    residency_id = Column(Integer, ForeignKey("residencies.id"))
    rotation_id = Column(Integer, ForeignKey("rotations.id"))
    status = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime, nullable=True)


class Episode(Base):
    __tablename__ = "episodes"

    id = Column(Integer, primary_key=True)
    process_id = Column(Integer, ForeignKey("processes.id"))
    status = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime, nullable=True)


class Technique(Base):
    __tablename__ = "techniques"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    specialization_id = Column(Integer, ForeignKey("specializations.id"))


class Avatar(Base):
    __tablename__ = "avatars"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filepath = Column(String)

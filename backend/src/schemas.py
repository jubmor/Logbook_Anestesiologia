from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    # is_active: bool

    class Config:
        from_attributes = True


class PasswordReset(BaseModel):
    new_password: str


class SpecializationBase(BaseModel):
    name: str


class Specialization(SpecializationBase):
    id: int

    class Config:
        from_attributes = True


class ResidencyBase(BaseModel):
    name: str
    description: str


class ResidencyCreate(ResidencyBase):
    start_date: str


class Residency(ResidencyBase):
    id: int
    start_date: datetime | None
    end_date: datetime | None

    class Config:
        from_attributes = True


class RotationBase(BaseModel):
    name: str
    description: str


class Rotation(RotationBase):
    id: int
    residency_id: int
    specialization_id: int
    start_date: datetime | None
    end_date: datetime | None

    class Config:
        from_attributes = True


class HospitalBase(BaseModel):
    name: str


class Hospital(HospitalBase):
    id: int

    class Config:
        from_attributes = True


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    national_health_id: str


class Patient(PatientBase):
    id: int

    class Config:
        from_attributes = True


class EpisodeBase(BaseModel):
    status: str


class Episode(EpisodeBase):
    id: int
    patient_id: int
    hospital_id: int
    residency_id: int
    rotation_id: int
    start_date: datetime | None
    end_date: datetime | None

    class Config:
        from_attributes = True


class ProcessCreate(BaseModel):
    hospital_id: int
    residency_id: int
    rotation_id: int
    start_date: str
    end_date: str | None


class Process(ProcessCreate):
    id: int
    status: str

    class Config:
        from_attributes = True


class TechniqueBase(BaseModel):
    name: str
    specialization_id: int


class Technique(TechniqueBase):
    id: int

    class Config:
        from_attributes = True


class Avatar(BaseModel):
    id: int
    user_id: int
    filepath: str

    class Config:
        from_attributes = True

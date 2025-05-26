import logging
import sys
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import Depends, FastAPI, File, HTTPException, Query, UploadFile
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from sqlalchemy.orm import Session

from . import (avatar, crud, episodes, hospitals, models, patients, processes,
               residencies, rotations, schemas, specializations, statuses,
               techniques)
from .database import SessionLocal, engine
from .password import verify_password

SECRET = "a3b2d5311edab13a3ab69b5988138660"
logger = logging.getLogger("uvicorn")


models.Base.metadata.create_all(bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup tasks
    print("Application startup")
    sys.stdout.flush()  # Ensure the output is flushed
    hospitals.upload_hospitals(next(get_db()))
    statuses.upload_statuses(next(get_db()))
    yield  # This is where the app runs and serves requests
    # Shutdown tasks
    print("Application shutdown")
    sys.stdout.flush()  # Ensure the output is flushed


app = FastAPI(lifespan=lifespan)


manager = LoginManager(SECRET, token_url="/auth/token")


@manager.user_loader()
def load_user(email: str):
    db = next(get_db())
    try:
        user = crud.get_user_by_email(db=db, email=email)
        return user
    finally:
        db.close()  # Ensure the session is properly closed after use


@app.get("/")
async def root():
    return {"message": "Hello, World"}


@app.post("/auth/token", tags=["auth"])
def login(data: OAuth2PasswordRequestForm = Depends()):
    email = data.username
    print("Email:", email)

    if email not in crud.whitelist:
        raise InvalidCredentialsException  # TODO: Review this

    user = load_user(email=email)  # we are using the same function to retrieve the user
    if not user or not verify_password(data.password, user.password):
        raise InvalidCredentialsException  # you can also use your own HTTPException

    access_token = manager.create_access_token(data=dict(sub=email))
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/users/register", response_model=schemas.User, tags=["users"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = crud.create_user(db=db, user=user)
    if new_user is None:
        raise HTTPException(status_code=400, detail="Invalid email address")
    return new_user


# @app.get("/users/", response_model=list[schemas.User])
# def read_users(
#     skip: int = 0,
#     limit: int = 100,
#     db: Session = Depends(get_db),
#     _=Depends(manager),
# ):
#     users = crud.get_users(db, skip=skip, limit=limit)
#     return users


@app.get("/users/me", response_model=schemas.User, tags=["users"])
def read_users_me(
    data: schemas.User = Depends(manager),
):
    return data


@app.post("/users/change-password", tags=["users"])
def reset_password(
    new_password: schemas.PasswordReset,
    user: schemas.User = Depends(manager),
    db: Session = Depends(get_db),
):
    db_user = crud.get_user_by_email(email=user.email, db=db)
    if db_user is not None:
        crud.reset_password(
            db=db, email=user.email, new_password=new_password.new_password
        )
        return {"message": "Password updated successfully"}
    return {"message": "Password updated error: user not found"}


@app.get("/users/search", response_model=schemas.User, tags=["users"])
def read_user(
    user_id: Optional[int] = None,
    email: Optional[str] = None,
    db: Session = Depends(get_db),
    _=Depends(manager),
):
    if user_id is not None:
        db_user = crud.get_user(db, user_id=user_id)
    elif email is not None:
        db_user = crud.get_user_by_email(db, email=email)
    else:
        raise HTTPException(status_code=400, detail="User ID or email must be provided")

    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.get(
    "/specializations/get/{id}",
    response_model=schemas.Specialization,
    tags=["specializations"],
)
def get_specialization(id: int, db: Session = Depends(get_db), _=Depends(manager)):
    specialization = specializations.get_specialization_by_id(db, id)
    if specialization is None:
        raise HTTPException(status_code=404, detail="Specialization not found")
    return specialization


@app.get(
    "/specializations/get/",
    response_model=list[schemas.Specialization],
    tags=["specializations"],
)
def get_specializations(
    id: Optional[int] = Query(
        None,
        description="ID of the specialization. Either filter by ID or name otherwise all will be returned.",
    ),
    name: Optional[str] = Query(
        None,
        description="ID of the specialization. Either filter by ID or name otherwise all will be returned.",
    ),
    db: Session = Depends(get_db),
    _=Depends(manager),
):
    # if id is not None:
    #     specialization = specializations.get_specialization_by_id(db=db, id=id)
    # elif name is not None:
    #     specialization = specializations.get_specialization_by_name(db=db, name=name)
    # else:
    #     return specializations.get_specializations(db)

    # if specialization is None:
    #     raise HTTPException(status_code=404, detail="Specialization not found")
    # return [specialization]
    return specializations.get_specializations(db)


@app.post(
    "/specializations/create",
    response_model=schemas.Specialization,
    tags=["specializations"],
)
def create_specialization(
    specialization: schemas.SpecializationBase,
    db: Session = Depends(get_db),
    _=Depends(manager),
):
    aux = specializations.get_specialization_by_name(db=db, name=specialization.name)
    if aux is not None:
        raise HTTPException(status_code=400, detail="Specialization already exists")

    new_specialization = specializations.create_specialization(
        db=db, name=specialization.name
    )
    return new_specialization


@app.put(
    "/specializations/update",
    response_model=schemas.Specialization,
    tags=["specializations"],
)
def update_specialization(
    new_name: str,
    id: Optional[int] = Query(
        None, description="ID of the specialization. Either this or name is required."
    ),
    name: Optional[str] = Query(
        None, description="Name of the specialization. Either this or id is required."
    ),
    db: Session = Depends(get_db),
    _=Depends(manager),
):
    if id is not None:
        specialization = specializations.get_specialization_by_id(db=db, id=id)
    elif name is not None:
        specialization = specializations.get_specialization_by_name(db=db, name=name)
    else:
        raise HTTPException(status_code=400, detail="ID or name must be provided")

    if specialization is None:
        raise HTTPException(status_code=404, detail="Specialization not found")
    else:
        if id is not None:
            return specializations.update_specialization_by_id(
                db=db, id=id, new_name=new_name
            )
        elif name is not None:
            return specializations.update_specialization_by_name(
                db=db, name=name, new_name=new_name
            )


@app.delete(
    "/specializations/delete",
    response_model=schemas.Specialization,
    tags=["specializations"],
)
def delete_specialization(
    id: Optional[int] = Query(
        None, description="ID of the specialization. Either this or name is required."
    ),
    name: Optional[str] = Query(
        None, description="Name of the specialization. Either this or id is required."
    ),
    db: Session = Depends(get_db),
    _=Depends(manager),
):
    if id is not None:
        specialization = specializations.get_specialization_by_id(db=db, id=id)
    elif name is not None:
        specialization = specializations.get_specialization_by_name(db=db, name=name)
    else:
        raise HTTPException(status_code=400, detail="ID or name must be provided")

    if specialization is None:
        raise HTTPException(status_code=404, detail="Specialization not found")
    else:
        if id is not None:
            return specializations.delete_specialization_by_id(db=db, id=id)
        elif name is not None:
            return specializations.delete_specialization_by_name(db=db, name=name)


@app.get(
    "/residencies/get",
    response_model=list[schemas.Residency],
    tags=["residencies"],
)
def get_residencies(db: Session = Depends(get_db), _=Depends(manager)):
    aux = residencies.get_residencies(db)
    return aux


@app.get(
    "/residencies/get/{id}",
    response_model=schemas.Residency,
    tags=["residencies"],
)
def get_residency(id: int, db: Session = Depends(get_db), _=Depends(manager)):
    residency = residencies.get_residency_by_id(db, id)
    if residency is None:
        raise HTTPException(status_code=404, detail="Residency not found")
    return residency


@app.get(
    "/residencies/get/{user_id}",
    response_model=schemas.Residency,
    tags=["residencies"],
    summary="Get residencies of a given user",
)
def get_residencies(
    db: Session = Depends(get_db),
    user: schemas.User = Depends(manager),
):
    user = crud.get_user(db, user.id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return residencies.get_residency_by_user_id(db, user.id)


@app.post("/residencies/create", response_model=schemas.Residency, tags=["residencies"])
def create_residency(
    residency: schemas.ResidencyCreate,
    db: Session = Depends(get_db),
    user: schemas.User = Depends(manager),
):
    return residencies.create_residency(
        db=db,
        user_id=user.id,
        name=residency.name,
        description=residency.description,
        start_date=residency.start_date,
    )


@app.delete(
    "/residencies/delete/{id}", response_model=schemas.Residency, tags=["residencies"]
)
def delete_residency(id: int, db: Session = Depends(get_db), _=Depends(manager)):
    residency = residencies.get_residency_by_id(db, id)
    if residency is None:
        raise HTTPException(status_code=404, detail="Residency not found")
    else:
        return residencies.delete_residency_by_id(db, id)


@app.get("/hospitals/get", response_model=list[schemas.Hospital], tags=["hospitals"])
def get_hospitals(
    id: Optional[int] = Query(
        None,
        description="ID of the hospital. If not specified, all hospitals are returned.",
    ),
    db: Session = Depends(get_db),
):
    if id is not None and isinstance(id, int):
        return hospitals.get_hospital_by_id(db=db, id=id)
    return hospitals.get_hospitals(db)


@app.get("/rotations/get/{id}", response_model=schemas.Rotation, tags=["rotations"])
def get_rotation(id: int, db: Session = Depends(get_db), _=Depends(manager)):
    rotation = rotations.get_rotation_by_id(db, id)
    if rotation is None:
        raise HTTPException(status_code=404, detail="Rotation not found")
    return rotation


@app.get(
    "/rotations/get",
    response_model=list[schemas.Rotation],
    tags=["rotations"],
)
def get_rotations(db: Session = Depends(get_db), _=Depends(manager)):
    aux = rotations.get_rotations(db)
    return aux


@app.post("/rotations/create", response_model=schemas.Rotation, tags=["rotations"])
def create_rotation(
    rotation: schemas.Rotation,
    db: Session = Depends(get_db),
    user: schemas.User = Depends(manager),
):
    return rotations.create_rotation(
        db=db,
        user_id=user.id,
        residency_id=rotation.residency_id,
        specialization_id=rotation.specialization_id,
        name=rotation.name,
        description=rotation.description,
        start_date=rotation.start_date,
        end_date=rotation.end_date,
    )


@app.put(
    "/rotations/update",
    response_model=schemas.Rotation,
    tags=["rotations"],
)
def update_rotation(
    id: int,
    residency_id: Optional[int] = Query(
        None, description="The ID of the residency to assign to the rotation."
    ),
    specialization_id: Optional[int] = Query(
        None, description="The ID of the specialization to assign to the rotation."
    ),
    name: Optional[str] = Query(None, description="The name of the rotation."),
    description: Optional[str] = Query(
        None, description="The description of the rotation."
    ),
    start_date: Optional[str] = Query(
        None, description="The start date of the rotation."
    ),
    end_date: Optional[str] = Query(None, description="The end date of the rotation."),
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return rotations.update_rotation_by_id(
        db=db,
        id=id,
        residency_id=residency_id,
        specialization_id=specialization_id,
        name=name,
        description=description,
        start_date=start_date,
        end_date=end_date,
    )


@app.delete(
    "/rotations/delete",
    response_model=schemas.Rotation,
    tags=["rotations"],
)
def delete_rotation(
    id: int,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return rotations.delete_rotation_by_id(db=db, id=id)


@app.post("/patients/create", response_model=schemas.Patient, tags=["patients"])
def create_patient(
    patient: schemas.Patient,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return patients.create_patient(
        db=db,
        national_health_id=patient.national_health_id,
        first_name=patient.first_name,
        last_name=patient.last_name,
    )


@app.get("/patients/get/{id}", response_model=schemas.Patient, tags=["patients"])
def get_patient(
    id: int, db: Session = Depends(get_db), _: schemas.User = Depends(manager)
):
    patient = patients.get_patient_by_id(db, id)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@app.get("/patients/get", response_model=list[schemas.Patient], tags=["patients"])
def get_patients(db: Session = Depends(get_db), _: schemas.User = Depends(manager)):
    return patients.get_patients(db)


@app.put("/patients/update", response_model=schemas.Patient, tags=["patients"])
def update_patient(
    id: int,
    national_health_id: Optional[str] = Query(
        None, description="The national health ID of the patient."
    ),
    first_name: Optional[str] = Query(
        None, description="The first name of the patient."
    ),
    last_name: Optional[str] = Query(None, description="The last name of the patient."),
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return patients.update_patient_by_id(
        db=db,
        id=id,
        national_health_id=national_health_id,
        first_name=first_name,
        last_name=last_name,
    )


@app.delete("/patients/delete", response_model=schemas.Patient, tags=["patients"])
def delete_patient(
    id: int,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return patients.delete_patient_by_id(db=db, id=id)


@app.post("/episodes/create", response_model=schemas.Episode, tags=["episodes"])
def create_episode(
    episode: schemas.Episode,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return episodes.create_episode(
        db=db,
        patient_id=episode.patient_id,
        hospital_id=episode.hospital_id,
        residency_id=episode.residency_id,
        rotation_id=episode.rotation_id,
        start_date=episode.start_date,
        end_date=episode.end_date,
    )


@app.get("/episodes/get/{id}", response_model=schemas.Episode, tags=["episodes"])
def get_episode(
    id: int, db: Session = Depends(get_db), _: schemas.User = Depends(manager)
):
    episode = episodes.get_episode_by_id(db, id)
    if episode is None:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode


@app.get("/episodes/get", response_model=list[schemas.Episode], tags=["episodes"])
def get_episodes(db: Session = Depends(get_db), _: schemas.User = Depends(manager)):
    return episodes.get_episodes(db)


@app.put("/episodes/update", response_model=schemas.Episode, tags=["episodes"])
def update_episode(
    id: int,
    patient_id: Optional[int] = Query(
        None, description="The ID of the patient associated with the episode."
    ),
    hospital_id: Optional[int] = Query(
        None, description="The ID of the hospital associated with the episode."
    ),
    residency_id: Optional[int] = Query(
        None, description="The ID of the residency associated with the episode."
    ),
    rotation_id: Optional[int] = Query(
        None, description="The ID of the rotation associated with the episode."
    ),
    start_date: Optional[str] = Query(
        None, description="The start date of the episode."
    ),
    end_date: Optional[str] = Query(None, description="The end date of the episode."),
    status: Optional[str] = Query(None, description="The status of the episode."),
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return episodes.update_episode_by_id(
        db=db,
        id=id,
        patient_id=patient_id,
        hospital_id=hospital_id,
        residency_id=residency_id,
        rotation_id=rotation_id,
        start_date=start_date,
        end_date=end_date,
        status=status,
    )


@app.delete("/episodes/delete", response_model=schemas.Episode, tags=["episodes"])
def delete_episode(
    id: int,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return episodes.delete_episode_by_id(db=db, id=id)


@app.post("/processes/create", response_model=schemas.Process, tags=["processes"])
def create_process(
    process: schemas.ProcessCreate,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return processes.create_process(
        db=db,
        hospital_id=process.hospital_id,
        residency_id=process.residency_id,
        rotation_id=process.rotation_id,
        start_date=process.start_date,
        end_date=process.end_date,
    )


@app.get("/processes/get/{id}", response_model=schemas.Process, tags=["processes"])
def get_process(
    id: int, db: Session = Depends(get_db), _: schemas.User = Depends(manager)
):
    process = processes.get_process_by_id(db, id)
    if process is None:
        raise HTTPException(status_code=404, detail="Process not found")
    return process


@app.get("/processes/get", response_model=list[schemas.Process], tags=["processes"])
def get_processes(db: Session = Depends(get_db), _: schemas.User = Depends(manager)):
    return processes.get_processes(db)


@app.put("/processes/update", response_model=schemas.Process, tags=["processes"])
def update_process(
    id: int,
    hospital_id: Optional[int] = Query(
        None, description="The ID of the hospital associated with the process."
    ),
    residency_id: Optional[int] = Query(
        None, description="The ID of the residency associated with the process."
    ),
    rotation_id: Optional[int] = Query(
        None, description="The ID of the rotation associated with the process."
    ),
    start_date: Optional[str] = Query(
        None, description="The start date of the process."
    ),
    end_date: Optional[str] = Query(None, description="The end date of the process."),
    status: Optional[str] = Query(None, description="The status of the process."),
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return processes.update_process(
        db=db,
        id=id,
        hospital_id=hospital_id,
        residency_id=residency_id,
        rotation_id=rotation_id,
        start_date=start_date,
        end_date=end_date,
        status=status,
    )


@app.delete("/processes/delete", response_model=schemas.Process, tags=["processes"])
def delete_process(
    id: int,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return processes.delete_process_by_id(db=db, id=id)


@app.post("/techniques/create", response_model=schemas.Technique, tags=["techniques"])
def create_technique(
    technique: schemas.Technique,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return techniques.create_technique(
        db=db,
        name=technique.name,
        specialization_id=technique.specialization_id,
    )


@app.get("/techniques/get/{id}", response_model=schemas.Technique, tags=["techniques"])
def get_technique(
    id: int, db: Session = Depends(get_db), _: schemas.User = Depends(manager)
):
    technique = techniques.get_technique_by_id(db, id)
    if technique is None:
        raise HTTPException(status_code=404, detail="Technique not found")
    return technique


@app.get("/techniques/get", response_model=list[schemas.Technique], tags=["techniques"])
def get_techniques(db: Session = Depends(get_db), _: schemas.User = Depends(manager)):
    return techniques.get_techniques(db)


@app.put("/techniques/update", response_model=schemas.Technique, tags=["techniques"])
def update_technique(
    id: int,
    name: Optional[str] = Query(None, description="The name of the technique."),
    specialization_id: Optional[int] = Query(
        None, description="The ID of the specialization associated with the technique."
    ),
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return techniques.update_technique_by_id(
        db=db,
        id=id,
        name=name,
        specialization_id=specialization_id,
    )


@app.delete("/techniques/delete", response_model=schemas.Technique, tags=["techniques"])
def delete_technique(
    id: int,
    db: Session = Depends(get_db),
    _: schemas.User = Depends(manager),
):
    return techniques.delete_technique_by_id(db=db, id=id)


@app.post("/avatars/upload", response_model=schemas.Avatar, tags=["avatar"])
async def upload_avatar(
    avatar_file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user: schemas.User = Depends(manager),
):
    file_location = f"avatars/{avatar_file.filename}"
    with open(file_location, "wb") as image_file:
        image_file.write(await avatar_file.read())

    return avatar.upload_avatar(db=db, user_id=user.id, filepath=file_location)


@app.get("/avatars/{image_id}", response_model=schemas.Avatar, tags=["avatar"])
def get_avatar(
    db: Session = Depends(get_db),
    user: schemas.User = Depends(manager),
):
    db_avatar = avatar.get_avatar(db, user.id)
    if db_avatar is None:
        raise HTTPException(status_code=404, detail="Avatar not found")
    return FileResponse(path=db_avatar.filepath)

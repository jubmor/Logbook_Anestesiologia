import xml.etree.ElementTree as ET

from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from . import models

# https://spms.min-saude.pt/wp-content/uploads/2017/01/ET-PDS-WebAPI_v1.3.pdf
hospitals_endpoint = "https://api-qualidade.pds.min-saude.pt/api/tems/institution"
file_path = "/app/hospitals.xml"


def upload_hospitals(db: Session):
    root = ET.parse(file_path)

    for institution in root.findall(".//ModelInstitution"):
        id = institution.find("Id").text
        name = institution.find("Name").text

        # Raw SQL with ON CONFLICT to handle duplicate key violations
        query = text(
            """
            INSERT INTO hospitals (id, name)
            VALUES (:id, :name)
            ON CONFLICT (id) DO NOTHING
        """
        )

        try:
            db.execute(query, {"id": id, "name": name})
            db.commit()
        except IntegrityError as e:
            db.rollback()  # Rollback the transaction on error
            # print(f"Duplicate entry for hospital ID {id}: {e}")
            continue  # Skip the duplicate and move on to the next one


def get_hospitals(db: Session):
    return db.query(models.Hospital).all()


def get_hospital_by_id(db: Session, id: int):
    return [db.query(models.Hospital).filter(models.Hospital.id == id).first()]

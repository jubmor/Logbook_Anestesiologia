from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session


def upload_statuses(db: Session):
    statuses = {
        "0": "created",
        "1": "in_progress",
        "2": "archived",
    }

    for status in statuses:

        query = text(
            """
            INSERT INTO statuses (id, name)
            VALUES (:id, :name)
            ON CONFLICT (id) DO NOTHING
            """
        )

        try:
            db.execute(query, {"id": status, "name": statuses[status]})
            db.commit()
        except IntegrityError as e:
            db.rollback()  # Rollback the transaction on error

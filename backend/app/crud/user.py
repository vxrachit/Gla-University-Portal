from sqlalchemy.orm import Session
from .. import models, schemas

def get_users(db: Session):
    return db.query(models.User).all()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.user.User).filter(models.user.User.id == user_id).first()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.user.User(**user.dict())

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

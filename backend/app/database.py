import urllib.parse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME


encoded_password = urllib.parse.quote(DB_PASSWORD)


DATABASE_URL = (
    f"mysql+mysqlconnector://{DB_USER}:{encoded_password}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_all_tables():
    from app.models import leave, faculty

    leave.Base.metadata.create_all(bind=engine)
    faculty.Base.metadata.create_all(bind=engine)

create_all_tables()

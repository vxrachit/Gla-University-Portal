from sqlalchemy import Column, Integer, String
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255)) 
    role = Column(String(50)) 
    department = Column(String(100), nullable=True)
    photo = Column(String, nullable=True) 

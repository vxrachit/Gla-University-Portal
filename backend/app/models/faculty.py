from sqlalchemy import Column, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship
class Faculty(Base):
    __tablename__ = "faculties"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    department= Column(String(255), nullable=False)
    

    leaves = relationship("LeaveRequest", back_populates="faculty")

